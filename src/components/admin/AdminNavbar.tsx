"use client";

import Link from "next/link";
import { Settings, User, Cpu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminNavbar() {
    return (
        <nav className="sticky top-0 z-50 w-full h-16 bg-zinc-950 border-b border-zinc-800 px-6 flex items-center justify-between shadow-industrial">
            {/* Brand Logo */}
            <Link href="/admin" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center rounded-sm transition-transform active:scale-95">
                    <span className="text-zinc-950 font-black text-xl italic tracking-tighter">O</span>
                </div>
                <div className="hidden sm:block">
                    <h1 className="text-lg font-bold tracking-tighter uppercase italic leading-none text-zinc-100">OSART_SYSTEM</h1>
                    <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-cyan-400 leading-none">PRECI_PROTO_v4</span>
                </div>
            </Link>

            {/* Critical Actions - Visible on mobile */}
            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    className="w-11 h-11 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-500 hover:border-orange-500/50 transition-colors"
                    title="Alertas de Sistema"
                >
                    <Bell size={18} />
                </button>

                <Link
                    href="/admin/pricing"
                    className="w-11 h-11 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                >
                    <Settings size={18} />
                </Link>

                <Link
                    href="/profile"
                    className="h-11 px-4 flex items-center gap-3 bg-zinc-100 text-zinc-950 hover:bg-cyan-400 transition-colors group"
                >
                    <User size={18} className="shrink-0" />
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-zinc-950">ID_ARKON</span>
                </Link>
            </div>
        </nav>
    );
}
