"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <div key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center text-white/20">
                        <MoreHorizontal size={14} />
                    </div>
                );
            }

            const isSelected = currentPage === page;

            return (
                <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={cn(
                        "w-10 h-10 rounded-xl text-[11px] font-black transition-all luxury-transition flex items-center justify-center border",
                        isSelected
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-110 italic"
                            : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                    )}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className={cn("flex items-center justify-center gap-3 py-10", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 transition-all luxury-transition hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed",
                )}
            >
                <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-2">
                {renderPageNumbers()}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 transition-all luxury-transition hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed",
                )}
            >
                <ChevronRight size={20} strokeWidth={2.5} />
            </button>
        </div>
    );
}
