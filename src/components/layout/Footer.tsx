"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Mail, ShieldCheck, Globe, Activity, Cpu } from "lucide-react";

export default function Footer() {
    const sections = [
        {
            title: "Productos",
            links: ["Baterías", "Componentes", "Módulos", "Accesorios"]
        },
        {
            title: "Recursos",
            links: ["Documentación", "Guías Técnicas", "Especificaciones", "Catálogo PDF"]
        },
        {
            title: "Soporte",
            links: ["Centro de Ayuda", "Garantía", "Envíos", "Contacto"]
        }
    ];

    return (
        <footer className="bg-pearl pt-32 pb-12 border-t border-graphite/10 relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-tech-grid opacity-5" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-graphite flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Cpu size={24} className="text-electric-blue" strokeWidth={2} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold tracking-tight leading-none text-graphite">OSART</span>
                                <span className="text-[8px] uppercase tracking-[0.3em] font-semibold text-platinum">Precision Components</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-deep/60 leading-relaxed max-w-xs">
                            Repuestos electrónicos de grado industrial para equipos exigentes. Calidad profesional garantizada.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl border border-graphite/10 flex items-center justify-center text-slate-deep/40 hover:text-electric-blue hover:border-electric-blue/30 transition-all">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-20">
                        {sections.map((section) => (
                            <div key={section.title} className="space-y-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-graphite">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <Link href="#" className="text-sm text-slate-deep/60 hover:text-electric-blue transition-colors block">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Technical Bar */}
                <div className="pt-12 border-t border-graphite/10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center flex-wrap justify-center gap-8 opacity-60">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-tech-green" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">ISO 9001</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="text-electric-blue" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">Envío Global</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-tech-green" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider">24/7 Soporte</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-semibold text-slate-deep/40 uppercase tracking-wider">© 2026 OSART Electronic Components</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-tech-green animate-pulse" />
                            <span className="text-[9px] font-semibold text-slate-deep/40 uppercase tracking-wider">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
