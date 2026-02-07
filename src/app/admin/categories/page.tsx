"use client";

import { useEffect, useState } from "react";
import {
    Layers,
    Plus,
    Search,
    MoreHorizontal,
    Trash2,
    Edit3,
    ChevronRight,
    ChevronDown,
    Image as ImageIcon,
    FolderPlus,
    X,
    Save
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, createCategory, updateCategory, deleteCategory, Category } from "@/app/actions/categoryActions";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "", parent_id: "" });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, newCategory);
            } else {
                await createCategory(newCategory);
            }
            setIsModalOpen(false);
            setEditingCategory(null);
            setNewCategory({ name: "", slug: "", description: "", parent_id: "" });
            loadData();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleEdit = (cat: Category) => {
        setEditingCategory(cat);
        setNewCategory({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || "",
            parent_id: cat.parent_id || ""
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Está seguro de eliminar esta categoría institucional? Esta acción puede afectar la visibilidad de los productos vinculados.")) {
            await deleteCategory(id);
            loadData();
        }
    };

    // Filter categories
    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Build hierarchy for display (simple list for now, but with parent label)
    const getParentName = (parentId: string | null) => {
        if (!parentId) return null;
        return categories.find(c => c.id === parentId)?.name;
    };

    // Reset to page 1 on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gold">
                        <Layers size={20} className="animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black italic shadow-gold-glow">Taxonomía // Arquitectura</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
                        Gestión de <span className="opacity-10">Categorías.</span>
                    </h1>
                </div>

                <button
                    onClick={() => { setEditingCategory(null); setNewCategory({ name: "", slug: "", description: "", parent_id: "" }); setIsModalOpen(true); }}
                    className="arobix-button bg-white text-black hover:scale-105 shadow-luxury-glow flex items-center gap-3"
                >
                    <Plus size={18} /> NUEVA CATEGORÍA
                </button>
            </div>

            {/* Filter */}
            <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-paradox">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="BUSCAR_POR_NOMBRE_SLUG..."
                        className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition text-white italic"
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="p-32 text-center animate-pulse">
                        <span className="text-[10px] font-black uppercase tracking-[1em] text-white/10">Indexando Nodos de Catálogo...</span>
                    </div>
                ) : paginatedCategories.length > 0 ? (
                    paginatedCategories.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-gold/30 luxury-transition group flex items-center justify-between shadow-paradox relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-gold/5 transition-colors pointer-events-none">
                                <Layers size={100} />
                            </div>
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white/10 group-hover:text-gold luxury-transition border border-white/5 shadow-luxury-glow">
                                    <Layers size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-black italic tracking-tighter uppercase text-white">
                                            {cat.name}
                                        </h3>
                                        {cat.parent_id && (
                                            <span className="px-3 py-1 bg-white/5 text-white/40 text-[8px] font-black uppercase rounded-full tracking-tighter border border-white/5 italic">
                                                Hijo de: {getParentName(cat.parent_id)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-black uppercase text-white/20 tracking-widest italic">
                                        <span className="text-gold">/{cat.slug}</span>
                                        <span className="opacity-50"># {cat.id.slice(0, 8)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 relative z-10">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white luxury-transition"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red/20 luxury-transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 text-center flex flex-col items-center gap-6">
                        <Layers size={40} className="text-white/10" />
                        <h3 className="text-xl font-black italic tracking-tighter uppercase text-white/20">Sin Categorías Dinámicas</h3>
                    </div>
                )}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        className="pt-8 border-t border-white/5"
                    />
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-charcoal/40 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-xl bg-midnight rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-white/10"
                        >
                            <div className="bg-white/5 p-10 flex items-center justify-between border-b border-white/5">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold italic">Configuración Terminal</span>
                                    <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">
                                        {editingCategory ? 'Editar' : 'Nueva'} Categoría.
                                    </h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 luxury-transition">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4 italic">Nombre Oficial</label>
                                        <input
                                            required
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl px-8 text-xs font-black uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition text-white italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4 italic">Slug (Identificador URL)</label>
                                        <input
                                            required
                                            value={newCategory.slug}
                                            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl px-8 text-xs font-black uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition text-white italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4 italic">Categoría Padre (Jerarquía)</label>
                                        <select
                                            value={newCategory.parent_id}
                                            onChange={(e) => setNewCategory({ ...newCategory, parent_id: e.target.value })}
                                            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl px-8 text-xs font-black uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition text-white italic appearance-none"
                                        >
                                            <option value="" className="bg-midnight">-- NODO RAÍZ --</option>
                                            {categories.filter(c => c.id !== editingCategory?.id).map(c => (
                                                <option key={c.id} value={c.id} className="bg-midnight">{c.name.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4 italic">Descripción Técnica</label>
                                        <textarea
                                            value={newCategory.description}
                                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                            className="w-full h-32 bg-white/[0.02] border border-white/5 rounded-2xl p-8 text-xs font-bold uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition resize-none text-white/80 italic"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="arobix-button bg-white text-black w-full h-18 text-xs shadow-luxury-glow"
                                >
                                    <Save size={20} /> GUARDAR CONFIGURACIÓN
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
