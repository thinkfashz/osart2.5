"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Clock,
    BarChart3,
    ShieldCheck,
    Cpu,
    Code2,
    Terminal,
    ArrowRight,
    Share2,
    Bookmark,
    Layers,
    FileCode,
    Command,
    Settings2
} from "lucide-react";
import { motion } from "framer-motion";
import { getRecipeBySlug, Recipe } from "@/app/actions/recipeActions";
import { cn } from "@/lib/utils";

// Custom Luxury Markdown Renderer
const OSORTRenderer = ({ content }: { content: string }) => {
    if (!content) return null;

    // Very basic split by double newline for paragraphs
    const blocks = content.split('\n\n');

    return (
        <div className="space-y-10">
            {blocks.map((block, i) => {
                // Code Blocks
                if (block.startsWith('```')) {
                    const code = block.replace(/```(typescript|javascript|bash|json)?/, '').replace(/```$/, '').trim();
                    const lang = block.match(/```(\w+)/)?.[1] || 'code';

                    return (
                        <div key={i} className="rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl group">
                            <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic ml-4">Terminal_Input // {lang}</span>
                                </div>
                                <Command size={14} className="text-white/10 group-hover:text-accent luxury-transition" />
                            </div>
                            <pre className="p-8 overflow-x-auto">
                                <code className="text-sm font-mono text-white/80 leading-relaxed block">
                                    {code}
                                </code>
                            </pre>
                        </div>
                    );
                }

                // Headers
                if (block.startsWith('##')) {
                    return (
                        <h2 key={i} className="text-3xl font-black italic tracking-tighter uppercase text-white mt-16 first:mt-0">
                            {block.replace('##', '').trim()}
                        </h2>
                    );
                }

                // Lists
                if (block.startsWith('-') || block.match(/^\d\./)) {
                    const items = block.split('\n');
                    return (
                        <ul key={i} className="space-y-4">
                            {items.map((item, idx) => (
                                <li key={idx} className="flex gap-4 text-white/60 text-lg leading-relaxed font-medium italic">
                                    <span className="text-accent flex-shrink-0 mt-2"><ArrowRight size={14} /></span>
                                    {item.replace(/^-\s|^\d\.\s/, '')}
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Standard Paragraph
                return (
                    <p key={i} className="text-white/60 text-lg leading-relaxed font-medium italic">
                        {block}
                    </p>
                );
            })}
        </div>
    );
};

export default function RecipeDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await getRecipeBySlug(slug as string);
            setRecipe(data);
            setLoading(false);
        }
        if (slug) load();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <div className="w-24 h-24 rounded-full border-t-2 border-accent animate-spin" />
                <div className="text-[10px] font-black uppercase tracking-[1em] animate-pulse">Sincronizando Blueprint...</div>
            </div>
        </div>
    );

    if (!recipe) return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
            <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                <FileCode size={40} />
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Blueprint Extraviado</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Protocolo no encontrado en los registros centrales</p>
            </div>
            <button onClick={() => router.push('/academy/recipes')} className="arobix-button bg-white text-black h-12 px-10">Volver al Hub</button>
        </div>
    );

    const steps = (recipe.metadata?.steps as any[]) || [];
    const stack = (recipe.metadata?.stack as string[]) || ["Industrial API", "Core_Internal"];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-48 selection:bg-accent/30">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Back Link */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-4 text-white/20 hover:text-white mb-16 luxury-transition group"
                >
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black luxury-transition">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Regresar a la Base</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">
                        <section className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4 text-accent"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{recipe.category}</span>
                                <div className="w-8 h-px bg-accent/30" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">RECIPE_ID_{recipe.slug.toUpperCase().slice(0, 8)}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8] mb-8"
                            >
                                {recipe.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-3xl text-white/40 leading-relaxed font-medium italic max-w-3xl"
                            >
                                {recipe.summary}
                            </motion.p>
                        </section>

                        {/* Rich Content Rendering */}
                        <section className="pt-24 border-t border-white/5">
                            <OSORTRenderer content={recipe.content} />
                        </section>

                        {/* Implementation Steps */}
                        {steps.length > 0 && (
                            <section className="space-y-16 pt-32">
                                <div className="flex items-center gap-8">
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">Protocolo de Implementación</h2>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {steps.map((step: any, i: number) => (
                                        <div key={i} className="group bg-white/5 border border-white/10 rounded-[4rem] p-12 pr-16 flex gap-12 hover:bg-white/[0.08] luxury-transition relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-110 luxury-transition">
                                                <Settings2 size={120} />
                                            </div>

                                            <div className="flex-shrink-0 w-20 h-20 rounded-[2rem] bg-black border border-white/5 flex items-center justify-center text-accent text-3xl font-black italic group-hover:bg-accent group-hover:text-white luxury-transition shadow-2xl relative z-10">
                                                {i + 1}
                                            </div>
                                            <div className="space-y-4 relative z-10">
                                                <h4 className="text-2xl font-black uppercase tracking-tight">{step.title}</h4>
                                                <p className="text-sm font-bold text-white/30 uppercase tracking-[0.1em] leading-relaxed max-w-2xl">
                                                    {step.body}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Specs */}
                    <div className="lg:col-span-4">
                        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 sticky top-32 space-y-12 backdrop-blur-3xl">
                            <div className="space-y-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Dificultad</span>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            recipe.complexity === 'Expert' ? "bg-red-500 shadow-red-glow" :
                                                recipe.complexity === 'Advanced' ? "bg-accent shadow-accent-glow" : "bg-green-500 shadow-green-glow"
                                        )} />
                                        <span className="text-xs font-black uppercase text-white">{recipe.complexity}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Estimación</span>
                                    <div className="flex items-center gap-3 text-sm font-black italic">
                                        <Clock size={16} className="text-accent" />
                                        {recipe.estimated_time || '2h'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h5 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Technical_Stack</h5>
                                <div className="flex flex-wrap gap-3">
                                    {stack.map((s: string) => (
                                        <span key={s} className="px-5 py-2.5 bg-black border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-accent/80 hover:text-white hover:border-accent luxury-transition cursor-default">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 border-t border-white/10 space-y-4 text-center">
                                <button className="w-full h-18 bg-white text-black rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-white luxury-transition flex items-center justify-center gap-4 shadow-2xl">
                                    DESCARGAR RECURSOS <Code2 size={20} />
                                </button>
                                <button className="w-full h-18 bg-white/5 border border-white/10 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white/10 luxury-transition flex items-center justify-center gap-4">
                                    MARCAR PROGRESO <ShieldCheck size={20} />
                                </button>
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-4 italic">Protocolo de Aprendizaje Alpha v1</p>
                            </div>

                            <div className="flex items-center justify-center gap-10 pt-4 border-t border-white/5">
                                <button className="text-white/20 hover:text-accent luxury-transition"><Share2 size={20} /></button>
                                <button className="text-white/20 hover:text-accent luxury-transition"><Bookmark size={20} /></button>
                                <button className="text-white/20 hover:text-accent luxury-transition"><BarChart3 size={20} /></button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
