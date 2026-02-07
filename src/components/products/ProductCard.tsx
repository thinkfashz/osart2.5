"use client";

import { Product } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Zap, ArrowUpRight, Cpu, Layers, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useProductPrice } from "@/hooks/useProductPrice";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isNew = parseInt(product.id) % 2 === 0;
    const addItem = useCartStore((state) => state.addItem);
    const priceData = useProductPrice(product.id);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col h-full group"
        >
            <Link
                href={`/product/${product.id}`}
                className="relative flex flex-col h-full"
            >
                {/* Image Container - Lux Presentation */}
                <div className="relative aspect-[4/5] w-full bg-surface border border-charcoal/5 rounded-3xl overflow-hidden p-8 flex items-center justify-center transition-all duration-500 hover:shadow-premium group-hover:border-gold/20">
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative w-full h-full transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-105">
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Elite Badge */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                        {isNew && (
                            <span className="text-[8px] uppercase tracking-[0.4em] font-bold bg-charcoal text-white px-4 py-2 rounded-full shadow-lg">
                                RECIÉN LLEGADO
                            </span>
                        )}
                    </div>

                    {/* Hidden Quick Add */}
                    <button
                        onClick={handleQuickAdd}
                        className="absolute bottom-6 left-6 right-6 h-12 rounded-xl bg-charcoal text-white text-[10px] font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl z-30 flex items-center justify-center hover:bg-gold"
                    >
                        AÑADIR A LA ORDEN
                    </button>
                </div>

                {/* Info Section - High-Fidelity Labels */}
                <div className="mt-8 space-y-4 px-2">
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold/60 group-hover:text-gold transition-colors block">
                            {product.category}
                        </span>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-charcoal leading-none line-clamp-1 group-hover:text-charcoal-light transition-colors">
                            {product.title}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
                        <div className="flex flex-col">
                            {priceData.finalPrice < priceData.originalPrice ? (
                                <>
                                    <span className="text-[10px] line-through text-charcoal/40 font-bold tracking-tight">
                                        {formatCurrency(priceData.originalPrice)}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black tracking-tighter text-red-600">
                                            {formatCurrency(priceData.finalPrice)}
                                        </span>
                                        <span className="bg-red-500 text-white text-[8px] font-black italic px-1.5 py-0.5 rounded">
                                            -{Math.round((1 - priceData.finalPrice / priceData.originalPrice) * 100)}%
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <span className="text-2xl font-black tracking-tighter text-charcoal">
                                    {formatCurrency(product.price)}
                                </span>
                            )}
                        </div>
                        <div className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/30 group-hover:text-gold group-hover:border-gold/30 transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

