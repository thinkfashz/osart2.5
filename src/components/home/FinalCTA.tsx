"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="py-32 bg-gradient-to-br from-graphite via-midnight to-graphite relative overflow-hidden">
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 bg-tech-grid opacity-5" />

            {/* Gradient Accents */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-tech-green/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">

                    {/* Main Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-ivory leading-[1.1]">
                            Decisión Inteligente.
                            <br />
                            <span className="text-white/40">Inversión Correcta.</span>
                        </h2>

                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            No compare precios. Compare confiabilidad, durabilidad y rendimiento.
                            <br className="hidden md:block" />
                            Los profesionales eligen OSART.
                        </p>
                    </motion.div>

                    {/* Value Props */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
                    >
                        {[
                            { icon: Shield, label: "Garantía 24 Meses" },
                            { icon: Zap, label: "Envío Express" },
                            { icon: Shield, label: "Soporte Técnico" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-electric-blue border border-white/10">
                                    <item.icon size={20} strokeWidth={2} />
                                </div>
                                <span className="text-sm font-semibold text-white/90 tracking-wide">
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
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link
                            href="/catalog"
                            className="group bg-ivory text-graphite px-12 py-6 rounded-xl font-bold tracking-wide text-base flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 hover:shadow-showroom active:scale-[0.98] min-w-[280px]"
                        >
                            Acceder al Catálogo
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/support"
                            className="group bg-transparent border-2 border-white/20 text-ivory px-12 py-6 rounded-xl font-bold tracking-wide text-base flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-[0.98] min-w-[280px]"
                        >
                            Consultoría Técnica
                        </Link>
                    </motion.div>

                    {/* Trust Message */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-sm text-white/40 pt-8 border-t border-white/10 max-w-2xl mx-auto"
                    >
                        Más de 5,000 instalaciones profesionales confían en OSART.
                        <br />
                        Únase a la red de ingenieros que eligen precisión.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
