"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    currentImageUrl?: string;
    className?: string;
    bucket?: string;
    folder?: string;
}

export default function ImageUpload({
    onUploadSuccess,
    currentImageUrl,
    className,
    bucket = "product-images",
    folder = "products"
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            setError("Por favor selecciona un archivo de imagen válido.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("La imagen es demasiado grande. Máximo 5MB.");
            return;
        }

        setError(null);
        setIsUploading(true);
        setUploadProgress(10);

        try {
            const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
            const filePath = `${folder}/${fileName}`;

            setUploadProgress(30);

            // Upload to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            setUploadProgress(80);

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            setUploadProgress(100);

            setTimeout(() => {
                setPreviewUrl(publicUrl);
                onUploadSuccess(publicUrl);
                setIsUploading(false);
                setUploadProgress(0);
            }, 500);

        } catch (err: any) {
            console.error("Upload error:", err);
            setError("Error al subir la imagen index. " + err.message);
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setPreviewUrl(null);
        onUploadSuccess("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={cn(
                    "relative w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group",
                    previewUrl ? "border-electric-blue/30" : "border-white/10 hover:border-electric-blue/30 hover:bg-white/[0.02]",
                    isUploading && "cursor-wait opacity-80"
                )}
            >
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                />

                <AnimatePresence mode="wait">
                    {previewUrl ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-electric-blue transition-colors"
                                >
                                    <Upload size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage();
                                    }}
                                    className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-4 px-6"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-electric-blue/10 transition-colors border border-white/5 group-hover:border-electric-blue/30 luxury-transition">
                                <Upload size={32} className="text-white/20 group-hover:text-electric-blue" />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">SUBIR_IMAGEN_NODO</p>
                                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 italic">JPG, PNG o WEBP (Máx. 5MB)</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Upload Progress Overlay */}
                <AnimatePresence>
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-midnight/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-20"
                        >
                            <div className="relative">
                                <Loader2 className="animate-spin text-electric-blue" size={48} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[10px] font-black text-white">{uploadProgress}%</span>
                                </div>
                            </div>
                            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-electric-blue"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-electric-blue animate-pulse">Sincronizando_Recurso...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4"
                    >
                        <AlertCircle className="text-red-500" size={18} />
                        <p className="text-xs font-black uppercase tracking-widest text-red-500">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success State Hint */}
            {previewUrl && !isUploading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 justify-center"
                >
                    <CheckCircle2 size={14} className="text-tech-green" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-tech-green/60 italic">Imagen_Sincronizada_Exitosamente</span>
                </motion.div>
            )}
        </div>
    );
}
