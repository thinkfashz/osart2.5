"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            {/* Holographic Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none pointer-events-none" />

            <div className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden h-full flex flex-col relative">
                {/* Image Container */}
                <Link href={`/product/${product.id}`} className="relative aspect-square bg-zinc-950 overflow-hidden border-b border-zinc-800">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                            <div className="text-4xl font-black text-zinc-900 italic tracking-tighter">OS_HARDWARE</div>
                        </div>
                    )}

                    {/* Scanning Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Stock Badge */}
                    {inStock && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400 border border-black/10">
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 size={10} className="text-black" />
                                <span className="text-[8px] font-black text-black uppercase tracking-widest">
                                    DISPONIBLE
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Category Tag */}
                    {product.category && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-800">
                            <span className="text-[8px] font-black text-zinc-400 tracking-[0.2em] uppercase">
                                {product.category}
                            </span>
                        </div>
                    )}
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col space-y-4">
                    <Link href={`/product/${product.id}`} className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-cyan-400" />
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">SERIAL_NUM: {product.id.substring(0, 8)}</span>
                        </div>
                        <h3 className="text-sm font-black text-zinc-100 tracking-tight group-hover:text-cyan-400 transition-colors uppercase italic leading-tight">
                            {product.title}
                        </h3>
                    </Link>

                    {/* Technical Specs Summary */}
                    <div className="grid grid-cols-2 gap-2 pb-4">
                        <div className="border border-zinc-800 p-2 bg-zinc-950/50">
                            <div className="text-[7px] text-zinc-600 font-black uppercase">PRECISIÓN</div>
                            <div className="text-[10px] text-zinc-300 font-black italic">GRADO_A</div>
                        </div>
                        <div className="border border-zinc-800 p-2 bg-zinc-950/50">
                            <div className="text-[7px] text-zinc-600 font-black uppercase">ESTADO</div>
                            <div className="text-[10px] text-zinc-300 font-black italic">ACTIVO</div>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">
                                COSTE_OPERATIVO
                            </div>
                            <div className="text-2xl font-black text-zinc-100 italic tracking-tighter tabular-nums">
                                ${product.price.toLocaleString()}
                            </div>
                        </div>

                        <button
                            className="w-12 h-12 bg-zinc-950 border border-zinc-800 text-zinc-100 flex items-center justify-center hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-500 relative overflow-hidden group/btn"
                            aria-label="Agregar al carrito"
                        >
                            <ShoppingCart size={18} strokeWidth={2} className="relative z-10" />
                            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                        </button>
                    </div>

                    {/* View Details Link */}
                    <Link
                        href={`/product/${product.id}`}
                        className="flex items-center justify-center gap-3 text-[9px] font-black text-zinc-500 hover:text-cyan-400 transition-all group/link mt-2 uppercase tracking-widest border border-zinc-800 py-3 hover:bg-zinc-800"
                    >
                        VER_ESPECIFICACIONES
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
