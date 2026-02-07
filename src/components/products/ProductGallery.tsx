"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    // Fallback if no images provided
    const displayImages = images.length > 0 ? images : ["/placeholder.png"];

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-6 h-full">
            {/* Thumbnails - Premium side bar */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {displayImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative w-20 h-20 border rounded-2xl overflow-hidden flex-shrink-0 bg-secondary/10 luxury-transition",
                            selectedImage === index
                                ? "border-accent ring-1 ring-accent/30 shadow-sm"
                                : "border-secondary/40 hover:border-accent/40 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${title} - Vista ${index + 1}`}
                            fill
                            className="object-contain p-2"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-1 aspect-square bg-secondary/5 rounded-3xl items-center justify-center flex overflow-hidden group">
                <div className="relative w-full h-full p-12 transition-transform duration-1000 ease-out group-hover:scale-105">
                    <Image
                        src={displayImages[selectedImage]}
                        alt={title}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Subtle Decorative Edge */}
                <div className="absolute inset-0 border-[1.5rem] border-white/5 pointer-events-none" />
            </div>
        </div>
    );
}
