"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

interface ProductCardDetailsProps {
    title: string;
    price: number;
    stock: number;
    onAdd?: () => void;
}

export default function ProductCardDetails({ title, price, stock, onAdd }: ProductCardDetailsProps) {
    const inStock = stock > 0;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group bg-[#111] border border-zinc-800 p-5 space-y-4 transition-all duration-300"
        >
            <div className="space-y-1">
                <h3 className="text-white font-bold truncate text-base tracking-tight uppercase">
                    {title}
                </h3>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-emerald-400 tracking-tighter italic">
                            ${price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={inStock ? "text-zinc-500" : "text-red-500/70"}>
                                {inStock ? (
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 size={10} className="text-emerald-500/50" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider">Stock: {stock} unidades</span>
                                    </div>
                                ) : (
                                    <span className="text-[10px] uppercase font-bold tracking-wider underline decoration-red-500/30">Agotado</span>
                                )}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAdd?.();
                        }}
                        className="relative overflow-hidden w-12 h-12 rounded-none bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-100 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-500 transition-all duration-300 shadow-lg active:scale-95"
                    >
                        <ShoppingCart size={20} strokeWidth={2.5} className="relative z-10 transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>
                </div>
            </div>

            {/* Micro-animation: Info line on hover */}
            <div className="h-[2px] w-0 bg-emerald-400 group-hover:w-full transition-all duration-500" />
        </motion.div>
    );
}
