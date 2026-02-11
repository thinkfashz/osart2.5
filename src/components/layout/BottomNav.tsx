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
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-6 pb-12 pt-2 pointer-events-none">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="mx-auto max-w-sm h-20 bg-zinc-950/90 backdrop-blur-2xl rounded-none shadow-3xl flex items-center justify-around px-8 pointer-events-auto border border-zinc-800 relative overflow-hidden group"
            >
                {/* Scanner Effect Line */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-20 bg-cyan-400/10 blur-2xl skew-x-12 pointer-events-none"
                />

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center py-2 h-full"
                        >
                            <motion.div
                                whileTap={{ scale: 0.8 }}
                                className={cn(
                                    "relative w-12 h-12 flex items-center justify-center transition-all duration-500",
                                    isActive ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-100"
                                )}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />

                                {isActive && (
                                    <>
                                        <motion.div
                                            layoutId="navTabBg"
                                            className="absolute inset-0 bg-cyan-400/10 border-t-2 border-cyan-400 pointer-events-none"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                        <motion.div
                                            layoutId="navTabGlow"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400/40 blur-lg"
                                        />
                                    </>
                                )}
                            </motion.div>

                            <span className={cn(
                                "text-[8px] font-black uppercase tracking-[0.4em] mt-1 transition-all duration-300",
                                isActive ? "text-cyan-400 opacity-100 translate-y-0" : "text-zinc-600 opacity-0 translate-y-2"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </motion.div>
        </nav>
    );
}
