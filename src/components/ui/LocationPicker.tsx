"use client";

import { useState } from "react";
import { MapPin, Globe, Loader2, Navigation, Target, ShieldCheck, Satellite } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LocationData {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    fullAddress: string;
    lat: number;
    lon: number;
}

interface LocationPickerProps {
    onLocationSelect?: (locationData: LocationData) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
    const [loading, setLoading] = useState(false);
    const [locationData, setLocationData] = useState<any>(null);
    const [status, setStatus] = useState<string>("Esperando");

    const getGPSCoordinates = () => {
        setLoading(true);
        setStatus("Sincronizando...");

        if (!navigator.geolocation) {
            setStatus("GPS no disponible");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setStatus("Triangulando...");

                try {
                    // Reverse geocoding (OpenStreetMap API free usage for demo)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await response.json();

                    const structuredData: LocationData = {
                        street: data.address.road || data.address.street || "",
                        city: data.address.city || data.address.town || data.address.village || "",
                        state: data.address.state || data.address.province || "",
                        postalCode: data.address.postcode || "",
                        country: data.address.country || "",
                        fullAddress: data.display_name,
                        lat: latitude,
                        lon: longitude
                    };

                    setLocationData(structuredData);

                    if (onLocationSelect) onLocationSelect(structuredData);
                    setStatus("Ubicación confirmada");
                } catch (err) {
                    setStatus("Error de conexión");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setStatus("Acceso denegado");
                setLoading(false);
            }
        );
    };

    return (
        <div className="bg-white rounded-3xl p-10 space-y-8 relative overflow-hidden border border-graphite/10 shadow-subtle">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-tech-grid opacity-5" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center">
                        <Satellite size={20} className="text-electric-blue" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-wide text-graphite">Sincronización Geográfica</span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-deep/40">GPS en Tiempo Real</span>
                    </div>
                </div>
                <motion.div
                    animate={{
                        scale: loading ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: loading ? Infinity : 0,
                    }}
                    className={cn(
                        "px-4 py-2 rounded-xl border text-xs font-semibold uppercase tracking-wide transition-all",
                        loading ? "border-electric-blue/30 text-electric-blue bg-electric-blue/5" : "border-graphite/10 text-slate-deep/40 bg-graphite/5"
                    )}
                >
                    {status}
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Action Button */}
                <motion.button
                    onClick={getGPSCoordinates}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="h-24 px-8 bg-gradient-to-br from-graphite to-midnight text-white rounded-2xl font-semibold uppercase tracking-wide text-sm hover:shadow-elevated transition-all flex items-center justify-center gap-6 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center gap-3">
                            <Loader2 className="animate-spin text-electric-blue" size={24} />
                            <span>Localizando...</span>
                        </div>
                    ) : (
                        <>
                            <motion.div
                                whileHover={{ rotate: 45 }}
                                transition={{ duration: 0.3 }}
                                className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center"
                            >
                                <Navigation size={20} className="text-electric-blue" />
                            </motion.div>
                            <div className="flex flex-col items-start">
                                <span className="font-bold text-base">Detectar Ubicación</span>
                                <span className="text-xs tracking-wide font-medium opacity-60">Auto-rellenar dirección</span>
                            </div>
                        </>
                    )}
                </motion.button>

                {/* Location Display */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {locationData ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="p-6 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 space-y-3"
                            >
                                <div className="flex items-center gap-3 text-electric-blue">
                                    <Target size={16} />
                                    <span className="text-sm font-bold uppercase tracking-wide">Ubicación Detectada</span>
                                </div>
                                <div className="space-y-2">
                                    {locationData.street && (
                                        <p className="text-sm font-semibold text-graphite">
                                            📍 {locationData.street}
                                        </p>
                                    )}
                                    {locationData.city && (
                                        <p className="text-sm font-medium text-slate-deep/70">
                                            🏙️ {locationData.city}, {locationData.state}
                                        </p>
                                    )}
                                    {locationData.postalCode && (
                                        <p className="text-xs font-semibold text-electric-blue/70">
                                            CP: {locationData.postalCode}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-6 rounded-2xl border-2 border-dashed border-graphite/10 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
                            >
                                <MapPin size={32} className="text-graphite/20" />
                                <p className="text-sm font-semibold uppercase tracking-wide text-slate-deep/40">Esperando señal GPS</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-graphite/10 relative z-10">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={14} className="text-tech-green" />
                    <span className="text-xs font-semibold text-slate-deep/40 uppercase tracking-wide">Datos Encriptados</span>
                </div>
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="w-2 h-2 rounded-full bg-tech-green shadow-lg shadow-tech-green/50"
                    />
                    <span className="text-xs font-semibold text-slate-deep/40 uppercase tracking-wide">En Línea</span>
                </div>
            </div>
        </div>
    );
}
