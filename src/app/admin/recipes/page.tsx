"use client";

import { useEffect, useState } from "react";
import {
    BookOpen,
    Plus,
    Search,
    MoreHorizontal,
    Trash2,
    ExternalLink,
    Eye,
    CheckCircle2,
    XCircle,
    Copy,
    Cpu,
    Layers,
    Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getRecipes, deleteRecipe, Recipe } from "@/app/actions/recipeActions";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function AdminRecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        setLoading(true);
        const data = await getRecipes();
        setRecipes(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este Blueprint industrial? Esta acción es irreversible.")) {
            await deleteRecipe(id);
            loadRecipes();
        }
    };

    const filteredRecipes = recipes.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset to page 1 on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
    const paginatedRecipes = filteredRecipes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-12 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gold">
                        <Cpu size={20} className="animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black italic shadow-gold-glow">Operaciones // Blueprints</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
                        Gestión de <span className="opacity-10">Recetas Técnicas.</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="arobix-button bg-white text-black hover:scale-105 shadow-luxury-glow flex items-center gap-3">
                        <Plus size={18} /> NUEVO BLUEPRINT
                    </button>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-paradox">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="BUSCAR_PROTOCOLOS..."
                        className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-8 text-xs font-black uppercase tracking-widest focus:bg-white/5 outline-none luxury-transition text-white italic"
                    />
                </div>
            </div>

            {/* System Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Protocolos Activos", value: recipes.length, color: "text-gold" },
                    { label: "Integridad de Datos", value: "99.8%", color: "text-tech-green" },
                    { label: "Vistas Totales", value: "1.4k", color: "text-white" },
                    { label: "Nivel de Acceso", value: "LVL_4_OPERATOR", color: "text-cyber-red" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl shadow-paradox">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2 italic">{stat.label}</p>
                        <p className={cn("text-2xl font-black italic tracking-tighter uppercase", stat.color)}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recipes Grid/List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="p-32 text-center animate-pulse">
                        <span className="text-[10px] font-black uppercase tracking-[1em] text-white/10">Sincronizando Archivos Industriales...</span>
                    </div>
                ) : paginatedRecipes.length > 0 ? (
                    paginatedRecipes.map((recipe, i) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-gold/30 luxury-transition group flex flex-col md:flex-row items-center justify-between shadow-paradox gap-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-gold/5 transition-colors pointer-events-none">
                                <BookOpen size={100} />
                            </div>
                            <div className="flex items-center gap-8 w-full md:w-auto relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-white/10 group-hover:text-gold luxury-transition border border-white/5 shadow-luxury-glow shrink-0">
                                    <BookOpen size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-black italic tracking-tighter uppercase text-white">
                                            {recipe.title}
                                        </h3>
                                        <span className="px-3 py-1 bg-white text-black text-[8px] font-black uppercase rounded-full tracking-tighter italic">
                                            {recipe.complexity}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-black uppercase text-white/20 tracking-widest italic">
                                        <span className="flex items-center gap-1.5"><Layers size={12} /> {recipe.category}</span>
                                        <span className="text-gold italic">REF_{recipe.slug.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-end relative z-10">
                                <button
                                    onClick={() => window.open(`/academy/recipes/${recipe.slug}`, '_blank')}
                                    className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white luxury-transition"
                                    title="Ver en Academia"
                                >
                                    <ExternalLink size={18} />
                                </button>
                                <button
                                    className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white luxury-transition"
                                    title="Editar Blueprint"
                                >
                                    <Settings2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(recipe.id)}
                                    className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-white/20 hover:bg-cyber-red/10 hover:text-cyber-red hover:border-cyber-red/20 luxury-transition"
                                    title="Archivar Protocolo"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-32 bg-white/5 rounded-[3rem] border border-dashed border-white/10 text-center flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10">
                            <BookOpen size={40} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white/20">Sin Blueprints Encontrados</h3>
                            <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest italic">Inicia una nueva secuencia de documentación</p>
                        </div>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-8 border-t border-white/5"
                />
            )}
        </div>
    );
}
