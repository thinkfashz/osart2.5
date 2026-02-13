"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface Product {
    id: string;
    title: string;
    price: number;
    image_url?: string;
    category?: string;
    stock?: number;
    description?: string;
}

interface PremiumProductCardProps {
    product: Product;
}

export default function PremiumProductCard({ product }: PremiumProductCardProps) {
    const inStock = (product.stock ?? 0) > 0;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } }
            }}
            whileHover={{ y: -5 }}
            className="group relative h-full"
        >
            <div className="bg-zinc-950 border border-zinc-900 group-hover:border-cyan-400 group-hover:shadow-cyan-glow transition-all duration-500 overflow-hidden h-full flex flex-col relative">
                {/* ID Ribbon */}
                <div className="absolute top-0 left-0 bg-zinc-900 border-r border-b border-zinc-800 px-2 py-1 z-20">
                    <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">#{product.id.substring(0, 6)}</span>
                </div>

                {/* Image Container */}
                <Link href={`/product/${product.id}`} className="relative aspect-square bg-zinc-900 overflow-hidden block">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                            <Cpu size={40} className="text-zinc-800 group-hover:text-cyan-400/20 transition-colors" />
                        </div>
                    )}

                    {/* Stock Overlay */}
                    <div className="absolute bottom-2 right-2">
                        {inStock ? (
                            <div className="px-2 py-1 bg-cyan-400 flex items-center gap-1 shadow-2xl">
                                <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full animate-pulse" />
                                <span className="text-[7px] font-black text-zinc-950 uppercase tracking-[0.2em]">OPERATIVO</span>
                            </div>
                        ) : (
                            <div className="px-2 py-1 bg-cyber-red flex items-center gap-1 shadow-2xl">
                                <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">AGOTADO</span>
                            </div>
                        )}
                    </div>
                </Link>

                {/* Info Area */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">{product.category || 'GENERAL_UNIT'}</div>
                        <h3 className="text-xs font-black text-zinc-300 group-hover:text-zinc-100 transition-colors uppercase italic tracking-tight leading-tight mb-4">
                            {product.title}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">UNIDAD_VALOR</span>
                                <div className="text-2xl font-black text-zinc-100 italic tracking-tighter">
                                    {formatCurrency(product.price)}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-cyan-400 hover:border-cyan-400 flex items-center justify-center transition-all"
                            >
                                <ShoppingCart size={16} />
                            </motion.button>
                        </div>

                        <Link href={`/product/${product.id}`} className="block w-full text-center border-t border-zinc-900 pt-4 text-[8px] font-black text-zinc-600 hover:text-cyan-400 transition-colors uppercase tracking-[0.4em]">
                            VER_PROTOCOLOS
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
