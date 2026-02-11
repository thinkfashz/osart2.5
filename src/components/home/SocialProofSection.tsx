"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Ing. Carlos Méndez",
        role: "Director Técnico, TechCorp Industries",
        content: "La precisión de estos componentes superó nuestras expectativas. Cero fallas en 18 meses de operación continua.",
        rating: 5,
    },
    {
        name: "Dra. Ana Rodríguez",
        role: "Jefa de Mantenimiento, ElectroSystems",
        content: "Compatibilidad perfecta con nuestros sistemas legacy. La inversión se justificó en el primer trimestre.",
        rating: 5,
    },
    {
        name: "Ing. Roberto Silva",
        role: "Gerente de Operaciones, IndustrialTech",
        content: "Calidad profesional real. No son repuestos genéricos. Son componentes de ingeniería seria.",
        rating: 5,
    },
];

const certifications = [
    { name: "ISO 9001", description: "Gestión de Calidad" },
    { name: "CE", description: "Conformidad Europea" },
    { name: "RoHS", description: "Sin Sustancias Peligrosas" },
    { name: "UL", description: "Seguridad Certificada" },
];

export default function SocialProofSection() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Technical Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800"
                    >
                        <Star size={12} className="text-cyan-400 fill-cyan-400/20" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">
                            VALIDATED_BY_ENGINEERS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 uppercase"
                    >
                        Probado en el
                        <br />
                        <span className="text-zinc-800">Campo de Batalla.</span>
                    </motion.h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-24">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-zinc-900 p-8 border border-zinc-800 relative group"
                        >
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/50">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                    <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                                </div>
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">LOG_ID: #00{index + 1}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <div key={i} className="w-1 h-3 bg-cyan-400/40" />
                                ))}
                                <span className="ml-2 text-[10px] font-black text-zinc-500 tracking-widest leading-none mt-0.5">5.0_STABLE</span>
                            </div>

                            {/* Content */}
                            <p className="text-[12px] text-zinc-300 font-bold uppercase tracking-tight leading-relaxed mb-10 min-h-[4rem]">
                                {testimonial.content}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center text-zinc-500 font-black text-xs">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <div className="font-black text-zinc-100 text-[11px] uppercase tracking-wider">{testimonial.name}</div>
                                    <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="bg-zinc-900 border border-zinc-800 p-1 bg-[linear-gradient(45deg,#18181b_25%,#27272a_25%,#27272a_50%,#18181b_50%,#18181b_75%,#27272a_75%,#27272a_100%)] bg-[length:4px_4px]">
                        <div className="bg-zinc-950 p-12 relative overflow-hidden">
                            <div className="text-center mb-16 space-y-4">
                                <h3 className="text-2xl font-black text-zinc-100 uppercase tracking-[0.2em]">
                                    Protocolos de Estándar Global
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">
                                    Compliance garantizado bajo normativas internacionales de seguridad industrial
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {certifications.map((cert, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center gap-6 group cursor-default"
                                    >
                                        <div className="w-20 h-20 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center relative group-hover:border-cyan-400/50 transition-colors">
                                            <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-800 border-b border-l border-zinc-700" />
                                            <span className="text-xl font-black text-zinc-100 uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">
                                                {cert.name}
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] group-hover:text-zinc-300 transition-colors">
                                                {cert.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
