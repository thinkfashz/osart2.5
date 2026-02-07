"use client";

import { useState, useRef } from "react";
import { X, Upload, FileArchive, Loader2, CheckCircle2, ChevronRight, Puzzle, Cpu, Zap, Activity, ShieldCheck, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PluginUploadProps {
    onClose: () => void;
    onComplete: (plugin: any) => void;
}

export default function PluginUpload({ onClose, onComplete }: PluginUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'extracting' | 'implementing' | 'success'>('idle');
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startInstallation = () => {
        if (!file) return;

        setStatus('uploading');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setStatus('extracting');
                setTimeout(() => {
                    setStatus('implementing');
                    setTimeout(() => {
                        setStatus('success');
                        setTimeout(() => {
                            onComplete({
                                id: Math.random().toString(36).substr(2, 9),
                                name: file.name.replace('.zip', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                                version: "1.0.0",
                                author: "PARADOX_EXTERNAL_DEV",
                                description: "Módulo inyectado correctamente mediante el protocolo de despliegue Paradox v2.0.",
                                active: true,
                                status: 'stable'
                            });
                        }, 1500);
                    }, 2000);
                }, 1500);
            }
            setProgress(Math.min(p, 100));
        }, 300);
    };

    return (
        <div className="relative w-full max-w-2xl glass-card rounded-[4rem] border border-white/10 overflow-hidden shadow-paradox bg-obsidian/90 backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />

            <button
                onClick={onClose}
                className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:bg-white hover:text-black hover:border-white liquid-hover z-50 transition-all"
            >
                <X size={20} strokeWidth={2.5} />
            </button>

            <div className="p-16 space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gold">
                        <Cpu size={20} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] italic">Módulo_Kernel // Inyección_Directa</span>
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                        Deploy <br /> <span className="text-white/20 text-6xl uppercase">OSORT_Module.</span>
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'idle' ? (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative border-2 border-dashed border-white/5 rounded-[3.5rem] p-20 flex flex-col items-center justify-center gap-8 cursor-pointer hover:border-gold/30 hover:bg-white/[0.01] liquid-hover transition-all"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".zip"
                                className="hidden"
                            />

                            <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:text-black group-hover:scale-110 liquid-hover transition-all duration-700 shadow-inner">
                                <Upload size={36} strokeWidth={1.5} className="text-white transition-colors duration-700" />
                            </div>

                            <div className="text-center space-y-3">
                                <p className="text-xl font-black uppercase tracking-tighter italic text-white group-hover:text-gold transition-colors">
                                    {file ? file.name : "CARGAR_PAQUETE_ZIP"}
                                </p>
                                <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em] leading-relaxed italic">
                                    Formatos permitidos: .zip <br />
                                    Capacidad Máxima: 500MB
                                </p>
                            </div>

                            {file && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={(e) => { e.stopPropagation(); startInstallation(); }}
                                    className="mt-6 px-10 h-14 bg-charcoal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black shadow-premium transition-all"
                                >
                                    <span className="font-black uppercase text-[12px] tracking-[0.4em] italic leading-none">EJECUTAR_DESPLIEGUE</span>
                                    <ChevronRight size={20} strokeWidth={3} />
                                </motion.button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="process"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-16 py-10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-700 shadow-luxury-glow",
                                            status === 'success' ? "bg-green-500 scale-110" : "bg-white/[0.03] border border-white/10"
                                        )}>
                                            {status === 'success' ? (
                                                <CheckCircle2 size={32} strokeWidth={3} className="text-black" />
                                            ) : (
                                                <Loader2 size={32} strokeWidth={2.5} className="text-gold animate-spin" />
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-2xl font-black uppercase tracking-tighter italic text-white leading-none">
                                                {status === 'uploading' && "Sincronizando_Bitstream..."}
                                                {status === 'extracting' && "Extrayendo_Manifest..."}
                                                {status === 'implementing' && "Inyectando_Binarios..."}
                                                {status === 'success' && "Módulo_Instalado_OK"}
                                            </p>
                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] italic">
                                                {status === 'uploading' && "Cargando metadatos en el servidor central"}
                                                {status === 'extracting' && "Verificando sumas de comprobación SHA-256"}
                                                {status === 'implementing' && "Compilando dependencias en tiempo real"}
                                                {status === 'success' && "El núcleo OSORT se ha actualizado"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-6xl font-black text-white/5 italic tracking-tighter silver-shimmer">
                                    {Math.round(progress)}<span className="text-2xl">%</span>
                                </div>
                            </div>

                            {/* Luxury Progress bar */}
                            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className={cn(
                                        "absolute inset-y-0 left-0 transition-all duration-300 ease-out shadow-luxury-glow",
                                        status === 'success' ? "bg-green-500" : "bg-gold"
                                    )}
                                />
                                {status !== 'success' && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                )}
                            </div>

                            {/* Steps Visualization */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { id: 'uploading', label: 'BITSTREAM' },
                                    { id: 'extracting', label: 'SUM_CHECK' },
                                    { id: 'implementing', label: 'INYECCIÓN' }
                                ].map((step, idx) => {
                                    const isCompleted = ['extracting', 'implementing', 'success'].includes(status) && idx === 0 ||
                                        ['implementing', 'success'].includes(status) && idx === 1 ||
                                        status === 'success' && idx === 2;
                                    const isActive = status === step.id;

                                    return (
                                        <div key={step.id} className={cn(
                                            "p-6 rounded-3xl border transition-all duration-700 liquid-hover relative overflow-hidden",
                                            isActive ? "bg-white/10 border-gold shadow-gold-glow" :
                                                isCompleted ? "bg-green-500/5 border-green-500/30" : "bg-white/[0.02] border-white/5"
                                        )}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={cn(
                                                    "text-[8px] font-black uppercase tracking-[0.5em] italic",
                                                    isActive ? "text-gold" : isCompleted ? "text-green-500" : "text-white/10"
                                                )}>
                                                    Fase_0{idx + 1}
                                                </span>
                                                {isCompleted && <CheckCircle2 size={14} strokeWidth={2.5} className="text-green-500" />}
                                                {isActive && <Activity size={14} strokeWidth={2.5} className="text-gold animate-pulse" />}
                                            </div>
                                            <p className={cn(
                                                "text-[10px] font-black uppercase tracking-[0.4em] italic",
                                                isActive || isCompleted ? "text-white" : "text-white/10"
                                            )}>
                                                {step.label}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
