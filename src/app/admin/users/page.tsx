"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { dummyUsers } from "@/data/dummyUsers";
import {
    Users,
    Search,
    Shield,
    User,
    Zap,
    RefreshCw,
    MoreHorizontal,
    UserPlus,
    Trophy,
    BadgeCheck,
    Fingerprint,
    Command,
    ExternalLink,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { sanitizeString, safeAction } from "@/lib/security";
import Pagination from "@/components/ui/Pagination";

export default function AdminUsersPage() {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [generating, setGenerating] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        setLoading(true);
        const { data, error } = await safeAction(async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        }, "Error al sincronizar con el registro de operadores.");

        if (!error && data) {
            setProfiles(data);
        } else {
            setError(error);
        }
        setLoading(false);
    };

    const handleGenerateUsers = async () => {
        setGenerating(true);
        try {
            const res = await fetch("/api/admin/setup-users", { method: "POST" });
            const result = await res.json();
            alert(result.message || "Proceso de generación iniciado");
            fetchProfiles();
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servicio de generación.");
        } finally {
            setGenerating(false);
        }
    };

    const filteredUsers = profiles.filter(user =>
    (user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const displayUsers = filteredUsers.length > 0 ? filteredUsers : (loading ? [] : dummyUsers);

    const totalPages = Math.ceil(displayUsers.length / itemsPerPage);
    const paginatedUsers = displayUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Fingerprint size={18} className="text-gold" />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 italic">Registro_Civil // Operadores_Élite</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">Usuarios <br /> <span className="text-white/10 text-8xl">Database.</span></h1>
                </div>

                <div className="flex flex-wrap gap-6">
                    <button
                        onClick={handleGenerateUsers}
                        disabled={generating}
                        className="arobix-button bg-gold text-black hover:scale-105 shadow-gold-glow disabled:opacity-50"
                    >
                        {generating ? <RefreshCw className="animate-spin" /> : <UserPlus size={20} />}
                        <span className="font-black italic">INYECTAR_OPERADORES</span>
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                        <Users size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className="text-5xl font-black italic tracking-tighter">{profiles.length || "0"}</div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Operadores_Activos</div>
                    </div>
                </div>

                <div className="glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-blue-400 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all">
                        <Shield size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className="text-5xl font-black italic tracking-tighter text-blue-400">{profiles.filter(p => p.role === 'admin').length}</div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Nucleo_Admin</div>
                    </div>
                </div>

                <div className="glass-card p-10 rounded-[3rem] group liquid-hover flex items-center gap-8 border border-white/5 shadow-paradox">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gold group-hover:scale-110 liquid-hover transition-transform">
                        <Trophy size={28} />
                    </div>
                    <div className="space-y-1">
                        <div className="text-5xl font-black italic tracking-tighter text-gold gold-shimmer">{profiles.reduce((acc, curr) => Math.max(acc, curr.knowledge_points || 0), 0)}</div>
                        <div className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] italic">Máximo_KP</div>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex items-center justify-between px-6">
                <div className="relative w-full max-w-2xl group">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-gold transition-colors" size={22} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(sanitizeString(e.target.value))}
                        placeholder="IDENTIFICAR_NODO_OPERADOR..."
                        className="w-full bg-white/[0.02] border border-white/5 h-16 rounded-[2rem] pl-20 pr-8 text-[11px] font-black tracking-[0.4em] outline-none focus:bg-white/5 focus:border-gold/30 liquid-hover italic shadow-inner placeholder:text-white/5 uppercase"
                    />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <div className="w-12 h-px bg-white/5" />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 italic">Búsqueda_Forense_Activa</span>
                </div>
            </div>

            {/* Operators Grid */}
            <div className="space-y-12 pb-32">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {paginatedUsers.map((user: any, idx) => (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative glass-card p-10 rounded-[3.5rem] border border-white/5 hover:border-white/20 shadow-paradox liquid-hover overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-vibrant-gradient opacity-20" />

                                <div className="flex items-start gap-10 relative z-10">
                                    <div className="relative shrink-0">
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-vibrant-gradient p-0.5 group-hover:rotate-6 transition-transform duration-700 shadow-2xl">
                                            <div className="w-full h-full rounded-[2.4rem] bg-black flex items-center justify-center overflow-hidden">
                                                {user.image_url ? (
                                                    <img src={user.image_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                                                ) : (
                                                    <span className="text-4xl font-black uppercase tracking-tighter italic text-white/20 group-hover:text-white transition-colors">
                                                        {user.full_name?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {user.role === 'admin' && (
                                            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-blue-500 rounded-2xl border-8 border-obsidian flex items-center justify-center text-white shadow-lg">
                                                <BadgeCheck size={18} strokeWidth={2.5} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-2xl font-black tracking-tighter uppercase italic truncate text-white leading-tight">
                                                    {user.full_name || 'OPERADOR_ANÓNIMO'}
                                                </h3>
                                                <span className={cn(
                                                    "text-[8px] uppercase font-black px-3 py-1 rounded-lg border italic",
                                                    user.role === 'admin'
                                                        ? "bg-blue-400/10 text-blue-400 border-blue-400/20 shadow-[0_0_15px_rgba(96,165,250,0.2)]"
                                                        : "bg-white/5 text-white/40 border-white/10"
                                                )}>
                                                    {user.role?.toUpperCase() || 'USUARIO'}
                                                </span>
                                            </div>
                                            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 truncate italic">{user.email}</p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold">
                                                    <Zap size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black italic text-white">{user.knowledge_points || 0} KP</span>
                                                    <span className="text-[8px] uppercase font-black text-white/20 tracking-widest">Nivel_Cerebral</span>
                                                </div>
                                            </div>

                                            <div className="w-px h-8 bg-white/5" />

                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black italic text-white/60">
                                                    {new Date(user.created_at || Date.now()).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase()}
                                                </span>
                                                <span className="text-[8px] uppercase font-black text-white/20 tracking-widest">Sinc_Inicial</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-white hover:text-black hover:border-white liquid-hover shadow-sm">
                                            <ExternalLink size={20} strokeWidth={1.5} />
                                        </button>
                                        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-gold hover:text-black hover:border-gold liquid-hover shadow-sm">
                                            <MoreHorizontal size={20} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-10 border-t border-white/5"
                />
            </div>
        </div>
    );
}
