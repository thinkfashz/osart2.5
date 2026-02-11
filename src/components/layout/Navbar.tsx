"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Search,
    ShoppingBag,
    User,
    Menu,
    X,
    Cpu
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { sanitizeString } from "@/lib/security";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

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
            initial={{ y: -100 }}
            animate={{
                y: isVisible ? 0 : -100,
                backgroundColor: isScrolled ? "rgba(9, 9, 11, 0.8)" : "transparent"
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-700",
                isScrolled ? "backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "py-8"
            )}
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex items-center justify-between">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-5 group relative">
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-14 h-14 bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center relative shadow-luxury-glow group-hover:shadow-gold-glow-large transition-all"
                        >
                            <Cpu size={28} className="text-zinc-950" strokeWidth={2} />
                            <div className="absolute inset-0 border border-white/20 scale-110 group-hover:scale-125 transition-transform duration-500" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-black tracking-tighter leading-none text-white group-hover:text-gold transition-colors duration-500">OSART</span>
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500 italic">Core_Intelligence</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-14">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-[11px] font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden group/link italic",
                                    pathname === link.href ? "text-gold" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                <span className="relative z-10">{link.name}</span>
                                <motion.span
                                    className={cn(
                                        "absolute bottom-0 left-0 w-full h-[1px] bg-gold",
                                        pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                                    )}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500 rounded-sm -inset-x-2" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-8">
                        <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/5 rounded-none px-5 py-2.5 focus-within:border-gold/50 transition-all group/search shadow-inner backdrop-blur-md">
                            <Search size={14} className="text-zinc-500 group-focus-within/search:text-gold transition-colors" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(sanitizeString(e.target.value))}
                                onKeyDown={handleSearch}
                                placeholder="INTEL_LOOKUP..."
                                className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest pl-4 w-56 placeholder:text-zinc-700 uppercase italic text-white"
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/profile" className="text-zinc-500 hover:text-gold transition-all hover:scale-110 active:scale-90 relative group">
                                <User size={22} strokeWidth={2} />
                                <div className="absolute -inset-2 bg-gold/0 group-hover:bg-gold/5 rounded-full transition-colors" />
                            </Link>

                            <button
                                onClick={() => toggleCart()}
                                className="relative text-zinc-500 hover:text-gold transition-all hover:scale-110 active:scale-90 group"
                            >
                                <ShoppingBag size={22} strokeWidth={2} />
                                <div className="absolute -inset-2 bg-gold/0 group-hover:bg-gold/5 rounded-full transition-colors" />
                                <AnimatePresence>
                                    {cartItemsCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0, y: 10 }}
                                            animate={{ scale: 1, y: 0 }}
                                            exit={{ scale: 0, y: 10 }}
                                            className="absolute -top-3 -right-3 w-6 h-6 bg-gold text-zinc-950 text-[11px] font-black rounded-none flex items-center justify-center border-2 border-charcoal shadow-gold-glow"
                                        >
                                            {cartItemsCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Mobile Toggle */}
                            <button
                                className="lg:hidden text-zinc-100 p-2 hover:bg-zinc-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </motion.div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                        className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-8 flex flex-col gap-8 lg:hidden shadow-3xl overflow-hidden"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-black tracking-tighter text-zinc-100 hover:text-cyan-400 transition-colors flex items-center justify-between group"
                                >
                                    {link.name}
                                    <Cpu className="text-zinc-800 group-hover:text-cyan-400 transition-colors" size={20} />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawer />
        </motion.nav>
    );
}
