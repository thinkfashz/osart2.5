"use client";

import { motion } from "framer-motion";
import { Gift, Zap } from "lucide-react";

interface SalesBonusProps {
    bonusText: string;
    points?: number;
}

export default function SalesBonus({ bonusText, points }: SalesBonusProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 p-6 group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Gift size={80} className="text-gold" />
            </div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black">
                        <Zap size={16} fill="currentColor" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Elite Bonus Included</span>
                </div>

                <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">
                    {bonusText}
                </h4>

                {points && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                        <span className="text-gold font-bold">+{points}</span>
                        <span className="text-[9px] uppercase tracking-widest font-black text-white/40">Knowledge Points</span>
                    </div>
                )}
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </motion.div>
    );
}
