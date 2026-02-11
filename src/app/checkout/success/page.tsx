"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, Home, ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("order") || searchParams.get("orderId") || "ORD-XXXX-XXXX";

    useEffect(() => {
        // Animación de Fuegos Artificiales (Celebración)
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Desde los lados
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-ivory via-pearl to-silver flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-tech-green/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Success Card */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] p-12 shadow-showroom border border-graphite/10 text-center space-y-8">

                    {/* Icon & Celebration */}
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                            className="w-24 h-24 rounded-3xl bg-tech-green/10 border-2 border-tech-green/20 flex items-center justify-center text-tech-green shadow-lg"
                        >
                            <CheckCircle2 size={48} />
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-6xl font-bold tracking-tight text-graphite leading-[0.9]"
                        >
                            ¡Gracias por tu compra!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-slate-deep/60 font-medium"
                        >
                            Tu pedido ha sido procesado con éxito y está listo para producción.
                        </motion.p>
                    </div>

                    {/* Order Details box */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-pearl/50 rounded-3xl p-8 border border-graphite/5 space-y-4"
                    >
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold uppercase tracking-widest text-slate-deep/40">Número de Orden</span>
                            <span className="font-mono font-bold text-electric-blue text-lg">{orderNumber}</span>
                        </div>
                        <div className="w-full h-px bg-graphite/5" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Package size={18} className="text-slate-deep/40" />
                                <span className="text-sm font-semibold text-slate-deep/60">Estado:</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-tech-green/10 text-tech-green text-xs font-bold uppercase tracking-wide border border-tech-green/20">
                                Confirmado
                            </span>
                        </div>
                    </motion.div>

                    {/* Trust Factor */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center gap-6 py-4 border-t border-graphite/5"
                    >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-deep/40">
                            <ShieldCheck size={14} className="text-tech-green" />
                            Transacción Segura
                        </div>
                        <div className="w-px h-4 bg-graphite/10" />
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-deep/40">
                            <ShoppingBag size={14} className="text-electric-blue" />
                            OSART Certified
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/catalog" className="h-16 px-10 bg-gradient-to-br from-graphite to-midnight text-white rounded-2xl font-bold uppercase tracking-wide text-sm hover:shadow-elevated transition-all flex items-center justify-center gap-3 group">
                            Continuar Comprando
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/" className="h-16 px-10 bg-white border-2 border-graphite/20 hover:border-graphite/40 text-graphite rounded-2xl font-bold uppercase tracking-wide text-sm transition-all flex items-center justify-center gap-3">
                            <Home size={18} />
                            Volver al Inicio
                        </Link>
                    </motion.div>
                </div>

                {/* Footer text */}
                <p className="mt-12 text-center text-xs font-semibold uppercase tracking-widest text-slate-deep/30">
                    Soporte Técnico: support@osart.com | ID Transacción: {Math.random().toString(36).substring(7).toUpperCase()}
                </p>
            </motion.div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-electric-blue/30 border-t-electric-blue animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
