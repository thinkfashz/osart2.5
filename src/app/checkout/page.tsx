"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Truck, CreditCard, CheckCircle2, ArrowRight, ArrowLeft, Trash2, ShieldCheck, Zap, Package, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LocationPicker from "@/components/ui/LocationPicker";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { paymentsApi, ordersApi } from "@/lib/api-client";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const STEPS = ["Carrito", "Envío", "Pago", "Confirmación"];

export default function CheckoutPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    const nextStep = async () => {
        setIsProcessing(true);
        try {
            // Logic to handle specific step transitions
            if (currentStep === 1) {
                // Moving from Shipping to Payment
                await preparePayment();
            }

            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
        } catch (error) {
            console.error("Error transitioning step:", error);
            alert("Error al procesar el paso actual. Por favor intenta de nuevo.");
        } finally {
            setIsProcessing(false);
        }
    };

    const preparePayment = async () => {
        // 1. Create order via Server Action (keep this for now or move to API later)
        const { createOrder } = await import('@/app/actions/orderActions');

        // Mock shipping address for now as per previous implementation
        const orderData = {
            items: items.map(item => ({
                product_id: item.id,
                product_name: item.title,
                product_image: item.image_url,
                quantity: item.quantity,
                unit_price: item.price
            })),
            shipping_address: {
                fullName: "Cliente Demo",
                street: "Calle Principal",
                houseNumber: "123",
                city: "Ciudad",
                state: "Estado",
                postalCode: "12345",
                phone: "1234567890"
            },
            payment_method: "Tarjeta de Crédito",
            subtotal: total,
            shipping_cost: 0,
            total: total
        };

        const result = await createOrder(orderData);
        if (!result.success || !result.order) {
            throw new Error(result.error || "Error al crear la orden");
        }

        setOrderId(result.order.id);

        // 2. Get clientSecret from NestJS API
        try {
            const data = await paymentsApi.createIntent({
                amount: total,
                orderId: result.order.id
            });
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Error creating payment intent:", error);
            throw new Error("No se pudo obtener la intención de pago");
        }
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    if (items.length === 0 && currentStep === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12 bg-pearl pt-32">
                <div className="relative group">
                    <div className="w-32 h-32 bg-graphite/10 rounded-3xl flex items-center justify-center">
                        <ShoppingBag size={56} className="text-graphite/40" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                        <Package size={14} className="text-electric-blue" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-electric-blue">Carrito Vacío</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-graphite leading-[0.9]">
                        Tu Carrito está Vacío
                    </h1>
                    <p className="text-lg text-slate-deep/60 font-medium max-w-md mx-auto">
                        Explora nuestro catálogo de componentes electrónicos profesionales
                    </p>
                </div>
                <Link href="/catalog" className="px-12 py-5 bg-gradient-to-br from-graphite to-midnight text-white rounded-2xl font-bold uppercase tracking-wide text-sm hover:shadow-elevated transition-all flex items-center gap-3 group">
                    Explorar Catálogo
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-pearl text-graphite min-h-screen pt-32 pb-24 relative">
            <div className="container mx-auto max-w-7xl px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                        <ShieldCheck size={14} className="text-electric-blue" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-electric-blue">Checkout Seguro</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-graphite leading-[0.9]">
                        Finalizar Compra
                    </h1>
                </div>

                {/* Progress Bar */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        {STEPS.map((step, i) => (
                            <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                                <motion.div
                                    animate={{
                                        scale: i === currentStep ? 1.1 : 1,
                                        backgroundColor: i <= currentStep ? "#10B981" : "#E8EAED",
                                        borderColor: i <= currentStep ? "#10B981" : "#C0C5CE"
                                    }}
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center border-2 font-bold text-sm transition-all",
                                        i <= currentStep ? "text-white shadow-lg" : "text-slate-deep/40"
                                    )}
                                >
                                    {i < currentStep ? <CheckCircle2 size={20} strokeWidth={3} /> : i + 1}
                                </motion.div>
                                <span className={cn(
                                    "text-xs uppercase tracking-wide font-semibold transition-all",
                                    i <= currentStep ? "text-graphite" : "text-slate-deep/40"
                                )}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="h-2 bg-graphite/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-tech-green to-electric-blue relative"
                        >
                            <motion.div
                                animate={{
                                    x: ["-100%", "200%"]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {currentStep === 0 && (
                                    <CartStep items={items} updateQuantity={updateQuantity} removeItem={removeItem} />
                                )}
                                {currentStep === 1 && <ShippingStep />}
                                {currentStep === 2 && (
                                    clientSecret ? (
                                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                                            <PaymentStep />
                                        </Elements>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-12 space-y-4">
                                            <Loader2 className="animate-spin text-electric-blue" size={48} />
                                            <p className="text-sm font-semibold uppercase tracking-widest text-slate-deep/40">Iniciando Checkout Seguro...</p>
                                        </div>
                                    )
                                )}
                                {currentStep === 3 && (
                                    clientSecret ? (
                                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                                            <ReviewStep items={items} totalPrice={total} orderId={orderId} />
                                        </Elements>
                                    ) : (
                                        <ReviewStep items={items} totalPrice={total} orderId={orderId} />
                                    )
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-graphite/10">
                            {currentStep > 0 ? (
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-3 px-6 py-4 text-sm uppercase tracking-wide font-semibold text-slate-deep/60 hover:text-graphite transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border-2 border-graphite/20 flex items-center justify-center group-hover:bg-graphite group-hover:text-white group-hover:border-graphite transition-all">
                                        <ArrowLeft size={18} />
                                    </div>
                                    Atrás
                                </button>
                            ) : (
                                <Link
                                    href="/catalog"
                                    className="flex items-center gap-3 px-6 py-4 text-sm uppercase tracking-wide font-semibold text-slate-deep/60 hover:text-graphite transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border-2 border-graphite/20 flex items-center justify-center group-hover:bg-graphite group-hover:text-white group-hover:border-graphite transition-all">
                                        <ArrowLeft size={18} />
                                    </div>
                                    Seguir Comprando
                                </Link>
                            )}

                            <div className="flex-1" />

                            {currentStep < STEPS.length - 1 ? (
                                <motion.button
                                    onClick={nextStep}
                                    disabled={isProcessing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative min-w-[240px] h-14 bg-gradient-to-br from-tech-green to-electric-blue text-white rounded-2xl font-bold uppercase tracking-wide text-sm shadow-lg overflow-hidden group disabled:opacity-50"
                                >
                                    {/* Electric Effect on Hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                        animate={{
                                            background: [
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
                                            ],
                                            backgroundPosition: ["-200%", "200%"]
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Spark Effect on Click */}
                                    {isProcessing && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 1 }}
                                            animate={{ scale: 3, opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="absolute inset-0 bg-white rounded-2xl"
                                        />
                                    )}

                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Continuar
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative min-w-[280px] h-14 bg-gradient-to-br from-electric-blue to-tech-green text-white rounded-2xl font-bold uppercase tracking-wide text-sm shadow-lg overflow-hidden group"
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{
                                            background: [
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
                                            ],
                                            backgroundPosition: ["-200%", "200%"]
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Zap size={18} />
                                        Confirmar Pedido
                                    </span>
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-3xl p-8 space-y-8 sticky top-32 shadow-subtle border border-graphite/10">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                                    <Package size={12} className="text-electric-blue" />
                                    <span className="text-xs font-semibold uppercase tracking-wide text-electric-blue">Resumen</span>
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-graphite">Resumen del Pedido</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-deep/60 uppercase tracking-wide">Subtotal</span>
                                    <span className="font-bold text-graphite">{formatCurrency(total)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-deep/60 uppercase tracking-wide">Envío</span>
                                    <span className="text-tech-green font-bold uppercase tracking-wide">Gratis</span>
                                </div>
                                <div className="h-px bg-graphite/10" />
                                <div className="flex justify-between items-end pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60">Total</span>
                                        <span className="text-xs text-electric-blue font-semibold uppercase tracking-wide">IVA Incluido</span>
                                    </div>
                                    <span className="text-4xl font-bold text-graphite tracking-tight">{formatCurrency(total)}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-graphite/10 space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-tech-green/10 border border-tech-green/20">
                                    <Truck size={18} className="text-tech-green mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold uppercase tracking-wide text-graphite">Envío Asegurado</p>
                                        <p className="text-xs text-slate-deep/60 font-medium leading-relaxed">Entrega en 2-3 días hábiles</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-2xl bg-electric-blue/10 border border-electric-blue/20">
                                    <ShieldCheck size={18} className="text-electric-blue mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold uppercase tracking-wide text-graphite">Garantía OSART</p>
                                        <p className="text-xs text-slate-deep/60 font-medium leading-relaxed">Calidad certificada ISO 9001</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CartStep({ items, updateQuantity, removeItem }: { items: any[], updateQuantity: any, removeItem: any }) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-graphite">Productos en tu Carrito</h2>
                <p className="text-sm text-slate-deep/60 font-medium">Revisa los productos antes de continuar</p>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id}
                        className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-graphite/10 hover:border-electric-blue/30 transition-all shadow-subtle"
                    >
                        <div className="w-24 h-24 bg-pearl rounded-xl p-4 flex items-center justify-center shrink-0">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-contain" />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wide font-semibold text-electric-blue">{item.category || 'Componente'}</span>
                                <h4 className="text-lg font-bold text-graphite">{item.title}</h4>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-bold text-graphite">{formatCurrency(item.price)}</p>
                                <div className="h-4 w-px bg-graphite/10" />
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-deep/40">SKU: {item.id.slice(0, 8)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center bg-graphite/5 border border-graphite/10 rounded-xl p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center text-slate-deep/60 hover:text-graphite hover:bg-white rounded-lg transition-all font-bold"
                                >-</button>
                                <span className="w-10 text-center text-sm font-bold text-graphite">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center text-slate-deep/60 hover:text-graphite hover:bg-white rounded-lg transition-all font-bold"
                                >+</button>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center gap-2 text-xs uppercase tracking-wide font-semibold text-red-500 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={14} /> Eliminar
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function ShippingStep() {
    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        houseNumber: "",
        city: "",
        state: "",
        postalCode: "",
        phone: ""
    });
    const [useGPS, setUseGPS] = useState(true);
    const [gpsData, setGpsData] = useState<any>(null);

    const handleLocationSelect = (locationData: any) => {
        setGpsData(locationData);
        if (useGPS) {
            setFormData(prev => ({
                ...prev,
                street: locationData.street || "",
                city: locationData.city || "",
                state: locationData.state || "",
                postalCode: locationData.postalCode || ""
            }));
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-graphite">Información de Envío</h2>
                <p className="text-sm text-slate-deep/60 font-medium">Usa GPS para auto-rellenar o ingresa manualmente</p>
            </div>

            {/* Toggle GPS / Manual */}
            <div className="flex items-center gap-4 p-4 bg-electric-blue/10 border border-electric-blue/20 rounded-2xl">
                <button
                    onClick={() => setUseGPS(!useGPS)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all",
                        useGPS
                            ? "bg-electric-blue text-white"
                            : "bg-white text-graphite border border-graphite/10"
                    )}
                >
                    {useGPS ? "📍 GPS Activado" : "✏️ Modo Manual"}
                </button>
                <span className="text-xs font-medium text-slate-deep/60">
                    {useGPS ? "Los campos se rellenarán automáticamente" : "Completa todos los campos manualmente"}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* GPS Location Picker */}
                {useGPS && (
                    <div className="col-span-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                            Detectar Ubicación Automáticamente
                        </label>
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                    </div>
                )}

                {/* GPS Suggestion Box */}
                {useGPS && gpsData && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-2 p-4 bg-tech-green/10 border border-tech-green/20 rounded-2xl"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-tech-green flex items-center justify-center text-white shrink-0">
                                ✓
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm font-bold text-graphite">Datos detectados automáticamente</p>
                                <div className="text-xs font-medium text-slate-deep/70 space-y-1">
                                    <p>📍 Calle: <span className="font-semibold">{gpsData.street || "No detectada"}</span></p>
                                    <p>🏙️ Ciudad: <span className="font-semibold">{gpsData.city}, {gpsData.state}</span></p>
                                    <p>📮 CP: <span className="font-semibold">{gpsData.postalCode || "No detectado"}</span></p>
                                </div>
                                <p className="text-xs text-tech-green font-semibold">
                                    Solo necesitas agregar el número de tu casa/departamento
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Full Name */}
                <div className="col-span-2">
                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                        Nombre Completo *
                    </label>
                    <input
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Tu nombre completo"
                        className="w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all"
                    />
                </div>

                {/* Street (auto-filled or manual) */}
                <div className={useGPS ? "col-span-1" : "col-span-2"}>
                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                        Calle {useGPS && gpsData && "(Auto-rellenado)"}
                    </label>
                    <input
                        value={formData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        placeholder="Nombre de la calle"
                        disabled={useGPS && !!gpsData}
                        className={cn(
                            "w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all",
                            useGPS && gpsData && "bg-tech-green/10 border-tech-green/20 text-graphite font-semibold"
                        )}
                    />
                </div>

                {/* House Number (always editable) */}
                {useGPS && (
                    <div className="col-span-1">
                        <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                            Número / Depto *
                        </label>
                        <input
                            value={formData.houseNumber}
                            onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                            placeholder="Ej: 1234, Depto 5B"
                            className="w-full h-14 bg-white border-2 border-electric-blue/30 rounded-xl px-6 font-medium text-sm focus:border-electric-blue focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all"
                        />
                    </div>
                )}

                {/* Full Address (manual mode only) */}
                {!useGPS && (
                    <div className="col-span-2">
                        <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                            Dirección Completa *
                        </label>
                        <input
                            value={formData.houseNumber}
                            onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                            placeholder="Calle, número, departamento"
                            className="w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all"
                        />
                    </div>
                )}

                {/* City */}
                <div>
                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                        Ciudad {useGPS && gpsData && "(Auto-rellenado)"}
                    </label>
                    <input
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Ciudad"
                        disabled={useGPS && !!gpsData}
                        className={cn(
                            "w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all",
                            useGPS && gpsData && "bg-tech-green/10 border-tech-green/20 text-graphite font-semibold"
                        )}
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                        Código Postal {useGPS && gpsData && "(Auto-rellenado)"}
                    </label>
                    <input
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        placeholder="CP"
                        disabled={useGPS && !!gpsData}
                        className={cn(
                            "w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all",
                            useGPS && gpsData && "bg-tech-green/10 border-tech-green/20 text-graphite font-semibold"
                        )}
                    />
                </div>

                {/* Phone */}
                <div className="col-span-2">
                    <label className="text-sm font-semibold uppercase tracking-wide text-slate-deep/60 mb-3 block">
                        Teléfono de Contacto *
                    </label>
                    <input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Número de teléfono"
                        className="w-full h-14 bg-white border border-graphite/10 rounded-xl px-6 font-medium text-sm focus:border-electric-blue/30 focus:ring-4 focus:ring-electric-blue/10 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function PaymentStep() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                    <CreditCard size={12} className="text-electric-blue" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-electric-blue">Pago Seguro</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-graphite">Información de Pago</h2>
                <p className="text-sm text-slate-deep/60 font-medium">Ingresa los detalles de tu tarjeta de forma segura</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-graphite/10 shadow-subtle animate-in fade-in slide-in-from-bottom-4 duration-500">
                <PaymentElement
                    options={{
                        layout: "tabs",
                    }}
                />
            </div>

            <div className="p-6 bg-tech-green/10 border border-tech-green/20 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tech-green flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-graphite">Pago 100% Seguro</p>
                    <p className="text-xs text-slate-deep/60 font-medium leading-relaxed">Encriptación SSL y certificación ISO/IEC 27001 por Stripe</p>
                </div>
            </div>
        </div>
    );
}

function ReviewStep({ items, totalPrice, orderId }: { items: any[], totalPrice: number, orderId: string | null }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { clearCart } = useCartStore();

    const handleConfirmOrder = async () => {
        if (!stripe || !elements || !orderId) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success?orderId=${orderId}`,
            },
        });

        if (error) {
            console.error("Payment error:", error);
            setErrorMessage(error.message || "Ocurrió un error inesperado al procesar el pago.");
            setIsProcessing(false);
        } else {
            // Success usually redirects to return_url, but if not:
            clearCart();
        }
    };

    if (errorMessage) {
        return (
            <div className="space-y-8 py-8 text-center">
                <div className="w-32 h-32 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto border-2 border-red-500/20">
                    <AlertTriangle size={64} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-graphite leading-[0.9]">Error en el Pago</h2>
                    <p className="text-lg text-slate-deep/60 font-medium max-w-md mx-auto">{errorMessage}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-graphite text-white rounded-2xl font-bold uppercase tracking-wide text-sm"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-12 py-8">
            <div className="relative">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="w-32 h-32 bg-gradient-to-br from-electric-blue to-tech-green text-white rounded-3xl flex items-center justify-center mx-auto shadow-elevated"
                >
                    <ShoppingBag size={64} strokeWidth={2} />
                </motion.div>
            </div>

            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20">
                    <Package size={14} className="text-electric-blue" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-electric-blue">Resumen del Pedido</span>
                </div>
                <h2 className="text-6xl font-bold tracking-tight text-graphite leading-[0.9]">
                    Confirmar Pedido
                </h2>
                <p className="text-lg text-slate-deep/60 font-medium max-w-2xl mx-auto">
                    Revisa tu pedido antes de confirmar. Tu pago será procesado de forma segura vía Stripe.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto border-t border-b border-graphite/10 py-8">
                <div className="text-center space-y-2">
                    <span className="block text-sm uppercase tracking-wide font-semibold text-slate-deep/60">Productos</span>
                    <span className="text-5xl font-bold text-graphite">{items.length}</span>
                </div>
                <div className="text-center space-y-2">
                    <span className="block text-sm uppercase tracking-wide font-semibold text-slate-deep/60">Total</span>
                    <span className="text-5xl font-bold text-electric-blue">{formatCurrency(totalPrice)}</span>
                </div>
            </div>

            <div className="flex justify-center">
                <motion.button
                    onClick={handleConfirmOrder}
                    disabled={isProcessing || !stripe}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative min-w-[320px] h-16 bg-gradient-to-br from-electric-blue to-tech-green text-white rounded-2xl font-bold uppercase tracking-wide text-sm shadow-lg overflow-hidden group disabled:opacity-50"
                >
                    {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Procesando Pago...</span>
                        </div>
                    ) : (
                        <>
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    background: [
                                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
                                    ],
                                    backgroundPosition: ["-200%", "200%"]
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Zap size={18} />
                                Confirmar y Pagar
                            </span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
