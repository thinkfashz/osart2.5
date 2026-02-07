"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert, Cpu, Search, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditReport {
    score: number;
    vulnerabilities: { severity: "LOW" | "MEDIUM" | "HIGH", description: string, mitigation: string }[];
    status_summary: string;
}

export default function SecurityAuditor() {
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<AuditReport | null>(null);

    const runAudit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ systemStatus: "ACTIVE", inventoryCount: 12 }),
            });
            const data = await response.json();
            setReport(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 p-8 space-y-8 relative overflow-hidden group shadow-industrial">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-zinc-900 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-100">AUDITOR_IA</h3>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-black text-zinc-500">ANÁLISIS_CRÍTICO_GEMINI_v1</p>
                    </div>
                </div>
                <button
                    onClick={runAudit}
                    disabled={isLoading}
                    className={cn(
                        "industrial-button py-2 text-[10px]",
                        isLoading && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {isLoading ? "ESCANEO_ACTIVO..." : "INICIAR_AUDITORÍA"}
                </button>
            </div>

            <AnimatePresence>
                {report ? (
                    <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900 border border-zinc-800 p-6">
                            <div className="flex flex-col items-center justify-center w-24 h-24 bg-zinc-950 border border-zinc-800 relative">
                                <div className="text-3xl font-mono font-black text-cyan-400">{report.score}</div>
                                <div className="text-[8px] font-mono uppercase font-black text-zinc-600">HEALTH_IDX</div>
                                <div className="absolute inset-0 border border-cyan-400/20 animate-pulse" />
                            </div>
                            <p className="text-xs font-mono font-bold leading-relaxed italic text-zinc-400 max-w-sm uppercase">
                                "{report.status_summary}"
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-mono uppercase tracking-widest font-black text-zinc-500">HALLAZGOS_DETECTOR ({report.vulnerabilities.length})</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-zinc-800 border border-zinc-800">
                                {report.vulnerabilities.map((v, i) => (
                                    <div key={i} className="p-4 bg-zinc-950 space-y-2 hover:bg-zinc-900 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <span className={cn(
                                                "text-[8px] font-mono font-black px-2 py-0.5",
                                                v.severity === "HIGH" ? "bg-cyber-red text-zinc-100" :
                                                    v.severity === "MEDIUM" ? "bg-orange-500 text-zinc-950" : "bg-cyan-400 text-zinc-950"
                                            )}>{v.severity}</span>
                                            <AlertTriangle size={12} className="text-zinc-800" />
                                        </div>
                                        <p className="text-[10px] font-mono font-black border-l-2 border-zinc-800 pl-3 leading-tight text-zinc-200">{v.description}</p>
                                        <div className="text-[9px] font-mono text-zinc-600 uppercase italic">MITIGACIÓN: {v.mitigation}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : !isLoading && (
                    <div className="flex flex-col items-center justify-center py-16 text-center opacity-20 space-y-4">
                        <div className="p-4 border border-dashed border-zinc-800">
                            <Cpu size={48} strokeWidth={1} className="text-zinc-100" />
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] font-black">STANDBY_STATUS // WAITING_COMMAND</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
