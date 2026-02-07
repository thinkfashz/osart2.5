"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import Link from "next/link";

export default function PremiumHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-pearl via-ivory to-silver">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-tech-grid opacity-40" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-tech-green/5" />

            <div className="container mx-auto px-6 py-32 relative z-10">
                <div className="max-w-5xl mx-auto text-center space-y-12">

                    {/* Micro Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-graphite/5 border border-graphite/10 backdrop-blur-sm"
                    >
                        <Award size={14} className="text-electric-blue" />
                        <span className="text-xs font-semibold tracking-wide text-graphite">
                            Calidad Profesional Certificada
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight text-graphite leading-[0.95]"
                    >
                        Precisión Electrónica.
                        <br />
                        <span className="text-slate-deep/60">Confianza Absoluta.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-deep/70 max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        Repuestos electrónicos de grado industrial para equipos exigentes.
                        <br className="hidden md:block" />
                        Durabilidad garantizada. Rendimiento superior. Instalación precisa.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <Link href="/catalog" className="osart-button group min-w-[240px]">
                            Explorar Catálogo
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link href="/academy" className="osart-button-outline group min-w-[240px]">
                            Especificaciones Técnicas
                            <Zap size={18} className="group-hover:rotate-12 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto border-t border-graphite/10"
                    >
                        {[
                            { icon: Shield, label: "Garantía Extendida", value: "24 Meses" },
                            { icon: Zap, label: "Compatibilidad", value: "99.8%" },
                            { icon: Award, label: "Certificación", value: "ISO 9001" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-xl bg-graphite/5 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue/10 transition-colors">
                                    <item.icon size={20} strokeWidth={2} />
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-graphite">{item.value}</div>
                                    <div className="text-xs text-slate-deep/60 font-medium tracking-wide">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
        </section>
    );
}
