"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, Gauge, CheckCircle2, Zap, Lock } from "lucide-react";

const benefits = [
    {
        icon: Shield,
        title: "Durabilidad Extrema",
        description: "Componentes diseñados para soportar condiciones industriales exigentes.",
        metric: "50,000+ ciclos",
    },
    {
        icon: Cpu,
        title: "Compatibilidad Total",
        description: "Integración perfecta con sistemas existentes. Sin adaptadores adicionales.",
        metric: "99.8% compatible",
    },
    {
        icon: Gauge,
        title: "Rendimiento Superior",
        description: "Eficiencia energética optimizada. Menos calor, mayor vida útil.",
        metric: "+35% eficiencia",
    },
    {
        icon: Lock,
        title: "Seguridad Certificada",
        description: "Protección contra sobretensión, cortocircuito y sobrecalentamiento.",
        metric: "ISO 9001",
    },
];

export default function BenefitsSection() {
    return (
        <section className="py-32 bg-ivory relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-tech-grid opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20"
                    >
                        <Zap size={14} className="text-electric-blue" />
                        <span className="text-xs font-semibold tracking-wide text-electric-blue">
                            Ingeniería de Precisión
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold tracking-tight text-graphite"
                    >
                        Tecnología que Funciona.
                        <br />
                        <span className="text-slate-deep/50">Siempre.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-deep/70 leading-relaxed"
                    >
                        Cada componente pasa por rigurosos controles de calidad.
                        No vendemos repuestos. Vendemos confiabilidad.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-500 border border-graphite/5 h-full flex flex-col">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue/10 to-tech-green/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <benefit.icon size={24} className="text-electric-blue" strokeWidth={2} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-xl font-bold text-graphite tracking-tight">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-slate-deep/70 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Metric Badge */}
                                <div className="mt-6 pt-6 border-t border-graphite/10">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-tech-green" />
                                        <span className="text-sm font-bold text-graphite tracking-wide">
                                            {benefit.metric}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
