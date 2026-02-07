"use client";

import { motion } from "framer-motion";
import { Heart, Search, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
    return (
        <div className="bg-transparent text-white min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="space-y-4 mb-16">
                    <div className="flex items-center gap-3">
                        <Heart size={20} className="text-gold" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Hardware Seleccionado</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                        Lista de Deseos
                    </h1>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[4rem] p-20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-white/20 border border-white/5">
                        <ShoppingBag size={40} />
                    </div>

                    <div className="space-y-4 relative z-10">
                        <h2 className="text-3xl font-black uppercase tracking-tight italic">Tu arsenal está vacío</h2>
                        <p className="text-white/40 text-sm font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                            No has reservado ningún componente en tu lista de deseos. Explora el catálogo para añadir módulos de alta precisión a tu configuración.
                        </p>
                    </div>

                    <div className="pt-8">
                        <Link
                            href="/catalog"
                            className="px-10 h-14 bg-charcoal text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black shadow-premium transition-all inline-flex items-center justify-center"
                        >
                            EXPLORAR CATÁLOGO <MoveRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Decorative Footer */}
                <div className="mt-20 flex justify-between items-center opacity-20">
                    <div className="text-[8px] font-black uppercase tracking-[0.5em]">Osart_Elite_Secure_Storage_v1.0</div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-1 h-3 bg-white" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
