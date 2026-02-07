"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    CheckCircle2,
    XCircle,
    Loader2,
    Eye,
    EyeOff,
    RefreshCw,
    ExternalLink,
    AlertCircle
} from "lucide-react";
import { getAllPaymentProvidersStatus, PaymentProviderStatus } from "@/app/actions/paymentProviderActions";
import { cn } from "@/lib/utils";

const PROVIDER_INFO = {
    stripe: {
        name: "Stripe",
        logo: "💳",
        color: "electric-blue",
        docs: "https://stripe.com/docs",
        fields: [
            { key: "STRIPE_SECRET_KEY", label: "Secret Key", placeholder: "sk_test_..." },
            { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", label: "Publishable Key", placeholder: "pk_test_..." },
            { key: "STRIPE_WEBHOOK_SECRET", label: "Webhook Secret", placeholder: "whsec_..." },
        ]
    },
    mercadopago: {
        name: "MercadoPago",
        logo: "🇦🇷",
        color: "tech-green",
        docs: "https://www.mercadopago.com.ar/developers",
        fields: [
            { key: "MERCADOPAGO_ACCESS_TOKEN", label: "Access Token", placeholder: "APP_USR-..." },
            { key: "MERCADOPAGO_PUBLIC_KEY", label: "Public Key", placeholder: "APP_USR-..." },
        ]
    },
    paypal: {
        name: "PayPal",
        logo: "🅿️",
        color: "electric-blue",
        docs: "https://developer.paypal.com/docs",
        fields: [
            { key: "PAYPAL_CLIENT_ID", label: "Client ID", placeholder: "AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx" },
            { key: "PAYPAL_CLIENT_SECRET", label: "Client Secret", placeholder: "EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx" },
        ]
    }
};

export default function PaymentProvidersPanel() {
    const [providers, setProviders] = useState<PaymentProviderStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
    const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

    useEffect(() => {
        loadProviders();
        // Auto-refresh cada 30 segundos
        const interval = setInterval(loadProviders, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadProviders = async () => {
        try {
            const status = await getAllPaymentProvidersStatus();
            setProviders(status);
        } catch (error) {
            console.error('Error loading providers:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadProviders();
    };

    const toggleShowSecret = (key: string) => {
        setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 size={32} className="animate-spin text-electric-blue" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-4">
                        <CreditCard size={14} className="text-electric-blue" />
                        <span className="text-xs font-bold uppercase tracking-wide text-electric-blue">
                            Configuración de Pagos
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-graphite mb-2">
                        Proveedores de Pago
                    </h2>
                    <p className="text-sm text-slate-deep/60 font-medium">
                        Configura y monitorea tus plataformas de pago en tiempo real
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 h-12 px-6 bg-white border-2 border-graphite/20 hover:border-electric-blue/40 text-graphite rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={cn(refreshing && "animate-spin")} />
                    Actualizar
                </motion.button>
            </div>

            {/* Providers Grid */}
            <div className="grid gap-6">
                {providers.map((provider, index) => {
                    const info = PROVIDER_INFO[provider.provider];
                    const isExpanded = expandedProvider === provider.provider;

                    return (
                        <motion.div
                            key={provider.provider}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-subtle border border-graphite/10 overflow-hidden"
                        >
                            {/* Provider Header */}
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl">{info.logo}</div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-graphite mb-1">
                                                {info.name}
                                            </h3>
                                            <a
                                                href={info.docs}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-electric-blue hover:underline flex items-center gap-1"
                                            >
                                                Documentación
                                                <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full border",
                                        provider.connected
                                            ? "bg-tech-green/10 border-tech-green/20"
                                            : "bg-red-500/10 border-red-500/20"
                                    )}>
                                        {provider.connected ? (
                                            <>
                                                <CheckCircle2 size={16} className="text-tech-green" />
                                                <span className="text-xs font-bold uppercase tracking-wide text-tech-green">
                                                    Conectado
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={16} className="text-red-500" />
                                                <span className="text-xs font-bold uppercase tracking-wide text-red-500">
                                                    Desconectado
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Connection Status Bar */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold uppercase tracking-wide text-slate-deep/60">
                                            Estado de Conexión
                                        </span>
                                        <span className="text-slate-deep/40">
                                            Última verificación: {new Date(provider.lastChecked).toLocaleTimeString()}
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative h-3 bg-graphite/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: provider.connected ? "100%" : "0%" }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={cn(
                                                "h-full rounded-full",
                                                provider.connected ? "bg-tech-green" : "bg-red-500"
                                            )}
                                        />
                                        {provider.connected && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                animate={{ x: ["-100%", "200%"] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            />
                                        )}
                                    </div>

                                    {/* Error Message */}
                                    {provider.error && (
                                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                                            <AlertCircle size={16} className="text-red-500 mt-0.5" />
                                            <p className="text-xs text-red-700 font-medium">
                                                {provider.error}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Configure Button */}
                                <button
                                    onClick={() => setExpandedProvider(isExpanded ? null : provider.provider)}
                                    className="mt-6 w-full h-12 bg-gradient-to-br from-graphite to-midnight text-white rounded-xl font-bold uppercase tracking-wide text-sm hover:shadow-elevated transition-all"
                                >
                                    {isExpanded ? "Ocultar Configuración" : "Configurar Claves API"}
                                </button>
                            </div>

                            {/* Configuration Panel */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-graphite/10 bg-pearl/30"
                                    >
                                        <div className="p-8 space-y-6">
                                            <div className="flex items-start gap-3 p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-xl">
                                                <AlertCircle size={18} className="text-electric-blue mt-0.5" />
                                                <div className="text-sm text-slate-deep/80">
                                                    <p className="font-semibold text-graphite mb-1">
                                                        Configuración de Variables de Entorno
                                                    </p>
                                                    <p>
                                                        Agrega estas claves a tu archivo <code className="px-2 py-1 bg-white rounded text-xs font-mono">.env.local</code> y reinicia el servidor.
                                                    </p>
                                                </div>
                                            </div>

                                            {info.fields.map((field) => (
                                                <div key={field.key} className="space-y-2">
                                                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60">
                                                        {field.label}
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showSecrets[field.key] ? "text" : "password"}
                                                            placeholder={field.placeholder}
                                                            className="w-full h-14 bg-white border-2 border-graphite/10 rounded-xl px-4 pr-12 font-mono text-sm outline-none focus:border-electric-blue/30 transition-all"
                                                            readOnly
                                                            value={field.key}
                                                        />
                                                        <button
                                                            onClick={() => toggleShowSecret(field.key)}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-deep/40 hover:text-graphite transition-colors"
                                                        >
                                                            {showSecrets[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-slate-deep/50 font-mono">
                                                        {field.key}=tu_clave_aqui
                                                    </p>
                                                </div>
                                            ))}

                                            <div className="pt-4 border-t border-graphite/10">
                                                <p className="text-xs text-slate-deep/60 mb-4">
                                                    Después de agregar las claves, reinicia el servidor con:
                                                </p>
                                                <code className="block p-4 bg-graphite text-white rounded-xl text-sm font-mono">
                                                    npm run dev
                                                </code>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
