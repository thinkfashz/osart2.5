"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api-client";
import { dummyProducts } from "@/data/dummyProducts";
import PremiumProductCard from "@/components/products/PremiumProductCard";
import Link from "next/link";
import { ArrowLeft, Filter, Grid3x3, Navigation, Activity, Cpu, AlertTriangle } from "lucide-react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

function CatalogContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", { search, category }],
        queryFn: () => productsApi.list({ search, category }),
    });

    const products = (data?.data?.map(p => ({
        ...p,
        description: p.description || '',
        category: p.category || '',
        image_url: p.imageUrl || '',
        created_at: p.createdAt,
        user_id: p.userId
    })) as Product[]) || (isError ? dummyProducts : []);
    const totalItems = data?.meta?.total ?? products.length;

    const loading = isLoading;

    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-screen pt-32 pb-32 selection:bg-cyan-400/30 font-mono">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="mb-24 flex flex-col lg:flex-row items-start justify-between gap-16 border-b border-zinc-900 pb-16">
                    <div className="space-y-10 flex-1">
                        <Link href="/" className="group inline-flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-black transition-all duration-500">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-cyan-400 transition-all italic">RETORNO_A_BASE</span>
                        </Link>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <Navigation size={18} className="text-cyan-400" />
                                <span className="text-[10px] uppercase tracking-[0.8em] font-black text-zinc-600 italic">Protocolo_Suministros // Arsenal_Global</span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic"
                            >
                                Catálogo <br /> <span className="text-white/10">Arsenal.</span>
                            </motion.h1>

                            <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed uppercase font-bold italic border-l-2 border-zinc-800 pl-6">
                                UNIDADES_DE_ALTA_PRECISIÓN // GRADO_INDUSTRIAL_DISPONIBLE_PARA_DESPLIEGUE_INMEDIATO.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-6 pt-12 lg:pt-0 lg:border-l border-zinc-900 lg:pl-16 w-full lg:w-auto">
                        <div className="flex items-center gap-3 text-cyan-400">
                            <Activity size={14} />
                            <span className="text-[10px] font-black tracking-widest uppercase italic">Inventario_Detección</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-8xl md:text-9xl font-black tracking-tighter text-zinc-100 italic">
                                {totalItems.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-4">Unidades</span>
                        </div>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-zinc-900 border border-zinc-800 shadow-industrial">
                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500">
                            <Filter size={18} />
                        </div>
                        <span className="text-[10px] font-black text-zinc-100 uppercase tracking-widest">Configurar_Filtros</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-3 h-3 border border-zinc-700 group-hover:border-cyan-400 transition-colors" />
                            <span className="text-[10px] font-black text-zinc-600 group-hover:text-zinc-300 uppercase tracking-widest transition-colors">Ver_Todo</span>
                        </div>
                        <button className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-white transition-all italic underline underline-offset-8">
                            RESET_FILTROS
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-50" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
                        >
                            {products.map((product) => (
                                <PremiumProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Technical Footer */}
                <div className="mt-32 pt-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-10 opacity-30">
                    <div className="flex items-center gap-6">
                        <Cpu size={24} className="text-zinc-500" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">OSART_NUCLEO_v4.2</p>
                            <p className="text-[8px] font-mono text-zinc-600 uppercase mt-1">SISTEMA_DE_ADQUISICIÓN_DE_HARDWARE_CRÍTICO</p>
                        </div>
                    </div>
                    <div className="text-[10px] font-black text-zinc-700 text-right uppercase tracking-[0.2em] italic">
                        © 2026 // PROTOCOLO_DE_ALTA_DISPONIBILIDAD
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="bg-zinc-950 text-zinc-100 min-h-screen pt-32 pb-32 flex items-center justify-center">
                <div className="animate-pulse font-mono uppercase tracking-[0.5em] text-zinc-500">
                    Sincronizando_Protocolo_Suministros...
                </div>
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
