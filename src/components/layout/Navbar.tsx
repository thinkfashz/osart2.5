"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Search,
    ShoppingBag,
    User,
    Menu,
    X,
    Cpu
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { sanitizeString } from "@/lib/security";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const cartItemsCount = useCartStore((state) => state.items.length);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Catálogo", href: "/catalog" },
        { name: "Academia", href: "/academy" },
        { name: "Soporte", href: "/support" },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                isScrolled ? "glass-showroom py-4 shadow-subtle" : "bg-ivory/80 backdrop-blur-sm py-6"
            )}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex items-center justify-between">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-graphite flex items-center justify-center transition-transform group-hover:scale-110">
                            <Cpu size={20} className="text-electric-blue" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-tight leading-none text-graphite">OSART</span>
                            <span className="text-[8px] uppercase tracking-[0.3em] font-semibold text-platinum">Electronic Components</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-semibold tracking-wide transition-all hover:text-electric-blue relative",
                                    pathname === link.href
                                        ? "text-electric-blue after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-electric-blue"
                                        : "text-slate-deep/60"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center bg-pearl rounded-xl px-5 py-2.5 border border-graphite/10">
                            <Search size={16} className="text-slate-deep/40" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(sanitizeString(e.target.value))}
                                placeholder="Buscar componentes..."
                                className="bg-transparent border-none outline-none text-sm pl-3 w-40 placeholder:text-slate-deep/30"
                            />
                        </div>

                        <Link href="/auth/login" className="text-slate-deep/60 hover:text-electric-blue transition-colors">
                            <User size={22} strokeWidth={2} />
                        </Link>

                        <Link href="/cart" className="relative text-slate-deep/60 hover:text-electric-blue transition-colors">
                            <ShoppingBag size={22} strokeWidth={2} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-electric-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-ivory">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-graphite"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-graphite/10 p-8 flex flex-col gap-6 md:hidden shadow-elevated"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-bold tracking-tight text-graphite border-b border-graphite/10 pb-4 last:border-none hover:text-electric-blue transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pt-4">
                            <Link href="/catalog" className="osart-button flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                                Ver Catálogo
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
