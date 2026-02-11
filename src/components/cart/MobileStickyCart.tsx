'use client';

import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function MobileStickyCart() {
    const { items, total, toggleCart } = useCartStore();
    const itemCount = items.length;

    return (
        <AnimatePresence>
            {itemCount > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-[90] lg:hidden"
                >
                    <Button
                        onClick={() => toggleCart(true)}
                        className="w-full h-16 bg-zinc-950 border border-gold/30 shadow-[0_0_20px_rgba(212,180,0,0.15)] rounded-none flex items-center justify-between px-6 overflow-hidden relative group"
                    >
                        {/* Background scanner effect */}
                        <motion.div
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-gold/5 to-transparent skew-x-12"
                        />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center border border-gold/20">
                                <ShoppingBag className="w-5 h-5 text-gold" />
                            </div>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">MANIFIESTO ACTIVO</span>
                                <span className="text-sm font-bold text-white uppercase">{itemCount} DISPOSITIVOS</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 relative z-10">
                            <span className="text-xl font-black font-mono text-gold">${total.toFixed(2)}</span>
                            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-charcoal">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
