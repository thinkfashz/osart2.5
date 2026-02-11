"use client";

import { useEffect, useState } from "react";
import {
    Cpu,
    Link as LinkIcon,
    Shield,
    Zap,
    Activity,
    Terminal,
    ChevronRight,
    ArrowUpRight,
    Search,
    RefreshCw,
    Network,
    Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

// Mock API Endpoints Data
const MOCK_ENDPOINTS = [
    { method: "GET", path: "/profiles", status: "Active", latency: "24ms", auth: "REQUIRED", lastHit: "2m ago" },
    { method: "GET", path: "/products", status: "Active", latency: "115ms", auth: "PUBLIC", lastHit: "5s ago" },
    { method: "POST", path: "/orders", status: "Active", latency: "340ms", auth: "REQUIRED", lastHit: "15m ago" },
    { method: "GET", path: "/admin/stats", status: "Active", latency: "85ms", auth: "ADMIN", lastHit: "1m ago" },
    { method: "GET", path: "/profiles/me", status: "Active", latency: "12ms", auth: "REQUIRED", lastHit: "10m ago" },
    { method: "PUT", path: "/products/:id", status: "Pending", latency: "---", auth: "ADMIN", lastHit: "Yesterday" },
    { method: "DELETE", path: "/orders/:id", status: "Disabled", latency: "---", auth: "ADMIN", lastHit: "3 days ago" },
    { method: "GET", path: "/health", status: "Active", latency: "5ms", auth: "PUBLIC", lastHit: "Just now" },
];

export default function ApiConfigPage() {
    const [endpoints, setEndpoints] = useState(MOCK_ENDPOINTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const itemsPerPage = 4;

    const filteredEndpoints = endpoints.filter(e =>
        e.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.method.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEndpoints.length / itemsPerPage);
    const paginatedEndpoints = filteredEndpoints.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const refreshData = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-cyan-400">
                        <Network size={18} />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black italic">Proto_Sync // API_Core_Interface</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">API <br /> <span className="text-white/10 text-8xl">Protocols.</span></h1>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={refreshData}
                        className="h-14 px-8 bg-zinc-900 border border-zinc-800 text-zinc-100 hover:border-cyan-400 transition-all flex items-center gap-3 active:scale-95 group"
                    >
                        <RefreshCw size={18} className={cn("text-cyan-400", isRefreshing && "animate-spin")} />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Sync_Services</span>
                    </button>
                    <div className="h-14 bg-zinc-900 border border-zinc-800 flex items-center px-6 gap-4 focus-within:border-cyan-400/50 transition-all shadow-inner">
                        <Search size={16} className="text-zinc-600" />
                        <input
                            type="text"
                            placeholder="FILTER_ENDPOINTS..."
                            className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest uppercase italic text-white placeholder:text-zinc-700 w-48"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* API Status Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "Active_Connections", value: "14", icon: Activity, color: "text-cyan-400" },
                    { label: "Avg_Latency_System", value: "86ms", icon: Zap, color: "text-orange-500" },
                    { label: "Uptime_Relay", value: "99.98%", icon: Shield, color: "text-green-500" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group shadow-paradox">
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn("p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:scale-110 transition-transform", stat.color)}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black text-white/10 italic">#{100 + i}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">{stat.label}</span>
                            <div className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Endpoints Table Area */}
            <div className="glass-card rounded-[4rem] border border-white/5 bg-white/[0.01] overflow-hidden shadow-paradox">
                <div className="p-10 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-400/10 flex items-center justify-center text-cyan-400 rounded-2xl border border-cyan-400/20">
                            <Code size={20} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black uppercase italic text-white leading-none">Endpoint_Registry</h4>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1 italic leading-none">Mapping active network paths</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1 italic">Cluster_Identity</div>
                        <div className="text-xs font-black text-cyan-400/80 italic">ARKON_CORE_V4_ALPHA</div>
                    </div>
                </div>

                <div className="p-4 sm:p-10 overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead>
                            <tr className="text-white/20">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic">Method</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic">Network_Path</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic">Latency</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] italic text-right">Last_HIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedEndpoints.map((ep, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group/row cursor-pointer"
                                >
                                    <td className="px-6 py-8 rounded-l-3xl">
                                        <span className={cn(
                                            "px-4 py-1.5 text-[10px] font-black italic rounded-sm tracking-widest",
                                            ep.method === "GET" ? "bg-cyan-400 text-zinc-950 shadow-cyan-glow" :
                                                ep.method === "POST" ? "bg-green-500 text-zinc-950 shadow-green-glow" :
                                                    ep.method === "PUT" ? "bg-gold text-zinc-950 shadow-gold-glow" :
                                                        "bg-cyber-red text-zinc-950 shadow-cyber-red-glow"
                                        )}>
                                            {ep.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-black text-white italic tracking-tighter group-hover/row:text-cyan-400 transition-colors uppercase">{ep.path}</span>
                                            <ArrowUpRight size={14} className="text-white/10 group-hover/row:text-cyan-400" />
                                        </div>
                                        <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-1 italic">Auth: {ep.auth}</div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                ep.status === "Active" ? "bg-green-500 animate-pulse" :
                                                    ep.status === "Pending" ? "bg-gold" : "bg-zinc-700"
                                            )} />
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-widest italic",
                                                ep.status === "Active" ? "text-green-500" :
                                                    ep.status === "Pending" ? "text-gold" : "text-zinc-600"
                                            )}>{ep.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-8">
                                        <span className="text-lg font-black text-white/50 italic leading-none">{ep.latency}</span>
                                    </td>
                                    <td className="px-6 py-8 text-right rounded-r-3xl">
                                        <span className="text-[10px] font-black text-white/20 italic uppercase tracking-widest">{ep.lastHit}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="p-10 border-t border-white/5 bg-white/[0.01]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {/* Bottom Documentation Tip */}
            <div className="p-12 border border-cyan-400/20 bg-cyan-400/5 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10 group shadow-lg">
                <div className="flex items-center gap-8">
                    <div className="w-20 h-20 bg-cyan-400/10 flex items-center justify-center text-cyan-400 rounded-3xl group-hover:rotate-12 transition-transform">
                        <Terminal size={32} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-3xl font-black uppercase italic leading-none text-white tracking-tighter">Acceso de Desarrollador</h4>
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] italic leading-relaxed max-w-lg">
                            Utilice el encabezado x-arkon-auth para inyectar comandos de nivel superior. Los registros se auditan mediante el sistema OSART Core.
                        </p>
                    </div>
                </div>
                <button className="h-16 px-10 bg-white text-zinc-950 font-black uppercase tracking-widest text-xs italic hover:scale-105 active:scale-95 transition-all shadow-luxury-glow">
                    VER_DOCUMENTACIÓN
                </button>
            </div>
        </div>
    );
}
