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
        <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900 relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center transition-all group-hover:bg-cyan-400">
                                <Cpu size={24} className="text-zinc-950" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black tracking-tighter leading-none text-zinc-100">OSART</span>
                                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-500">Industry Standard</span>
                            </div>
                        </Link>
                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed max-w-xs">
                            Suministro estratégico de componentes electrónicos críticos. Ingeniería soberana para infraestructuras de alta exigencia.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-20">
                        {sections.map((section) => (
                            <div key={section.title} className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-900 pb-2">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <Link href="#" className="text-[10px] font-bold text-zinc-600 hover:text-zinc-100 transition-colors block uppercase tracking-wide">
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
                <div className="pt-12 border-t border-zinc-900 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex items-center flex-wrap justify-center gap-12 opacity-40">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={14} className="text-cyan-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-100">ISO 9001 PROT</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe size={14} className="text-cyan-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-100">GLOBAL_LOGISTICS</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Activity size={14} className="text-cyan-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-100">REAL_TIME_MONITORING</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest leading-none">© 2026 OSART_CORP // DEPLOYMENT_SECURE</p>
                        <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 border border-zinc-800">
                            <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">SYSTEM_STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
