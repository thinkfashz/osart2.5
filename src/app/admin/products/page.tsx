"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    CheckSquare,
    Square,
    Tag,
    Layers,
    ArrowUpCircle
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/Pagination";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";

export default function AdminProductsPage() {
    const router = useRouter();
    const {
        products,
        loading,
        fetchProducts,
        deleteProduct
    } = useProductStore();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOpenCreate = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleSaveProduct = async (productData: Omit<Product, "id">) => {
        if (editingProduct) {
            await useProductStore.getState().updateProduct(editingProduct.id, productData);
        } else {
            // Include user_id from session for RLS
            const { data: { session } } = await supabase.auth.getSession();
            const user_id = session?.user?.id;
            await useProductStore.getState().addProduct({ ...productData, user_id });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            await deleteProduct(id);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredProducts.map(p => p.id));
        }
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleBulkPriceUpdate = async () => {
        const adjustment = prompt("Ingrese el porcentaje de ajuste (ej: 10 para +10%, -5 para -5%):");
        if (!adjustment) return;
        alert("Acción masiva iniciada. Esta funcionalidad requiere una implementación de backend específica.");
    };

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-500">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Tag size={18} className="text-electric-blue" />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 italic">Catálogo_Maestro // Inyectando_Nuevos_Nodos</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">Productos <br /> <span className="text-white/10 text-8xl">Arsenal.</span></h1>
                </div>

                <div className="flex flex-wrap gap-6 items-center">
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 animate-in slide-in-from-right h-16">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{selectedIds.length} SELECCIONADOS</span>
                            <div className="h-6 w-[1px] bg-white/10" />
                            <button onClick={handleBulkPriceUpdate} className="text-[10px] font-black uppercase tracking-widest hover:text-electric-blue transition-colors flex items-center gap-3">
                                <ArrowUpCircle size={16} /> AJUSTE %
                            </button>
                            <button className="text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors flex items-center gap-3">
                                <Trash2 size={16} /> ELIMINAR
                            </button>
                        </div>
                    )}
                    <button
                        onClick={handleOpenCreate}
                        className="arobix-button bg-electric-blue text-white border-electric-blue h-16 flex items-center gap-4 px-10 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all"
                    >
                        <Plus size={24} strokeWidth={3} />
                        <span className="font-black italic">NUEVO_REPOSITORIO</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="glass-morph rounded-[4rem] border border-white/5 overflow-hidden shadow-paradox">
                <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="relative group max-w-sm w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-electric-blue transition-colors" size={20} />
                        <input
                            placeholder="LOCALIZAR_NODOS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 h-16 rounded-2xl pl-16 pr-8 text-[11px] font-black tracking-widest uppercase focus:bg-white/5 focus:border-electric-blue/30 outline-none liquid-hover shadow-inner placeholder:text-white/5"
                        />
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 italic">Filtro_Sector:</span>
                            <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-sm font-black italic text-white uppercase tracking-wider">
                                <option className="bg-midnight">Todos los Sectores</option>
                                <option className="bg-midnight">Automotriz</option>
                                <option className="bg-midnight">Módulos</option>
                            </select>
                        </div>
                        <div className="w-px h-10 bg-white/5" />
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                            Total: <span className="text-white italic">{filteredProducts.length}</span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.03] border-b border-white/5">
                                <th className="px-10 py-8 w-10">
                                    <button onClick={toggleSelectAll} className="text-white/20 hover:text-white transition-colors">
                                        {selectedIds.length === filteredProducts.length && filteredProducts.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Nodo_Tecnológico</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-center">Clasificación</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic">Inversión_Base</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-center">Unidades_Crit</th>
                                <th className="px-10 py-8 text-[10px] uppercase tracking-[0.5em] font-black text-white/20 italic text-right">Terminal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {loading && products.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-40 text-center animate-pulse">
                                            <div className="text-[10px] font-black uppercase tracking-[1em] text-white/20 italic">Accediendo al Arsenal Central...</div>
                                        </td>
                                    </tr>
                                ) : paginatedProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-40 text-center">
                                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">No se han detectado nodos de almacenamiento compatibles.</div>
                                        </td>
                                    </tr>
                                ) : paginatedProducts.map((product, idx) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.6, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                                        className={cn(
                                            "group hover:bg-white/[0.02] liquid-hover border-b border-white/5 transition-all duration-500",
                                            selectedIds.includes(product.id) && "bg-white/[0.04]"
                                        )}
                                    >
                                        <td className="px-10 py-10">
                                            <button onClick={() => toggleSelect(product.id)} className={cn(
                                                "transition-colors",
                                                selectedIds.includes(product.id) ? "text-electric-blue" : "text-white/10 group-hover:text-white/30"
                                            )}>
                                                {selectedIds.includes(product.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                            </button>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex items-center gap-8">
                                                <div className="w-24 h-24 bg-white/5 rounded-3xl p-4 flex items-center justify-center group-hover:bg-white/10 luxury-transition overflow-hidden border border-white/5 group-hover:border-electric-blue/30 shadow-2xl relative">
                                                    <div className="absolute inset-0 bg-electric-blue/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <img src={product.image_url} alt="" className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-110" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-black uppercase tracking-tighter italic text-white leading-tight group-hover:text-electric-blue transition-colors">
                                                        {product.title}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">#{product.id.slice(0, 8).toUpperCase()}</span>
                                                        {product.variants && product.variants.length > 0 && (
                                                            <span className="text-[8px] bg-electric-blue/20 text-electric-blue px-2 py-0.5 rounded-lg font-black italic border border-electric-blue/10">+{product.variants.length} CONFIGS</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10 text-center">
                                            <span className="text-[9px] uppercase tracking-[0.3em] font-black px-4 py-2 bg-white/5 rounded-2xl border border-white/10 text-white/40 italic">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-white tracking-tighter italic group-hover:cyber-glow transition-all">
                                                    {formatCurrency(product.price)}
                                                </span>
                                                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] italic">INVERSIÓN_NOMINAL</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        product.stock > 10 ? "bg-tech-green shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                                    )} />
                                                    <span className="text-xl font-black italic">{product.stock}</span>
                                                </div>
                                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">STOCK_SINC</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10">
                                            <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                                                <button
                                                    onClick={() => router.push(`/admin/products/${product.id}/variants`)}
                                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-white hover:text-black hover:border-white transition-all shadow-sm"
                                                    title="Diseñar Arquitectura"
                                                >
                                                    <Layers size={20} strokeWidth={1.5} />
                                                </button>
                                                <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-electric-blue hover:text-white hover:border-electric-blue transition-all" title="Calibrar Inversión"><Tag size={20} strokeWidth={1.5} /></button>
                                                <button
                                                    onClick={() => handleOpenEdit(product)}
                                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all"
                                                    title="Editar Núcleo"
                                                >
                                                    <Edit size={20} strokeWidth={1.5} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                                    title="Eliminar Registro"
                                                >
                                                    <Trash2 size={20} strokeWidth={1.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="border-t border-white/5"
                />
            </div>

            <ProductFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveProduct}
                initialData={editingProduct}
            />
        </div>
    );
}
