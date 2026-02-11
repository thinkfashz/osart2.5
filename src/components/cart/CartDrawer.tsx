'use client';

import Image from 'next/image';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
    const { items, total, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCartStore();

    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-full sm:max-w-md bg-zinc-950/95 border-zinc-800 text-white p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-zinc-800">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-black text-white flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-gold" />
                            TU EQUIPO <span className="text-gold">[{items.length}]</span>
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    {items.length === 0 ? (
                        <div className="h-[60vh] flex items-center justify-center">
                            <EmptyState
                                icon={ShoppingBag}
                                title="CARRITO VACÍO"
                                description="Tu arsenal electrónico está esperando. Explora el catálogo para añadir componentes."
                                actionLabel="EXPLORAR EQUIPO"
                                onAction={() => toggleCart(false)}
                            />
                        </div>
                    ) : (
                        <div className="py-6 space-y-6">
                            <AnimatePresence>
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="relative w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={item.image_url}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-sm truncate uppercase tracking-tighter">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gold text-lg font-black mt-1">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-gold transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold font-mono">
                                                        {item.quantity.toString().padStart(2, '0')}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-gold transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="p-6 bg-zinc-900/50 border-t border-zinc-800 flex-col gap-4">
                        <div className="w-full flex justify-between items-end mb-2">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">TOTAL OPERATIVO</span>
                            <span className="text-3xl font-black text-white font-mono">${total.toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full h-14 bg-gold text-charcoal hover:bg-gold/90 text-lg font-black uppercase tracking-tighter flex items-center justify-center gap-2 group"
                            onClick={() => {
                                toggleCart(false);
                                // Redirect to checkout
                            }}
                        >
                            INICIAR PROTOCOLO DE PAGO
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <button
                            onClick={clearCart}
                            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors text-center w-full"
                        >
                            LIMPIAR MANIFIESTO
                        </button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
