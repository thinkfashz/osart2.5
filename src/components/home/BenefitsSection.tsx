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
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

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
                        <Zap size={12} className="text-cyan-400" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">
                            CORE_SPECIFICATIONS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-100 uppercase"
                    >
                        Ingeniería sin
                        <br />
                        <span className="text-zinc-800">Compromisos.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[14px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed max-w-2xl mx-auto"
                    >
                        Cada componente es sometido a protocolos de estrés industrial.
                        No suministramos repuestos; entregamos continuidad operativa.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-zinc-900/50 p-8 border border-zinc-800 h-full flex flex-col hover:border-cyan-400/50 transition-all duration-300 relative group overflow-hidden">
                                {/* Hover Glow */}
                                <div className="absolute -inset-1 bg-cyan-400/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />

                                {/* Icon */}
                                <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 relative z-10">
                                    <benefit.icon size={20} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" strokeWidth={2.5} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4 relative z-10">
                                    <h3 className="text-lg font-black text-zinc-100 uppercase tracking-tighter">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Metric Badge */}
                                <div className="mt-8 pt-6 border-t border-zinc-800 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-400/50" />
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                                STATUS_VERIFIED
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-black text-zinc-100 tabular-nums tracking-wider bg-zinc-800 px-2 py-1">
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
