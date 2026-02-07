"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HomeHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-charcoal">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal to-transparent opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-sm"
                    >
                        <Sparkles size={14} className="text-gold" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Colección Invierno // 2026</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white italic uppercase"
                    >
                        Arquitectura <br />
                        <span className="text-gold gold-shimmer block">Soberana.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-sm md:text-base uppercase tracking-widest font-medium text-white/40 max-w-2xl mx-auto italic leading-relaxed"
                    >
                        Herramientas de alta ingeniería para mentes visionarias. Sincronice su flujo de trabajo con hardware robusto y estética minimalista.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
                    >
                        <Link href="/catalog" className="lux-button w-full sm:w-auto px-12 py-6 text-sm">
                            VER CATÁLOGO
                        </Link>
                        <Link href="/auth/signup" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-gold transition-colors">
                            SOLICITAR ACCESO RED
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
