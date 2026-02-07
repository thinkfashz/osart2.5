"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "HOGAR", href: "/" },
        { icon: Cpu, label: "ARSENAL", href: "/catalog" },
        { icon: ShoppingBag, label: "BÓVEDA", href: "/cart" },
        { icon: User, label: "NODO", href: "/profile" },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-10 pt-2 pointer-events-none">
            <div className="mx-auto max-w-sm h-20 glass-morph rounded-[2.5rem] shadow-luxury-glow flex items-center justify-around px-6 pointer-events-auto border border-slate-900/10 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-vibrant-gradient opacity-5 transition-opacity duration-1000 group-hover:opacity-10 pointer-events-none" />

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center py-2"
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={cn(
                                    "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-gold-glow scale-110"
                                        : "text-slate-900/50 hover:text-slate-900/80 hover:bg-slate-900/5"
                                )}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabGlow"
                                        className="absolute -inset-1 rounded-[1.2rem] bg-gold/20 blur-md pointer-events-none"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.div>

                            <span className={cn(
                                "text-[7px] font-black uppercase tracking-[0.3em] mt-2 transition-all duration-500 italic",
                                isActive ? "text-slate-900 opacity-100" : "text-slate-900/40 opacity-100 scale-90"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
