'use client';

import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 text-center"
        >
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full" />
                <Icon className="w-20 h-20 text-gold relative z-10" strokeWidth={1} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 max-w-xs mb-8">{description}</p>
            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="bg-gold text-charcoal hover:bg-gold/90 font-bold px-8"
                >
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
}
