"use client";

import { useEffect, useState } from "react";
import {
    BookOpen,
    ArrowRight,
    Cpu,
    Layers,
    Globe,
    Webhook,
    ShieldCheck,
    Settings2,
    Search,
    Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getRecipes, Recipe } from "@/app/actions/recipeActions";
import { cn } from "@/lib/utils";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("TODOS");

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getRecipes();
            setRecipes(data);
            setLoading(false);
        }
        load();
    }, []);

    const categories = ["TODOS", ...Array.from(new Set(recipes.map(r => r.category.toUpperCase())))];

    const filteredRecipes = recipes.filter(r =>
        (activeCategory === "TODOS" || r.category.toUpperCase() === activeCategory) &&
        (r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-48">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <span className="w-12 h-[2px] bg-accent" />
                            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-accent italic">OSORT_ENGINEERING // RECIPIES_HUB</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] text-white"
                        >
                            Industrial <br />
                            <span className="text-white/10">Blueprints.</span>
                        </motion.h1>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-accent transition-colors" size={20} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="BUSCAR PROTOCOLO..."
                            className="w-full bg-white/5 border border-white/10 h-16 rounded-[2rem] pl-16 pr-8 text-[10px] font-black uppercase tracking-widest focus:bg-white/10 focus:border-accent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 mb-24 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-8 h-12 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all luxury-transition whitespace-nowrap",
                                activeCategory === cat
                                    ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(230,0,0,0.3)]"
                                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="p-32 text-center animate-pulse">
                        <div className="text-[10px] font-black uppercase tracking-[1em] text-white/20">Accediendo a la Base de Datos...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRecipes.map((recipe, i) => (
                            <motion.div
                                key={recipe.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between hover:bg-white/[0.08] hover:border-accent/30 luxury-transition h-[400px] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 luxury-transition">
                                    <Layers size={140} strokeWidth={1} />
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-black uppercase text-accent tracking-[0.3em] bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
                                            {recipe.complexity}
                                        </div>
                                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{recipe.estimated_time}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.9] text-white group-hover:text-accent transition-colors">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-4 leading-relaxed line-clamp-2">
                                            {recipe.summary}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">{recipe.category}</span>
                                    <Link
                                        href={`/academy/recipes/${recipe.slug}`}
                                        className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-accent hover:text-white luxury-transition shadow-2xl"
                                    >
                                        <ArrowRight size={24} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Info Footer */}
                <div className="mt-32 p-12 bg-white/5 border border-white/10 rounded-[4rem] text-center space-y-4">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">¿Necesitas un Protocolo Customizado?</h2>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] max-w-2xl mx-auto">Nuestros ingenieros full-stack pueden diseñar una implementación específica para tu modelo de negocio industrial.</p>
                    <button className="arobix-button bg-accent text-white border-accent mt-8 px-12 h-14">
                        CONSULTAR A INGENIERÍA
                    </button>
                </div>

            </div>
        </div>
    );
}
