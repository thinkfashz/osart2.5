"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingBag,
    Users,
    BookOpen,
    TrendingUp,
    Settings,
    Database,
    Layout,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Package, label: "Productos", href: "/admin/vault" },
        { icon: Layers, label: "Categorías", href: "/admin/categories" },
        { icon: ShoppingBag, label: "Pedidos", href: "/admin/orders" },
        { icon: Users, label: "Clientes", href: "/admin/users" },
        { icon: BookOpen, label: "Blueprints", href: "/admin/recipes" },
        { icon: TrendingUp, label: "Promociones", href: "/admin/promotions" },
        { icon: Settings, label: "Precios", href: "/admin/pricing" },
        { icon: Database, label: "Database", href: "/admin/database" },
        { icon: Settings, label: "API Config", href: "/admin/api" },
        { icon: Layout, label: "Plugins", href: "/admin/plugins" },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-zinc-950">
            {/* Global Industrial Navbar */}
            <AdminNavbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar / Mobile Drawer (Solid Only) */}
                <aside className={cn(
                    "fixed inset-y-0 left-0 w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 transition-transform duration-200 lg:sticky lg:translate-x-0 pt-4",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}>
                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                        <div className="mb-6 px-4">
                            <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase italic">Control_Nucleo</span>
                        </div>
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 border-l-[3px] transition-all duration-300 group relative overflow-hidden",
                                    pathname === item.href
                                        ? "bg-cyan-400/5 border-cyan-400 text-white"
                                        : "bg-transparent border-transparent text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-200"
                                )}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon size={20} className={cn(
                                    "transition-all duration-500",
                                    pathname === item.href ? "text-cyan-400 scale-110" : "text-zinc-700 group-hover:text-zinc-400 group-hover:scale-110"
                                )} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic group-hover:tracking-[0.3em] transition-all">{item.label}</span>
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="active-sidebar-indicator"
                                        className="absolute right-0 w-1 h-8 bg-cyan-400 blur-[2px]"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-zinc-800 mt-auto">
                        <button className="flex items-center gap-3 px-4 py-3 w-full bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-cyber-red hover:border-cyber-red/50 transition-all font-black text-[10px] uppercase tracking-widest italic rounded-sm">
                            <LogOut size={16} />
                            DESCONECTAR_TERMINAL
                        </button>
                    </div>
                </aside>

                {/* Mobile Menu Toggle (Overlay Only) */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-cyan-400 text-zinc-950 rounded-full shadow-lg z-50 flex items-center justify-center active:scale-90 transition-transform"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Overlay for Mobile Sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 lg:hidden z-30"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Viewport */}
                <main className="flex-1 overflow-y-auto bg-zinc-950 p-6 md:p-12 lg:p-16">
                    <div className="max-w-[1600px] mx-auto space-y-12">
                        {/* Internal Header Fragment */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                                    <div className="w-4 h-[2px] bg-cyan-400" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black">ACCESO_ADMIN_SISTEM</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-zinc-100">
                                    ESTACIÓN_TRABAJO <span className="text-zinc-800">.LOG</span>
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-500 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    OPERATIVO_NIVEL_4
                                </div>
                            </div>
                        </div>

                        {/* Page Content */}
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
