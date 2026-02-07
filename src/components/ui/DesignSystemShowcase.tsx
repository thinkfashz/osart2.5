"use client";

import { useState } from "react";
import { Zap, Shield, Cpu, Gauge, Layers, MoveRight, Star, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DesignSystemShowcase() {
    return (
        <div className="min-h-screen bg-obsidian text-slate-900 p-12 space-y-24">
            {/* Header */}
            <header className="space-y-4">
                <div className="flex items-center gap-4 text-gold mb-2">
                    <Hexagon size={24} className="animate-spin-slow" />
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-gold">OSORT Industrial // v2.0</span>
                </div>
                <h1 className="text-8xl font-black tracking-tighter uppercase italic leading-none">
                    Visual <span className="text-cyber-red underline decoration-slate-900/10 decoration-8 underline-offset-8">Identity</span>
                </h1>
                <p className="text-slate-900/40 max-w-2xl text-lg font-medium leading-relaxed italic">
                    "El diseño no es lo que ves, sino lo que haces sentir. Hemos construido un ecosistema que respira potencia, lujo y precisión técnica."
                </p>
            </header>

            {/* Color Palette */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="h-px flex-1 bg-slate-900/10" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900/40">Paleta de Poder</h2>
                    <div className="h-px flex-1 bg-slate-900/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { name: "Obsidian", hex: "#0A0A0A", desc: "El vacío del espacio profundo." },
                        { name: "Cyber Red", hex: "#E60000", desc: "La energía de la acción pura." },
                        { name: "Polished Gold", hex: "#D4AF37", desc: "El estandarte del lujo absoluto." },
                        { name: "Surface Glass", hex: "RGBA 255,255,255,0.05", desc: "La transparencia del futuro." },
                    ].map((color) => (
                        <div key={color.name} className="group space-y-4">
                            <div
                                className="h-48 rounded-[2rem] border border-white/10 luxury-transition group-hover:scale-105 shadow-2xl"
                                style={{ backgroundColor: color.hex.includes('RGBA') ? 'rgba(255,255,255,0.05)' : color.hex }}
                            />
                            <div>
                                <h3 className="font-black uppercase tracking-tight text-xl">{color.name}</h3>
                                <p className="text-[10px] text-slate-900/40 font-bold uppercase mb-2">{color.hex}</p>
                                <p className="text-xs text-slate-900/60 italic">{color.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Patterns */}
            <section className="space-y-16">
                <div className="flex items-center gap-6">
                    <div className="h-px flex-1 bg-slate-900/10" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900/40">Patrones Interactivos</h2>
                    <div className="h-px flex-1 bg-slate-900/10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Glass Morph Card */}
                    <div className="glass-morph p-12 rounded-[3.5rem] space-y-8 cyber-border group overflow-hidden relative">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 blur-[100px] group-hover:bg-gold/10 transition-colors" />

                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gold">
                                <Layers size={32} />
                            </div>
                            <div>
                                <h4 className="text-3xl font-black uppercase tracking-tighter italic">Ultra Glass Morph</h4>
                                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Componente Estándar OSORT</p>
                            </div>
                        </div>

                        <p className="text-slate-900/60 leading-relaxed italic">
                            Desenfoque de 20px, bordes de precisión de 1px y una base de negro obsidiana. Este es el contenedor universal de nuestra nueva era.
                        </p>

                        <button className="px-8 h-12 bg-charcoal text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gold hover:text-black shadow-premium transition-all">
                            Explorar Módulo <MoveRight size={16} />
                        </button>
                    </div>

                    {/* Stats/Data Card */}
                    <div className="bg-obsidian-light border border-white/5 p-12 rounded-[3.5rem] space-y-10 relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <h4 className="text-4xl font-black italic tracking-tighter">PERFORMANCE <span className="text-cyber-red underline decoration-slate-900/10">DATA</span></h4>
                                <p className="text-[10px] text-slate-900/20 font-black uppercase tracking-[0.5em]">Real-time Telemetry</p>
                            </div>
                            <Cpu size={40} className="text-slate-900/10 group-hover:text-cyber-red transition-colors duration-700" />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: "Engine Torque", val: "850 Nm", icon: Gauge, color: "text-white" },
                                { label: "Response", val: "0.02 ms", icon: Zap, color: "text-cyber-red" },
                            ].map((stat) => (
                                <div key={stat.label} className="p-6 bg-slate-900/5 rounded-3xl border border-slate-900/5">
                                    <stat.icon size={20} className={cn("mb-4", stat.color)} />
                                    <p className="text-[10px] font-black uppercase text-slate-900/30 tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black tracking-tighter">{stat.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Typography */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="h-px flex-1 bg-slate-900/10" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-900/40">Tipografía de Asalto</h2>
                    <div className="h-px flex-1 bg-slate-900/10" />
                </div>

                <div className="space-y-16">
                    <div className="hover:translate-x-4 transition-transform duration-700">
                        <p className="text-[10px] text-gold font-black uppercase tracking-[1em] mb-4">Display Heading / Black Italic</p>
                        <h2 className="text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
                            POWER. DESIGN. <br />
                            <span className="text-slate-900/10">PRECISION.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Text Effect // Gold Shimmer</p>
                            <h3 className="text-5xl font-black uppercase italic tracking-tighter gold-shimmer">
                                Estándar de Oro Paradox
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Text Effect // Cyber Glow</p>
                            <h3 className="text-5xl font-black uppercase italic tracking-tighter text-cyber-red cyber-glow">
                                Alerta de Sistema
                            </h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
