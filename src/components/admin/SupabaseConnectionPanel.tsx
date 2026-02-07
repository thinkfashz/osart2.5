"use client";

import { useEffect, useState } from "react";
import { Database, Wifi, Activity, Lock, Server, CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConnectionStatus {
    status: "connected" | "connected_with_error" | "disconnected" | "config_error" | "loading";
    latency?: number;
    message?: string;
    url?: string;
}

export default function SupabaseConnectionPanel() {
    const [connection, setConnection] = useState<ConnectionStatus>({ status: "loading" });
    const [lastCheck, setLastCheck] = useState<Date | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const checkConnection = async () => {
        try {
            const res = await fetch("/api/health/supabase");
            const data = await res.json();
            setConnection({
                status: data.status,
                latency: data.latency,
                message: data.message || data.error,
                url: data.url
            });
            setLastCheck(new Date());
        } catch (error) {
            setConnection({ status: "disconnected", message: "Network Error" });
        }
    };

    useEffect(() => {
        setIsMounted(true);
        checkConnection();
        const interval = setInterval(checkConnection, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = () => {
        switch (connection.status) {
            case "connected": return "text-green-500";
            case "connected_with_error": return "text-yellow-500";
            case "loading": return "text-blue-500";
            default: return "text-red-500";
        }
    };

    const getStatusBg = () => {
        switch (connection.status) {
            case "connected": return "bg-green-500";
            case "connected_with_error": return "bg-yellow-500";
            case "loading": return "bg-blue-500";
            default: return "bg-red-500";
        }
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 p-8 relative overflow-hidden group shadow-industrial">
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Database className="text-zinc-100" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase italic tracking-tighter text-zinc-100">INFRA_NUCLEO</h2>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] font-black">ENLACE_SUPABASE_v2.4</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={cn(
                        "px-4 py-2 border border-zinc-800 bg-zinc-900 flex items-center gap-3 transition-colors",
                        getStatusColor()
                    )}>
                        <div className={cn("w-2 h-2", getStatusBg(), "animate-pulse")} />
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono">
                            {connection.status === "loading" ? "SCANNING..." :
                                connection.status === "connected" ? "STATUS_ONLINE" :
                                    "CONN_FAILURE"}
                        </span>
                    </div>
                </div>

                {/* Connection Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-zinc-800 border border-zinc-800 mb-10">
                    {/* URL Block */}
                    <div className="bg-zinc-950 p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock size={14} className="text-zinc-500" />
                            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest font-mono">ENLACE_HOST</span>
                        </div>
                        <div className="font-mono text-[10px] text-zinc-400 truncate">
                            {connection.url ? connection.url.replace(/https:\/\/(.*?)\.supabase\.co/, "POINTS://$1") : "DETECTING..."}
                        </div>
                    </div>

                    {/* Latency Block */}
                    <div className="bg-zinc-950 p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <Wifi size={14} className="text-zinc-500" />
                            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest font-mono">LATENCIA_MS</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-mono font-black italic text-cyan-400 tabular-nums leading-none">
                                {connection.latency || "00.00"}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-zinc-700 mb-1">MS</span>
                        </div>
                    </div>

                    {/* Uplink Status */}
                    <div className="bg-zinc-950 p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <Server size={14} className="text-zinc-500" />
                            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest font-mono">PROTOCOLO</span>
                        </div>
                        <div className="font-mono text-[10px] text-cyan-400 font-black italic uppercase">
                            TLS_1.3 / WSS_TUNNEL
                        </div>
                    </div>
                </div>

                {/* Technical Architecture Explaination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 mt-10 border-t border-zinc-900">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-cyan-400">
                            <Activity size={14} />
                            <h3 className="text-[10px] uppercase font-black tracking-widest font-mono">LÓGICA_SINCRONÍA</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-cyan-400 font-mono font-black text-[10px]">01</span>
                                <p className="text-[10px] leading-relaxed text-zinc-500 font-mono uppercase italic font-bold">
                                    HEARTBEAT_POLLING: 5000MS INTERVAL VIA SECURE_HEALTH_API
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-cyan-400 font-mono font-black text-[10px]">02</span>
                                <p className="text-[10px] leading-relaxed text-zinc-500 font-mono uppercase italic font-bold">
                                    AUTH_LAYER: RLS_FILTERING_ACTIVE ON MASTER_TABLE
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-orange-500">
                            <ShieldAlert size={14} />
                            <h3 className="text-[10px] uppercase font-black tracking-widest font-mono">INFRA_VECTORES</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-orange-500 font-mono font-black text-[10px]">03</span>
                                <p className="text-[10px] leading-relaxed text-zinc-500 font-mono uppercase italic font-bold">
                                    MIRRORING: TLS_CERT_VALIDATED AT GLOBAL_EDGE_NETWORK
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-orange-500 font-mono font-black text-[10px]">04</span>
                                <p className="text-[10px] leading-relaxed text-zinc-500 font-mono uppercase italic font-bold">
                                    HEALTH_METRICS: SYNTHETIC_PING VALIDATION ON CLUSTER_A
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Graph Visualization */}
                <div className="mt-12 h-12 flex items-end gap-[1px] opacity-30">
                    {isMounted && Array.from({ length: 120 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-cyan-400 transition-all duration-300"
                            style={{
                                height: connection.status === "connected" ? `${Math.random() * 80 + 20}%` : "10%",
                                opacity: connection.status === "connected" ? Math.random() * 0.5 + 0.5 : 0.2
                            }}
                        />
                    ))}
                </div>

                <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[9px] font-mono font-black text-zinc-700 uppercase tracking-widest italic">
                    <div className="flex items-center gap-2">
                        <Clock size={12} />
                        LAST_HEARTBEAT: {lastCheck ? lastCheck.toLocaleTimeString() : "PENDING..."}
                    </div>
                    <span>REGION_DATA: STABLE_NUCLEO_A</span>
                </div>

                {connection.message && (
                    <div className="mt-6 p-4 bg-cyber-red/10 border border-cyber-red/20 text-cyber-red text-[10px] font-mono font-black italic uppercase leading-relaxed">
                        {">"} FATAL_EXCEPTION_LOG: {connection.message}
                    </div>
                )}
            </div>
        </div>
    );
}
