"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export default function CartBadge() {
    const [mounted, setMounted] = useState(false);
    const items = useCartStore((state) => state.items);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    if (!mounted) return null;

    return (
        <div className="relative">
            {itemCount > 0 && (
                <span className={cn(
                    "absolute -top-1 -right-1 bg-cyber-red text-white text-[7px] font-black italic tracking-tighter",
                    "h-4 w-4 flex items-center justify-center rounded-lg animate-in zoom-in duration-500 shadow-luxury-glow border border-white/20 z-10"
                )}>
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </div>
    );
}
