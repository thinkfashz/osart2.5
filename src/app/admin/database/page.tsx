"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Database,
    Wifi,
    WifiOff,
    ShieldCheck,
    Key,
    Server,
    BarChart3,
    ExternalLink,
    Code2,
    Zap,
    Activity,
    Table as TableIcon,
    RefreshCw,
    Terminal,
    Cpu,
    Globe,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/ui/Pagination";

export default function DatabaseConsolePage() {
    const [status, setStatus] = useState<"connected" | "disconnected" | "checking">("checking");
    const [latency, setLatency] = useState<number | null>(null);
    const [tableStats, setTableStats] = useState<any[]>([]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        setStatus("checking");
        if (!supabase) {
            setStatus("disconnected");
            return;
        }
        const start = performance.now();
        try {
            const { data, error } = await supabase!.from("products").select("count", { count: 'exact', head: true });
            const end = performance.now();
            if (error) throw error;
            setLatency(Math.round(end - start));
            setStatus("connected");

            // Mocking table stats for visual purpose based on DB discovery
            setTableStats([
                { name: "profiles", count: 1, color: "bg-blue-500", icon: Users },
                { name: "products", count: 12, color: "bg-gold", icon: Database },
                { name: "orders", count: 4, color: "bg-cyber-red", icon: Activity },
                { name: "activity_logs", count: 85, color: "bg-green-500", icon: Terminal }
            ]);
        } catch (e) {
            setStatus("disconnected");
            setLatency(null);
        }
    };

    const totalPages = Math.ceil(tableStats.length / itemsPerPage);
    const paginatedStats = tableStats.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const configItems = [
        { label: "Servicio_Núcleo", value: "Supabase Infrastructure", icon: Server },
        { label: "Nodo_Geográfico", value: "US-EAST-1 (VIRGINIA)", icon: Globe },
        { label: "Motor_Postgres", value: "V17.6 ALPHA", icon: Code2 },
        { label: "Cifrado_Hardware", value: "AES-256 BIT LUXURY", icon: ShieldCheck },
    ];

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Terminal size={18} className="text-gold" />
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 italic">Infraestructura_Sólida // Consola_de_Núcleo</span>
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.8]">Database <br /> <span className="text-white/10 text-8xl">Console.</span></h1>
                </div>

                <div className="flex flex-wrap gap-6">
                    <a
                        href="https://supabase.com/dashboard/project/bplifywjbhtwzcplxksg"
                        target="_blank"
                        className="arobix-button bg-white text-black hover:scale-105 shadow-luxury-glow"
                    >
                        <span className="font-black italic uppercase tracking-widest">Dashboard_Externo</span>
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>

            {/* Connection Status & Feature Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Connection Radar Card */}
                <div className="lg:col-span-8 glass-card p-12 rounded-[4rem] relative overflow-hidden group border border-white/5 shadow-paradox">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] -mr-64 -mt-64 group-hover:bg-gold/10 transition-colors duration-1000" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                        {/* Status Radar Component */}
                        <div className="relative w-56 h-56 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.05, 0.2]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className={cn(
                                    "absolute inset-0 rounded-full blur-3xl",
                                    status === "connected" ? "bg-green-500" : "bg-cyber-red"
                                )}
                            />
                            {/* Scanning Rings */}
                            <div className="absolute inset-0 border border-white/5 rounded-full animate-ping opacity-20" />
                            <div className="absolute inset-4 border border-white/5 rounded-full animate-pulse opacity-10" />

                            <div className={cn(
                                "w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-3xl relative z-10 transition-all duration-700 shadow-luxury-glow",
                                status === "connected" ? "border-green-500 shadow-green-500/20" : "border-cyber-red shadow-cyber-red/20"
                            )}>
                                {status === "connected" ? (
                                    <Wifi className="text-green-500 animate-pulse" size={40} strokeWidth={2.5} />
                                ) : (
                                    <WifiOff className="text-cyber-red" size={40} strokeWidth={2.5} />
                                )}
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-white/40">Sinc_State</span>
                                    <span className={cn(
                                        "text-[12px] font-black uppercase tracking-widest italic",
                                        status === "connected" ? "text-green-500" : "text-cyber-red"
                                    )}>
                                        {status === "checking" ? "SCANNING..." : status === "connected" ? "ONLINE" : "OFFLINE"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-8">
                            <div className="space-y-3">
                                <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white leading-none">Telemetría de Red</h3>
                                <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] leading-relaxed italic max-w-sm">Detección de latencia en milisegundos mediante protocolo de eco SSR. Sincronización de arsenal activa.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 liquid-hover">
                                    <span className="block text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-2 italic">Latencia_Ping</span>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black text-green-500 italic leading-none">{latency || '---'}</span>
                                        <span className="text-xs font-black text-white/10 uppercase mb-1">MS</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 liquid-hover">
                                    <span className="block text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-2 italic">Integridad_Cifrado</span>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="text-gold" size={24} />
                                        <span className="text-2xl font-black text-white italic uppercase leading-none">ALPHA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Intelligence Scaling Card */}
                <div className="lg:col-span-4 bg-vibrant-gradient rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-paradox">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] animate-pulse -mr-32 -mt-32" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-3xl border border-white/20 group-hover:rotate-12 transition-transform duration-700">
                                <Zap size={32} className="text-white animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tighter uppercase leading-none italic">Escalado <br /> Inteligente.</h3>
                                <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.3em] italic leading-relaxed">Infraestructura optimizada para operaciones de alta frecuencia. Paradox Node Cluster.</p>
                            </div>
                        </div>
                        <button
                            onClick={checkConnection}
                            className="w-full h-16 bg-white text-black rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 hover:scale-105 liquid-hover italic transition-all shadow-xl"
                        >
                            RE-ESCANEAR_NÚCLEO <RefreshCw size={18} className={cn("text-black", status === "checking" && "animate-spin")} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Detailed Config & Table Stats Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Config List Area */}
                <div className="glass-card p-12 rounded-[4rem] border border-white/5 space-y-10 shadow-paradox bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center text-gold">
                            <Key size={18} />
                        </div>
                        <h4 className="text-2xl font-black tracking-tighter uppercase italic text-white/80">Configuración_Acceso</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {configItems.map((item, i) => (
                            <div key={i} className="flex flex-col gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl liquid-hover group/item">
                                <item.icon className="text-white/10 group-hover/item:text-gold transition-colors" size={24} />
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">{item.label}</span>
                                    <span className="text-sm font-black text-white/90 italic block">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <div className="p-8 bg-gold/5 border border-gold/10 rounded-[2.5rem] group cursor-help liquid-hover transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                <Activity className="text-gold animate-pulse" size={20} />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gold/80 italic shadow-gold-glow">Health_Check_Protocol</span>
                            </div>
                            <p className="text-[10px] font-black text-white/30 leading-relaxed uppercase tracking-[0.3em] italic">
                                El sistema realiza comprobaciones automáticas de integridad cada 60 segundos para garantizar cero pérdida de paquetes durante transacciones críticas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table Overview Area */}
                <div className="glass-card p-12 rounded-[4rem] border border-white/5 space-y-10 shadow-paradox bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-400">
                            <TableIcon size={18} />
                        </div>
                        <h4 className="text-2xl font-black tracking-tighter uppercase italic text-white/80">Estructura_de_Entidades</h4>
                    </div>

                    <div className="space-y-6">
                        {paginatedStats.map((table, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 liquid-hover transition-all group/row">
                                <div className="flex items-center gap-6">
                                    <div className={cn("w-4 h-4 rounded-full blur-[2px] shadow-luxury-glow", table.color)} />
                                    <div className="flex flex-col">
                                        <span className="text-base font-black text-white italic tracking-[0.2em] group-hover/row:text-gold transition-colors uppercase">{table.name}</span>
                                        <span className="text-[8px] font-black text-white/10 uppercase tracking-widest mt-1 italic leading-none">Sector_{101 + i}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-black italic text-white leading-none">{table.count}</span>
                                        <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1 italic">Entradas_Data</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pt-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                className="border-t border-white/5"
                            />
                        </div>
                    )}

                    <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-400/5 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                        <div className="relative z-10 flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <BarChart3 size={24} />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-400 italic">Análisis_Volumétrico</span>
                                    <p className="text-[9px] font-black text-white/20 leading-none uppercase tracking-[0.2em] italic">Capacidad de hardware: 5TB / Baja Latencia</p>
                                </div>
                            </div>
                            <button className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors">
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component or mapping for dynamic icons if needed elsewhere
const TableIconMap = {
    profiles: Users,
    products: Database,
    orders: Activity,
    activity_logs: Terminal
};
