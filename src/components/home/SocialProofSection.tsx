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
        <section className="py-32 bg-gradient-to-b from-pearl to-ivory relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-tech-grid opacity-10" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech-green/10 border border-tech-green/20"
                    >
                        <Star size={14} className="text-tech-green fill-tech-green" />
                        <span className="text-xs font-semibold tracking-wide text-tech-green">
                            Confianza Profesional
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold tracking-tight text-graphite"
                    >
                        Elegido por Ingenieros.
                        <br />
                        <span className="text-slate-deep/50">Validado en Campo.</span>
                    </motion.h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-500 border border-graphite/5"
                        >
                            {/* Quote Icon */}
                            <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-6">
                                <Quote size={18} className="text-electric-blue" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="text-tech-green fill-tech-green" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-sm text-slate-deep/80 leading-relaxed mb-6 italic">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="pt-6 border-t border-graphite/10">
                                <div className="font-bold text-graphite text-sm">{testimonial.name}</div>
                                <div className="text-xs text-slate-deep/60 mt-1">{testimonial.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-2xl p-10 shadow-subtle border border-graphite/5">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-graphite mb-2">
                                Certificaciones Internacionales
                            </h3>
                            <p className="text-sm text-slate-deep/60">
                                Cumplimiento riguroso de estándares globales de calidad y seguridad
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-pearl/50 hover:bg-electric-blue/5 transition-colors"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white shadow-subtle flex items-center justify-center border-2 border-graphite/10">
                                        <span className="text-lg font-bold text-graphite">{cert.name}</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-deep/60 font-medium">
                                            {cert.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
