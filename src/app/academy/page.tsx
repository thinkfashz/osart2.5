"use client";

import { Brain, Cpu, Zap, ArrowRight, Play, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AcademyPage() {
    const modules = [
        {
            icon: Cpu,
            title: "Fundamentos de Electrónica",
            description: "Aprende desde cero cómo funcionan los componentes básicos y las leyes de la electricidad.",
            level: "Principiante",
            lessons: 12,
            xp: 500
        },
        {
            icon: Brain,
            title: "Microcontroladores Pro",
            description: "Domina el ecosistema Arduino y ESP32 para crear proyectos de IoT de alto rendimiento.",
            level: "Intermedio",
            lessons: 18,
            xp: 1200
        },
        {
            icon: BookOpen,
            title: "Blueprints & Recetas",
            description: "Patrones de implementación para e-commerce industrial, ERP y automatización.",
            level: "Avanzado",
            lessons: 12,
            xp: 3000,
            href: "/academy/recipes"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -ml-64 -mb-64" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero section */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-accent">Academia Technics Osart</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-8"
                    >
                        Forjando la <br />
                        <span className="text-white/20">Élite Hardware.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base uppercase tracking-[0.2em] font-bold text-white/40 leading-relaxed max-w-xl"
                    >
                        Accede a protocolos de entrenamiento avanzado y domina la ingeniería de vanguardia.
                    </motion.p>
                </div>

                {/* Main Action - Quiz Access */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 mb-24 relative overflow-hidden group hover:border-accent luxury-transition"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 max-w-xl text-center md:text-left">
                            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(230,0,0,0.3)]">
                                <Trophy size={32} />
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tight italic">Protocolo de Validación</h2>
                            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Pon a prueba tus conocimientos técnicos y asciende en el ranking de ingenieros.</p>
                            <Link
                                href="/academy/quiz"
                                className="arobix-button bg-white text-black hover:bg-accent hover:text-white inline-flex h-14 px-12"
                            >
                                INICIAR EXAMEN <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/3 aspect-square relative opacity-20 group-hover:opacity-40 luxury-transition">
                            <Brain size="100%" strokeWidth={0.5} className="absolute inset-0" />
                        </div>
                    </div>
                </motion.div>

                {/* Modules Grid */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between border-b border-white/10 pb-8">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Módulos de Entrenamiento</h2>
                        <span className="text-[10px] uppercase tracking-widest font-black text-white/40">3 Módulos Disponibles</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {modules.map((module: any, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.4 }}
                                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col space-y-6 group hover:bg-white/10 luxury-transition relative"
                            >
                                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white/40 group-hover:text-accent group-hover:bg-accent/10 transition-all border border-white/5 group-hover:border-accent/20">
                                    <module.icon size={24} />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">{module.level}</div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight italic">{module.title}</h3>
                                    <p className="text-xs font-bold text-white/40 uppercase leading-relaxed tracking-tight">{module.description}</p>
                                </div>
                                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">Lecciones</span>
                                            <span className="text-sm font-black italic">{module.lessons}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">XP Total</span>
                                            <span className="text-sm font-black italic">{module.xp}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={module.href || "#"}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black luxury-transition"
                                    >
                                        <Play size={16} fill="currentColor" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
