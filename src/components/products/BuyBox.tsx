"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Sparkles, Zap, ShieldCheck, Truck, ShoppingCart, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BuyBoxProps {
    product: Product;
}

export default function BuyBox({ product }: BuyBoxProps) {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        if (quantity < product.stock) setQuantity(prev => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToCart = () => {
        setIsAdding(true);
        // Add multiple items if quantity > 1 (Assuming store handles index or loop)
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setTimeout(() => setIsAdding(false), 800);
    };

    const handleBuyNow = () => {
        addItem(product);
        router.push('/checkout');
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
            {/* Action Area */}
            <div className="space-y-8">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center bg-charcoal/5 border border-charcoal/5 rounded-2xl p-1 h-16 w-36 justify-between px-5 hover:border-gold/20 transition-all shadow-premium">
                            <button
                                onClick={decreaseQty}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-charcoal/5 transition-all text-2xl font-black text-charcoal/20 hover:text-gold disabled:opacity-0"
                                disabled={quantity <= 1}
                            > - </button>
                            <span className="font-black text-2xl text-charcoal italic">{quantity}</span>
                            <button
                                onClick={increaseQty}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-charcoal/5 transition-all text-2xl font-black text-charcoal/20 hover:text-gold disabled:opacity-0"
                                disabled={quantity >= product.stock}
                            > + </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[8px] uppercase tracking-[0.4em] font-black text-charcoal/20">Status // Stock_Verificado</span>
                            </div>
                            <span className="text-[12px] font-black text-charcoal tracking-widest uppercase italic">{product.stock} UNIDADES EN ALMACÉN</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className={cn(
                                "flex items-center justify-center gap-4 h-20 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-premium",
                                isAdding ? "bg-gold text-black shadow-gold-glow" : "bg-charcoal text-white hover:bg-gold hover:shadow-gold-glow"
                            )}
                        >
                            {isAdding ? (
                                <>
                                    <Sparkles size={18} className="animate-pulse" />
                                    ORDEN_SINCRONIZADA
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={18} />
                                    AÑADIR_A_LA_ORDEN
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleBuyNow}
                            disabled={product.stock <= 0}
                            className="h-20 bg-white text-charcoal border border-charcoal/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-charcoal hover:text-white transition-all italic flex items-center justify-center gap-4 group shadow-premium"
                        >
                            COMPRA_DIRECTA <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Micro-incentives - Celestial Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-charcoal/[0.01] border border-charcoal/5 group hover:border-gold/30 hover:shadow-premium transition-all duration-700">
                    <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold/40 group-hover:text-gold transition-colors">
                        <Truck size={20} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal">Logística_Industrial</p>
                        <p className="text-[8px] text-charcoal/20 font-bold uppercase italic tracking-[0.4em]">Entrega en Planta 24/48h</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-charcoal/[0.01] border border-charcoal/5 group hover:border-gold/30 hover:shadow-premium transition-all duration-700">
                    <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center text-gold/40 group-hover:text-gold transition-colors">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal">Garantía_OSORT</p>
                        <p className="text-[8px] text-charcoal/20 font-bold uppercase italic tracking-[0.4em]">Certificación de Componente</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
