"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-16">

                    {/* Main Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-100 leading-[0.9] uppercase">
                            Decisión de
                            <br />
                            <span className="text-zinc-800">Alto Rango.</span>
                        </h2>

                        <p className="text-[14px] md:text-[16px] text-zinc-500 font-bold uppercase tracking-tight max-w-2xl mx-auto leading-relaxed">
                            No compare costos unitarios. Evalúe fiabilidad estructural y rendimiento de campo.
                            <br className="hidden md:block" />
                            Los ingenieros soberanos eligen OSART.
                        </p>
                    </motion.div>

                    {/* Value Props */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-zinc-900"
                    >
                        {[
                            { icon: Shield, label: "GARANTÍA_ESTRUCTURAL_24M" },
                            { icon: Zap, label: "LOGÍSTICA_PRIORITARIA" },
                            { icon: Shield, label: "SOPORTE_SISTÉMICO_DIRECTO" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-center gap-4 bg-zinc-900/50 p-6 border border-zinc-800">
                                <div className="text-cyan-400">
                                    <item.icon size={18} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/catalog"
                            className="osart-button w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-3"
                        >
                            SINCRONIZAR CATÁLOGO
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/support"
                            className="osart-button-outline w-full sm:w-auto min-w-[300px] flex items-center justify-center gap-3"
                        >
                            CONSULTORÍA_TÉCNICA
                        </Link>
                    </motion.div>

                    {/* Trust Message */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em] pt-8"
                    >
                        +8,000 DISPOSITIVOS DESPLEGADOS_EN_PRODUCCIÓN_ACTIVA.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
