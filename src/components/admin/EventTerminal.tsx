"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, ShieldCheck, Wifi, Activity, Database, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
    time: string;
    level: "INFO" | "WARN" | "ERROR" | "SECURITY";
    message: string;
    lat: string;
}

export default function EventTerminal() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    const generateLog = () => {
        const levels: LogEntry["level"][] = ["INFO", "INFO", "INFO", "WARN", "SECURITY"];
        const messages = [
            "Conexión entrante desde 192.168.1.1",
            "Sincronización de inventario exitosa",
            "Latencia de base de datos dentro de rango",
            "Escaneo de vulnerabilidades solicitado por admin",
            "Intento de acceso denegado en /admin/settings",
            "Petición GET en /api/products completada"
        ];

        const newLog: LogEntry = {
            time: new Date().toLocaleTimeString(),
            level: levels[Math.floor(Math.random() * levels.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            lat: (Math.random() * 50 + 10).toFixed(0) + "ms"
        };

        setLogs(prev => [...prev, newLog].slice(-20));
    };

    useEffect(() => {
        const interval = setInterval(generateLog, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-zinc-950 border border-zinc-800 p-6 space-y-6 flex flex-col h-[500px] overflow-hidden group shadow-industrial">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
                        <TerminalIcon size={18} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-100 italic">DATALINK_SYS_TELEMETRY</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                            <span className="text-[8px] font-mono font-bold text-cyan-400 uppercase tracking-widest">REALTIME_STREAMING</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase">AVG_LATENCY</span>
                        <span className="text-xs font-mono font-black text-cyan-400">24.08ms</span>
                    </div>
                </div>
            </div>

            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1.5 scrollbar-hide pr-2 overscroll-contain will-change-scroll"
            >
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 border-l-2 border-zinc-800 pl-4 py-0.5 hover:bg-zinc-900 transition-colors">
                        <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                        <span className={cn(
                            "font-black shrink-0 w-12",
                            log.level === "INFO" ? "text-cyan-400" :
                                log.level === "WARN" ? "text-orange-500" :
                                    log.level === "SECURITY" ? "text-cyber-red" : "text-cyber-red"
                        )}>{log.level}</span>
                        <span className="text-zinc-300 flex-1 font-bold">{log.message}</span>
                        <span className="text-zinc-600 font-black shrink-0">{log.lat}</span>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-between text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Database size={10} className="text-zinc-700" /> DB_CONNECT: OK
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                        <Server size={10} /> CLOUD_NUCLEO: ACTIVE
                    </div>
                </div>
                <span className="text-zinc-700 italic">V4_INDUSTRIAL_STABLE</span>
            </div>
        </div>
    );
}
