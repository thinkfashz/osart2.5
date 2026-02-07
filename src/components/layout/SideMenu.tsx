"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Home, Cpu, Brain, Shield, ShoppingBag, Heart, Headphones, LogOut, Zap, Terminal, Box, ChevronRight, Fingerprint, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
    const [user, setUser] = useState<SupabaseUser | null>(null);

    useEffect(() => {
        if (!supabase) return;
        supabase.auth.getUser().then(({ data }: any) => {
            const { user } = data;
            setUser(user);
        });
    }, []);

    const menuGroups = [
        {
            label: "Nucleo_Sistemas",
            items: [
                { icon: Home, label: "Terminal Principal", href: "/" },
                { icon: Box, label: "Inventario_Estandar", href: "/catalog" },
                { icon: Activity, label: "Estado Global", href: "/admin" },
            ]
        },
        {
            label: "Categorias_Elite",
            items: [
                { icon: Cpu, label: "Unidades Procesamiento", href: "/catalog?cat=Processors" },
                { icon: Brain, label: "Neural Kernels", href: "/catalog?cat=Neural" },
                { icon: Shield, label: "Seguridad Hardware", href: "/catalog?cat=Security" },
            ]
        },
        {
            label: "Protocolos_Usuario",
            items: [
                { icon: ShoppingBag, label: "Registro Ordenes", href: "/orders" },
                { icon: Heart, label: "Lista Despliegue", href: "/wishlist" },
                { icon: Headphones, label: "Enlace Soporte", href: "/support" },
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[60]"
                    />
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 h-screen w-full max-w-md bg-white border-r border-slate-900/5 z-[70] overflow-y-auto p-12 flex flex-col bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.05)_0%,transparent_50%)]"
                    >
                        {/* Header Control */}
                        <div className="flex items-center justify-between mb-20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                                    <Zap size={20} fill="currentcolor" />
                                </div>
                                <span className="text-xl font-black italic tracking-tighter uppercase text-charcoal">OSORT_NAV</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-xl border border-slate-900/10 flex items-center justify-center text-slate-900/50 hover:text-celeste hover:border-celeste/30 hover:shadow-retro-backlit transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Operator Card */}
                        {user && (
                            <div className="mb-16 p-8 rounded-[2.5rem] bg-slate-900/5 border border-slate-900/5 relative overflow-hidden group hover:border-celeste/20 transition-all">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-celeste/5 blur-3xl rounded-full" />
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900/5 to-transparent flex items-center justify-center border border-slate-900/10 group-hover:border-celeste/50 transition-colors">
                                        <Fingerprint size={28} className="text-slate-900/40 group-hover:text-celeste transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-celeste tracking-[0.4em] mb-1 italic">Nucleo_Root</span>
                                        <span className="text-sm font-black uppercase italic tracking-tighter text-slate-900 truncate max-w-[180px]">{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Groups */}
                        <nav className="flex-1 space-y-16">
                            {menuGroups.map((group) => (
                                <div key={group.label} className="space-y-8">
                                    <div className="flex items-center gap-3 opacity-60">
                                        <div className="w-4 h-[1px] bg-slate-900" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-900">{group.label}</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {group.items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={onClose}
                                                className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-900/[0.01] border border-slate-900/0 hover:bg-slate-900/[0.03] hover:border-slate-900/5 hover:shadow-retro-backlit transition-all duration-500"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-900/5 flex items-center justify-center text-slate-900/40 group-hover:text-celeste group-hover:bg-celeste/10 transition-all">
                                                        <item.icon size={18} />
                                                    </div>
                                                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-900/60 group-hover:text-slate-900 transition-colors">{item.label}</span>
                                                </div>
                                                <ChevronRight size={14} className="text-slate-900/0 group-hover:text-celeste transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        {/* Footer Control */}
                        <div className="mt-20 pt-8 border-t border-slate-900/5">
                            <button
                                onClick={() => supabase?.auth.signOut()}
                                className="w-full flex items-center justify-between p-8 rounded-[2rem] bg-cyber-red/5 hover:bg-cyber-red/10 border border-cyber-red/10 group transition-all"
                            >
                                <div className="flex items-center gap-6">
                                    <LogOut size={20} className="text-cyber-red group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-black uppercase tracking-widest text-cyber-red italic">Desconectar_Terminal</span>
                                </div>
                                <Terminal size={16} className="text-cyber-red/20" />
                            </button>
                            <p className="text-[7px] font-black text-slate-900/20 uppercase tracking-[0.8em] text-center mt-10 italic">PROTOCOLO_NAV // AES-256_V4</p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
