"use client";

import { motion } from "framer-motion";
import { Zap, Calendar, ArrowRight, Tag, Share2, Eye } from "lucide-react";
import Link from "next/link";

export default function NovedadesPage() {
    const news = [
        {
            id: 1,
            category: "Lanzamientos",
            date: "12 Feb 2026",
            title: "Protocolo_ESP32-S3: El Nuevo Estándar en IoT",
            excerpt: "Desbloqueamos el potencial absoluto del doble núcleo con nuestro nuevo kit de desarrollo industrial.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            readTime: "5 min"
        },
        {
            id: 2,
            category: "Comunidad",
            date: "08 Feb 2026",
            title: "Ganadores del Challenge de Robótica 'Deep Sea'",
            excerpt: "Los ingenieros de la red Osart demuestran por qué somos la vanguardia del desarrollo tecnológico.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
            readTime: "3 min"
        },
        {
            id: 3,
            category: "Técnico",
            date: "05 Feb 2026",
            title: "Optimización de Latencia en PostgREST",
            excerpt: "Cómo logramos reducir el Heartbeat a 50ms en nuestra infraestructura global de datos.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
            readTime: "8 min"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32 relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-accent">Sincronización de Datos v.1.0</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none"
                        >
                            Novedades <br />
                            <span className="text-white/20">del Sistema.</span>
                        </motion.h1>
                    </div>
                </div>

                {/* Featured News Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 group mb-24 cursor-pointer"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-[300px] lg:h-[600px] overflow-hidden">
                            <img
                                src={news[0].image}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>
                        <div className="p-12 md:p-20 flex flex-col justify-center space-y-8">
                            <div className="flex items-center gap-6">
                                <span className="bg-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                    {news[0].category}
                                </span>
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={12} /> {news[0].date}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">{news[0].title}</h2>
                            <p className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] leading-relaxed line-clamp-3">{news[0].excerpt}</p>
                            <div className="flex items-center gap-6 pt-4">
                                <button className="arobix-button bg-white text-black hover:bg-accent hover:text-white h-14 px-12">
                                    LEER REPORTE <ArrowRight size={18} />
                                </button>
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                    Tiempo de lectura: {news[0].readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {news.slice(1).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group hover:border-accent luxury-transition hover:bg-white/10"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.date}</span>
                                    <div className="flex items-center gap-4 text-white/20">
                                        <Share2 size={14} className="hover:text-white cursor-pointer transition-colors" />
                                        <Eye size={14} className="hover:text-white cursor-pointer transition-colors" />
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed line-clamp-2">
                                    {item.excerpt}
                                </p>
                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">Análisis Completo</span>
                                    <ArrowRight size={18} className="text-white/20 group-hover:text-accent group-hover:translate-x-2 luxury-transition" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-16 md:p-24 rounded-[4rem] bg-accent flex flex-col items-center text-center space-y-10 relative overflow-hidden group shadow-[0_0_100px_rgba(230,0,0,0.2)]"
                >
                    <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px]" />
                    <Zap size={48} className="text-white" />
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] text-white">
                        Boletín <br />
                        <span className="opacity-40">de Vanguardia.</span>
                    </h2>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-white max-w-md">Suscríbete para recibir los protocolos técnicos antes que nadie.</p>
                    <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="DIRECCIÓN_EMAIL@INGENIERO.COM"
                            className="flex-1 bg-black/20 border border-white/20 rounded-2xl px-6 h-14 text-white placeholder:text-white/40 text-[10px] font-black tracking-widest focus:outline-none focus:bg-black/40 luxury-transition"
                        />
                        <button className="bg-white text-black h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 luxury-transition shadow-2xl">
                            SUSCRIBIRME
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
