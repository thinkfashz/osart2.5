"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, AlertTriangle, ShieldX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#000814] flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[150px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
            </div>

            <div className="max-w-xl w-full text-center space-y-12 relative z-10">
                {/* Visual Error Code */}
                <div className="relative inline-block">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            textShadow: [
                                "0 0 0px rgba(0,0,0,0)",
                                "2px 0 10px rgba(0,53,102,0.8)",
                                "-2px 0 10px rgba(255,195,0,0.8)",
                                "0 0 0px rgba(0,0,0,0)"
                            ]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                        className="text-[12rem] md:text-[16rem] font-black italic tracking-tighter leading-none text-white select-none"
                    >
                        404
                    </motion.h1>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-white/20 blur-sm mix-blend-overlay animate-pulse" />
                </div>

                {/* Warning Content */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 text-gold">
                        <AlertTriangle size={24} />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Error de Redirección_</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white italic">
                        Has abandonado el <br />perímetro seguro.
                    </h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-sm mx-auto">
                        La coordenada solicitada no existe o ha sido desclasificada del servidor central de Osart Elite.
                    </p>
                </div>

                {/* Action */}
                <div className="flex flex-col items-center gap-6">
                    <Link
                        href="/"
                        className="arobix-button bg-gold text-black hover:bg-white hover:scale-110 luxury-transition px-12"
                    >
                        <MoveLeft size={18} /> REGRESAR AL PORTAL
                    </Link>

                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/20">
                        <ShieldX size={10} /> PROTOCOLO_DENEGADO // ACCESO_RESTRINGIDO
                    </div>
                </div>
            </div>

            {/* Floating particles decor */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        y: [0, -100, -200],
                        x: [0, (i % 2 === 0 ? 50 : -50)]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                    className="absolute bottom-0 w-1 h-1 bg-white/40 rounded-full"
                    style={{ left: `${20 * i + 10}%` }}
                />
            ))}
        </div>
    );
}
