"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    AlertCircle,
    Save,
    X,
    TrendingDown,
    TrendingUp,
    Filter,
    ShieldAlert,
    Box,
    DollarSign,
    Zap
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { sanitizeString, safeAction } from "@/lib/security";

export default function AdminVaultPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<{ price: number, stock: number }>({ price: 0, stock: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        if (!supabase) {
            setLoading(false);
            return;
        }
        const { data, error } = await safeAction(async () => {
            const { data, error } = await supabase!
                .from("products")
                .select("*")
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        }, "Error al acceder a la bóveda de recursos.");

        if (!error && data) {
            setProducts(data as Product[]);
        } else {
            setError(error);
        }
        setLoading(false);
    };

    const startEditing = (product: Product) => {
        setEditingId(product.id);
        setEditValues({ price: product.price, stock: product.stock });
    };

    const saveQuickEdit = async (id: string) => {
        if (!supabase) return;
        const { error } = await safeAction(async () => {
            const { error } = await supabase!
                .from("products")
                .update({ price: editValues.price, stock: editValues.stock })
                .eq("id", id);
            if (error) throw error;
        }, "Error al actualizar recursos en el arsenal.");

        if (!error) {
            setProducts(prev => prev.map(p => p.id === id ? { ...p, price: editValues.price, stock: editValues.stock } : p));
            setEditingId(null);
        } else {
            alert(error);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("¿Seguro que desea eliminar este recurso del arsenal?")) return;
        if (!supabase) return;
        const { error } = await safeAction(async () => {
            const { error } = await supabase!.from("products").delete().eq("id", id);
            if (error) throw error;
        }, "Error al purgar el recurso del arsenal.");

        if (!error) fetchProducts();
        else alert(error);
    };

    const STOCK_THRESHOLD = 5;

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Header Section */}
            <div className="flex items-end justify-between border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Box size={18} className="text-gold" />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 italic">Arsenal de Recursos // Bóveda_Delta</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">Inventario <br /> <span className="text-white/10 text-8xl">Vault.</span></h1>
                </div>
                <button className="arobix-button bg-gold text-black hover:scale-105 shadow-gold-glow">
                    <Plus size={20} strokeWidth={3} /> ADQUIRIR_NUEVO_RECURSO
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                        <TrendingUp size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className="text-5xl font-black italic tracking-tighter">{products.length}</div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Módulos_Activos</div>
                    </div>
                </div>

                <div className={cn(
                    "glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox",
                    products.filter(p => p.stock < STOCK_THRESHOLD).length > 0 && "border-cyber-red/20 shadow-[0_0_40px_rgba(230,0,0,0.1)]"
                )}>
                    <div className={cn(
                        "w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-colors",
                        products.filter(p => p.stock < STOCK_THRESHOLD).length > 0 ? "text-cyber-red animate-pulse" : "text-white/40"
                    )}>
                        <ShieldAlert size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className={cn("text-5xl font-black italic tracking-tighter", products.filter(p => p.stock < STOCK_THRESHOLD).length > 0 ? "text-cyber-red cyber-glow" : "")}>
                            {products.filter(p => p.stock < STOCK_THRESHOLD).length}
                        </div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Stock_Crítico</div>
                    </div>
                </div>

                <div className="glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gold group-hover:scale-110 liquid-hover transition-transform">
                        <DollarSign size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black italic tracking-tighter text-gold gold-shimmer">{formatCurrency(products.reduce((a, c) => a + (c.price * c.stock), 0))}</div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Capital_de_Bóveda</div>
                    </div>
                </div>
            </div>

            {/* Inventory Table Area */}
            <div className="glass-morph rounded-[4rem] border border-white/5 overflow-hidden shadow-paradox">
                <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="relative max-w-xl w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(sanitizeString(e.target.value))}
                            placeholder="Localizar_Recurso_por_Identificador..."
                            className="w-full bg-white/[0.02] border border-white/5 h-14 rounded-2xl pl-14 pr-6 text-[10px] font-black uppercase tracking-widest focus:bg-white/5 focus:border-gold/30 outline-none liquid-hover shadow-inner placeholder:text-white/5"
                        />
                    </div>
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white liquid-hover italic px-6">
                        <Filter size={18} /> Filtros_de_Red
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/5">
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Módulo_Específico</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-center">Protocolo</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Precio_Unitario</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Disponibilidad</th>
                                <th className="px-10 py-8 text-right text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Control_Terminal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-32 text-center">
                                        <div className="flex flex-col items-center gap-6">
                                            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin shadow-gold-glow" />
                                            <span className="text-[11px] uppercase tracking-[0.6em] font-black text-gold gold-shimmer italic">Escaneando_Sectores_Arsenal...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : products.map((product) => {
                                const isEditing = editingId === product.id;
                                const isLowStock = product.stock < STOCK_THRESHOLD;

                                return (
                                    <tr key={product.id} className={cn(
                                        "hover:bg-white/[0.02] liquid-hover group transition-colors",
                                        isLowStock && "bg-cyber-red/[0.02]"
                                    )}>
                                        <td className="px-10 py-10">
                                            <div className="flex items-center gap-8">
                                                <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center p-4 group-hover:rotate-3 liquid-hover relative shadow-paradox">
                                                    <img src={product.image_url} alt="" className="max-w-full max-h-full object-contain" />
                                                    {isLowStock && (
                                                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-cyber-red border-4 border-obsidian rounded-xl flex items-center justify-center text-white shadow-luxury-glow">
                                                            <AlertCircle size={16} strokeWidth={3} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-black text-lg uppercase tracking-tighter italic text-white group-hover:text-gold transition-colors">{product.title}</div>
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">UUID // {product.id.slice(0, 12)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10 text-center">
                                            <span className="text-[9px] uppercase tracking-[0.4em] font-black px-5 py-2 border border-white/5 rounded-full bg-white/5 text-white/60 italic group-hover:border-gold/30 transition-colors">
                                                {product.category || 'MÓDULO_ALPHA'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-10">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={editValues.price}
                                                    onChange={(e) => setEditValues({ ...editValues, price: Number(e.target.value) })}
                                                    className="w-32 bg-white text-black font-black px-4 py-3 rounded-2xl text-sm italic outline-none shadow-inner"
                                                />
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="font-black text-2xl tracking-tighter italic text-white">{formatCurrency(product.price)}</span>
                                                    <span className="text-[8px] font-black uppercase text-white/10 tracking-widest italic leading-none">Precio_Elite</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex flex-col gap-4">
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={editValues.stock}
                                                        onChange={(e) => setEditValues({ ...editValues, stock: Number(e.target.value) })}
                                                        className="w-32 bg-white text-black font-black px-4 py-3 rounded-2xl text-sm italic outline-none shadow-inner"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <span className={cn(
                                                            "text-3xl font-black italic tracking-tighter leading-none",
                                                            isLowStock ? "text-cyber-red cyber-glow animate-pulse" : "text-white"
                                                        )}>{product.stock}</span>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] uppercase font-black text-white/20 tracking-widest italic line-height-none">UNIDADES</span>
                                                            {isLowStock && (
                                                                <span className="text-[10px] font-black text-cyber-red uppercase tracking-[0.1em] italic">ESTADO_CRÍTICO</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden w-40 relative border border-white/5">
                                                    <div
                                                        className={cn("h-full liquid-hover shadow-luxury-glow", isLowStock ? "bg-cyber-red" : "bg-gold")}
                                                        style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex items-center justify-end gap-4">
                                                <AnimatePresence mode="wait">
                                                    {isEditing ? (
                                                        <motion.div
                                                            key="editing"
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.8 }}
                                                            className="flex gap-2"
                                                        >
                                                            <button
                                                                onClick={() => saveQuickEdit(product.id)}
                                                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-500 text-black hover:scale-105 liquid-hover shadow-lg"
                                                            >
                                                                <Save size={20} strokeWidth={2.5} />
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/20 liquid-hover"
                                                            >
                                                                <X size={20} strokeWidth={2.5} />
                                                            </button>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="static"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="flex gap-3"
                                                        >
                                                            <button title="Visualizar" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:bg-white hover:text-black hover:border-white liquid-hover shadow-sm">
                                                                <Eye size={20} strokeWidth={1.5} />
                                                            </button>
                                                            <button
                                                                title="Editar Parámetros"
                                                                onClick={() => startEditing(product)}
                                                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:bg-gold hover:text-black hover:border-gold liquid-hover shadow-sm"
                                                            >
                                                                <Edit size={20} strokeWidth={1.5} />
                                                            </button>
                                                            <button
                                                                title="Eliminar Recurso"
                                                                onClick={() => deleteProduct(product.id)}
                                                                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:bg-cyber-red hover:text-white hover:border-cyber-red liquid-hover shadow-sm"
                                                            >
                                                                <Trash2 size={20} strokeWidth={1.5} />
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="p-10 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-gold" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">Suministro_Óptimo</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-cyber-red animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">Reabastecimiento_Prioritario</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 italic">
                        Vault_Auth_Level // 04_Internal_Access
                    </div>
                </div>
            </div>
        </div>
    );
}
