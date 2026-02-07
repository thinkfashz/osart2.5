"use client";

import { motion } from "framer-motion";
import { Headphones, Send, Terminal, ShieldCheck, Cpu, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => setStatus("sent"), 2000);
    };

    return (
        <div className="bg-transparent text-white min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Info & Status */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Headphones size={20} className="text-gold" />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Protocolo de Asistencia</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                                Centro de <br />Soporte
                            </h1>
                        </div>

                        <div className="space-y-8">
                            <p className="text-xl text-white/60 leading-relaxed font-medium max-w-md">
                                Conexión directa con nuestros ingenieros de hardware para resolución de incidencias técnicas y optimización de arquitectura.
                            </p>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Ingenieros Disponibles</span>
                                    </div>
                                    <div className="text-sm font-bold text-white/40">Tiempo estimado de respuesta: <span className="text-white">&lt; 15 min</span></div>
                                </div>

                                <div className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-gold/5 border border-gold/10">
                                    <ShieldCheck className="text-gold" size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gold/80 leading-tight">Canal Seguro Cifrado AES-256 Activo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dispatch Terminal (Form) */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-black border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                        >
                            {/* Terminal Header */}
                            <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-white/40" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Despacho_de_Ticket</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-white/30">Identificación de Usuario</label>
                                        <input
                                            type="text"
                                            placeholder="USER_NAME_VAL"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-sm font-bold focus:border-gold focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-white/30">Tipo de Módulo / Hardware</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-sm font-bold focus:border-gold focus:outline-none transition-colors appearance-none"
                                            required
                                        >
                                            <option value="">SELECCIONAR_MÓDULO</option>
                                            <option value="micro">Microcontroladores</option>
                                            <option value="sensor">Sensores de Precisión</option>
                                            <option value="power">Gestión de Energía</option>
                                            <option value="other">Otro / Consultoría General</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] uppercase tracking-widest font-black text-white/30">Descripción de la Incidencia</label>
                                        <textarea
                                            placeholder="Detalla el comportamiento técnico o la consulta..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-bold h-32 focus:border-gold focus:outline-none transition-colors resize-none"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status !== "idle"}
                                    className="w-full h-16 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] luxury-transition disabled:opacity-50"
                                >
                                    {status === "idle" && <><Send size={18} /> DESPACHAR TICKET</>}
                                    {status === "sending" && <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />}
                                    {status === "sent" && <>PROTOCOLO ENVIADO_</>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
