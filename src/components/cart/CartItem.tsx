"use client";

import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useProductPrice } from "@/hooks/useProductPrice";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const priceData = useProductPrice(item.id, undefined, item.quantity);

    return (
        <div className="flex gap-10 py-12 border-b border-white/5 last:border-0 group liquid-hover relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-red/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-32 h-32 flex-shrink-0 bg-white rounded-[2rem] overflow-hidden shadow-paradox liquid-hover group-hover:scale-105 relative z-10">
                <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-contain p-6 transition-transform duration-700"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-black italic">
                            {item.category || 'Módulo Premium'}
                        </span>
                        <Link href={`/product/${item.id}`} className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-cyber-red transition-colors block leading-tight">
                            {item.title}
                        </Link>
                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest italic">ID_MOD // {item.id.slice(0, 12)}</p>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/10 hover:text-cyber-red liquid-hover p-3 hover:bg-white/5 rounded-2xl"
                        aria-label="Eliminar"
                    >
                        <Trash2 size={20} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center glass-morph px-2 py-1 rounded-2xl border border-white/10">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl liquid-hover font-black"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-lg font-black italic text-white">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl liquid-hover font-black"
                            disabled={item.quantity >= (item.stock || 99)}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <div className="text-right flex flex-col items-end">
                        {priceData.finalPrice < priceData.originalPrice && (
                            <span className="text-[10px] line-through text-white/20 font-bold tracking-tight mb-1">
                                {formatCurrency(priceData.originalPrice * item.quantity)}
                            </span>
                        )}
                        <p className="text-3xl font-black tracking-tighter text-white italic cyber-glow">
                            {formatCurrency(priceData.finalPrice * item.quantity)}
                        </p>
                        {priceData.discountsApplied.length > 0 && (
                            <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest mt-1">
                                {priceData.discountsApplied[0].name} Aplicado
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
