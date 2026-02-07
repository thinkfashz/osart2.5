"use client";

import ElectroGame from "@/components/academy/ElectroGame";
import { Brain, Trophy, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AcademyQuizPage() {
    return (
        <div className="min-h-screen bg-transparent text-white pt-24 pb-24 overflow-Hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-white luxury-transition"
                        >
                            <ChevronLeft size={14} /> Volver al Portal
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
                                <Brain size={32} className="text-white" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Academy Vault</h1>
                                <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mt-2">Protocolo de Validación Técnica // Nivel 01</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-vibrant-gradient p-0.5 animate-pulse">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <Trophy size={20} className="text-white" />
                            </div>
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-widest font-black text-white/40">Tu Rango</span>
                            <div className="text-xl font-black italic text-white uppercase tracking-tight">Especialista Junior</div>
                        </div>
                    </div>
                </div>

                {/* Game Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <ElectroGame />

                    {/* Floating Info */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                        <div className="p-6 border border-white/10 rounded-3xl space-y-2 bg-charcoal/30 backdrop-blur-sm">
                            <div className="text-[10px] font-black uppercase text-gold tracking-widest">Aviso de Seguridad</div>
                            <p className="text-xs font-bold leading-relaxed">Cada fallo en el protocolo de validación drena los recursos del núcleo. Solo 3 intentos permitidos.</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-3xl space-y-2 bg-charcoal/30 backdrop-blur-sm">
                            <div className="text-[10px] font-black uppercase text-gold tracking-widest">Bonificación Multiplicadora</div>
                            <p className="text-xs font-bold leading-relaxed">Las respuestas consecutivas correctas activan el modo 'Combo Overclock', aumentando el XP base.</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-3xl space-y-2 bg-charcoal/30 backdrop-blur-sm">
                            <div className="text-[10px] font-black uppercase text-gold tracking-widest">Recompensa Elite</div>
                            <p className="text-xs font-bold leading-relaxed">Al alcanzar el rango 'Master', desbloqueas descuentos exclusivos en componentes de grado industrial.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
