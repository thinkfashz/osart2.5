"use client";

import { useState, useEffect } from "react";
import { X, Save, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ImageUpload from "@/components/ui/ImageUpload";
import { Product } from "@/types";

interface ProductFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, "id">) => Promise<void>;
    initialData?: Product | null;
}

export default function ProductFormDialog({ isOpen, onClose, onSave, initialData }: ProductFormDialogProps) {
    const [formData, setFormData] = useState<Omit<Product, "id">>({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        category: "Automotriz",
        image_url: "",
        is_active: true,
        specs: {},
        category_id: undefined,
        base_price: undefined,
        metadata: {}
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                price: initialData.price || 0,
                stock: initialData.stock || 0,
                category: initialData.category || "Automotriz",
                image_url: initialData.image_url || "",
                is_active: initialData.is_active ?? true,
                specs: initialData.specs || {},
                category_id: initialData.category_id,
                base_price: initialData.base_price,
                metadata: initialData.metadata || {}
            });
        } else {
            setFormData({
                title: "",
                description: "",
                price: 0,
                stock: 0,
                category: "Automotriz",
                image_url: "",
                is_active: true,
                specs: {},
                category_id: undefined,
                base_price: undefined,
                metadata: {}
            });
        }
    }, [initialData, isOpen]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title || formData.price <= 0) {
            setError("Por favor completa los campos obligatorios.");
            return;
        }

        setIsSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (err: any) {
            setError(err.message || "Error al guardar el producto.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-midnight/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-midnight border border-white/10 rounded-[3rem] shadow-paradox overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                            <div>
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                                    {initialData ? "Calibrar_Módulo" : "Inyectar_Recurso"}
                                </h2>
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black italic mt-1">
                                    Sincronización con catálogos centrales activada
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Column: Basic Info */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Título_Del_Nodo *</label>
                                        <input
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full h-16 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm font-black italic uppercase text-white focus:border-electric-blue/50 outline-none transition-all"
                                            placeholder="EJ: TURBOCOMPRESOR_X1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Créditos_Req *</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                className="w-full h-16 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm font-black italic text-white focus:border-electric-blue/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Unidades_Disp</label>
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                                className="w-full h-16 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm font-black italic text-white focus:border-electric-blue/50 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Sector_De_Clasificación</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full h-16 bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-sm font-black italic uppercase text-white focus:border-electric-blue/50 outline-none transition-all appearance-none"
                                        >
                                            <option value="Automotriz" className="bg-midnight">Automotriz</option>
                                            <option value="Módulos" className="bg-midnight">Módulos</option>
                                            <option value="Electrónica" className="bg-midnight">Electrónica</option>
                                            <option value="Consumibles" className="bg-midnight">Consumibles</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Right Column: Visuals */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Esquema_Visual</label>
                                        <ImageUpload
                                            currentImageUrl={formData.image_url}
                                            onUploadSuccess={(url) => setFormData({ ...formData, image_url: url })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic ml-2">Descripción_Técnica</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full h-32 bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-xs font-medium text-white/60 focus:border-electric-blue/50 outline-none transition-all resize-none"
                                            placeholder="Inyectar especificaciones y detalles del módulo..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4"
                                    >
                                        <AlertCircle className="text-red-500" />
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-red-500 italic">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-end gap-6">
                            <button
                                onClick={onClose}
                                className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                            >
                                CANCELAR_OPERACIÓN
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="h-16 bg-electric-blue text-white rounded-2xl px-12 font-black italic flex items-center gap-4 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                                {initialData ? "ACTUALIZAR_CORE" : "INICIAR_INYECCIÓN"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
