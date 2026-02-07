"use client";

import { Truck, Package, Globe } from "lucide-react";
import { ShippingData } from "@/types";

interface Props {
    shippingData: ShippingData;
}

// Mapping de códigos de país a nombres en español
const COUNTRY_NAMES: Record<string, string> = {
    AR: "Argentina", CL: "Chile", UY: "Uruguay", PY: "Paraguay", BO: "Bolivia",
    BR: "Brasil", CO: "Colombia", PE: "Perú", VE: "Venezuela", EC: "Ecuador",
    MX: "México", US: "Estados Unidos", CA: "Canadá",
    GB: "Reino Unido", DE: "Alemania", FR: "Francia", ES: "España",
    IT: "Italia", PT: "Portugal", NL: "Países Bajos",
    CN: "China", JP: "Japón", AU: "Australia"
};

export default function ShippingInfo({ shippingData }: Props) {
    if (!shippingData || (!shippingData.national && !shippingData.international)) {
        return null;
    }

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-luxury border border-slate-200 space-y-8">
            <div className="flex items-center gap-3 text-primary">
                <Truck size={24} strokeWidth={1.5} />
                <h3 className="text-xl font-black tracking-tight">Información de Envío</h3>
            </div>

            {/* Nacional */}
            {shippingData.national?.enabled && (
                <div className="space-y-4 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <Package size={18} className="text-primary" />
                        <span className="text-[10px] uppercase tracking-widest font-black text-primary">
                            Envío Nacional
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="inline-flex px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
                            {shippingData.national.delivery_time_min}-{shippingData.national.delivery_time_max} días
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {shippingData.national.regions.map((code) => (
                            <div
                                key={code}
                                className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:bg-primary/5 luxury-transition cursor-default"
                            >
                                <img
                                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                                    alt={COUNTRY_NAMES[code] || code}
                                    className="w-5 h-auto rounded-sm shadow-sm"
                                    loading="lazy"
                                />
                                <span className="text-xs font-bold text-text-secondary group-hover:text-primary luxury-transition">
                                    {COUNTRY_NAMES[code] || code}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Internacional */}
            {shippingData.international?.enabled && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Globe size={18} className="text-accent" />
                        <span className="text-[10px] uppercase tracking-widest font-black text-accent">
                            Envío Internacional
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="inline-flex px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm">
                            {shippingData.international.delivery_time_min}-{shippingData.international.delivery_time_max} días
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {shippingData.international.regions.map((code) => (
                            <div
                                key={code}
                                className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-accent hover:bg-accent/5 luxury-transition cursor-default"
                            >
                                <img
                                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                                    alt={COUNTRY_NAMES[code] || code}
                                    className="w-5 h-auto rounded-sm shadow-sm"
                                    loading="lazy"
                                />
                                <span className="text-xs font-bold text-text-secondary group-hover:text-accent luxury-transition">
                                    {COUNTRY_NAMES[code] || code}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="pt-4 border-t border-slate-200">
                <p className="text-xs text-text-light italic">
                    ✨ Los tiempos de entrega son estimados y pueden variar según la ubicación exacta y la disponibilidad de stock.
                </p>
            </div>
        </div>
    );
}
