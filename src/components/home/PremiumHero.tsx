"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import Link from "next/link";

export default function PremiumHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent" />

            <div className="container mx-auto px-6 py-32 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col items-center">

                    {/* Industrial Micro Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-900 border border-zinc-800 mb-12"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-cyan-400"
                        />
                        <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">
                            INDUSTRIAL_GRADE_COMPONENTS
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="text-center space-y-4 mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                            className="text-7xl md:text-[10rem] font-black tracking-tighter text-zinc-100 leading-[0.85] italic uppercase"
                        >
                            HARDWARE
                            <br />
                            <span className="text-cyan-400 flex items-center justify-center gap-4">
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "auto" }}
                                    className="h-1 bg-zinc-800 flex-1 hidden md:block"
                                />
                                SOBERANO
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "auto" }}
                                    className="h-1 bg-zinc-800 flex-1 hidden md:block"
                                />
                            </span>
                        </motion.h1>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-2xl text-zinc-500 max-w-2xl text-center leading-relaxed font-bold italic mb-16 uppercase tracking-tight"
                    >
                        Ingeniería de alta precisión para sistemas críticos.
                        Donde el rendimiento no es una opción, es el estándar.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full max-w-3xl"
                    >
                        <Link href="/catalog" className="industrial-button w-full sm:flex-1">
                            INGRESAR_AL_ARSENAL
                            <ArrowRight size={20} />
                        </Link>

                        <Link href="/support" className="osart-button-outline w-full sm:flex-1">
                            SOPORTE_TÉCNICO_A
                            <Zap size={18} />
                        </Link>
                    </motion.div>

                    {/* Hardware Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-24 w-full border-t border-zinc-900/50 mt-24"
                    >
                        {[
                            { label: "LATENCIA", value: "0.02ms" },
                            { label: "PRECISIÓN", value: "99.9%" },
                            { label: "GARANTÍA", value: "LIFE_T" },
                            { label: "CERT_ISO", value: "27001" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2 text-center md:text-left">
                                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{item.label}</div>
                                <div className="text-3xl font-black text-zinc-300 italic tabular-nums group-hover:text-cyan-400 transition-colors">{item.value}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
