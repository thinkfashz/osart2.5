"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Shield, Brain, Trophy, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface Question {
    id: number;
    text: string;
    options: string[];
    answer: number;
    points: number;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "¿Cuál es la función principal de un condensador en un circuito electrónico?",
        options: ["Disipar calor", "Almacenar energía eléctrica", "Rectificar corriente AC", "Medir resistencia"],
        answer: 1,
        points: 50
    },
    {
        id: 2,
        text: "En un protocolo I2C, ¿qué significan las siglas SDA?",
        options: ["Serial Data Address", "Serial Digital Access", "Serial Data Line", "Standard Data Array"],
        answer: 2,
        points: 75
    },
    {
        id: 3,
        text: "¿Qué componente se utiliza para amplificar señales o actuar como interruptor?",
        options: ["Resistencia", "Diodo", "Transistor", "Inductor"],
        answer: 2,
        points: 60
    },
    {
        id: 4,
        text: "¿Cuál es la tensión nominal de una celda de batería LiPo cargada al 100%?",
        options: ["3.7V", "4.2V", "1.2V", "9V"],
        answer: 1,
        points: 80
    }
];

export default function ElectroGame() {
    const [gameState, setGameState] = useState<"idle" | "playing" | "gameOver" | "victory">("idle");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lives, setLives] = useState(3);
    const [xp, setXp] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [combo, setCombo] = useState(0);

    const startGame = () => {
        setGameState("playing");
        setCurrentQuestionIndex(0);
        setLives(3);
        setXp(0);
        setCombo(0);
    };

    const saveProgress = async (finalXp: number) => {
        if (!supabase) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            // Update profile XP
            const { data: profile } = await supabase
                .from('profiles')
                .select('xp')
                .eq('id', user.id)
                .single();

            if (profile) {
                await supabase
                    .from('profiles')
                    .update({ xp: (profile.xp || 0) + finalXp })
                    .eq('id', user.id);
            }

            // Record XP History
            await supabase
                .from('xp_history')
                .insert({
                    user_id: user.id,
                    amount: finalXp,
                    source: 'ElectroGame Validation'
                });

            // Log activity
            await supabase
                .from('activity_logs')
                .insert({
                    user_id: user.id,
                    action: 'complete_electrogame',
                    details: { xp: finalXp, questions: QUESTIONS.length }
                });

        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    const handleAnswer = (optionIndex: number) => {
        if (feedback) return;

        const isCorrect = optionIndex === QUESTIONS[currentQuestionIndex].answer;

        if (isCorrect) {
            setFeedback("correct");
            const pointsGained = QUESTIONS[currentQuestionIndex].points + (combo * 10);
            const newXp = xp + pointsGained;
            setXp(newXp);
            setCombo(prev => prev + 1);

            setTimeout(() => {
                setFeedback(null);
                if (currentQuestionIndex + 1 < QUESTIONS.length) {
                    setCurrentQuestionIndex(prev => prev + 1);
                } else {
                    setGameState("victory");
                    saveProgress(newXp);
                }
            }, 1000);
        } else {
            setFeedback("incorrect");
            setLives(prev => prev - 1);
            setCombo(0);

            setTimeout(() => {
                const currentLives = lives - 1;
                setFeedback(null);
                if (currentLives <= 0) {
                    setGameState("gameOver");
                    saveProgress(xp);
                }
            }, 1000);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] font-mono">
            {/* Cyberpunk Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50" />

            {/* HUD Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-40 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Status del Sistema</span>
                    <div className="flex gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Heart
                                key={i}
                                size={18}
                                className={cn(
                                    "transition-all duration-500",
                                    i < lives ? "text-accent fill-accent animate-pulse" : "text-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">XP Acumulado</span>
                    <div className="text-3xl font-black italic tracking-tighter text-white">
                        {xp.toString().padStart(5, '0')}
                    </div>
                </div>
            </div>

            {/* Game Content */}
            <div className="h-full flex flex-col items-center justify-center p-12 text-center relative z-10">
                <AnimatePresence mode="wait">
                    {gameState === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="space-y-8"
                        >
                            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto border border-accent/40 shadow-[0_0_30px_rgba(230,0,0,0.3)]">
                                <Zap size={40} className="text-accent animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">ElectroGame</h1>
                                <p className="text-white/60 uppercase tracking-[0.2em] text-xs font-bold">Inicia el protocolo de validación técnica</p>
                            </div>
                            <button
                                onClick={startGame}
                                className="arobix-button bg-white text-black hover:bg-accent hover:text-white transition-all scale-110"
                            >
                                INICIAR PROTOCOLO
                            </button>
                        </motion.div>
                    )}

                    {gameState === "playing" && (
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-2xl space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-px bg-white/10 flex-1" />
                                    <span className="text-[10px] uppercase tracking-widest font-black text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                                        PREGUNTA {currentQuestionIndex + 1}
                                    </span>
                                    <div className="h-px bg-white/10 flex-1" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-white leading-relaxed">
                                    {QUESTIONS[currentQuestionIndex].text}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {QUESTIONS[currentQuestionIndex].options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        className={cn(
                                            "p-6 rounded-2xl border-2 transition-all duration-300 text-left group relative overflow-hidden",
                                            feedback === null && "border-white/10 hover:border-white hover:bg-white/5",
                                            feedback === "correct" && i === QUESTIONS[currentQuestionIndex].answer ? "border-green-500 bg-green-500/10 text-green-500" : "",
                                            feedback === "incorrect" && i === QUESTIONS[currentQuestionIndex].answer ? "border-green-500 bg-green-500/10" : "",
                                            feedback === "incorrect" && i !== QUESTIONS[currentQuestionIndex].answer ? "border-red-500/20 opacity-50" : ""
                                        )}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <span className="text-xs font-black text-white/20 group-hover:text-white/60 transition-colors uppercase">0{i + 1}</span>
                                            <span className="text-sm font-bold">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {gameState === "gameOver" && (
                        <motion.div
                            key="gameOver"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <AlertTriangle size={64} className="text-accent mx-auto animate-bounce" />
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black tracking-tighter uppercase text-accent italic">Fallo de Sistema</h2>
                                <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">Protocolo interrumpido. Vidas agotadas.</p>
                            </div>
                            <div className="text-6xl font-black text-white italic">{xp} XP</div>
                            <button
                                onClick={startGame}
                                className="arobix-button-outline border-white text-white hover:bg-white hover:text-black"
                            >
                                <RotateCcw size={18} /> REINTENTAR
                            </button>
                        </motion.div>
                    )}

                    {gameState === "victory" && (
                        <motion.div
                            key="victory"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-8"
                        >
                            <Trophy size={64} className="text-yellow-500 mx-auto" />
                            <div className="space-y-2">
                                <h2 className="text-4xl font-black tracking-tighter uppercase text-white italic">Validación Exitosa</h2>
                                <p className="text-green-500 uppercase tracking-[0.2em] text-xs font-bold font-black">Rango de Ingeniero Incremetado</p>
                            </div>
                            <div className="text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                {xp} XP
                            </div>
                            <button
                                onClick={startGame}
                                className="arobix-button bg-white text-black"
                            >
                                CONTINUAR AVENTURA
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* HUD Footer Decor */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end z-40 opacity-40">
                <div className="text-[8px] uppercase tracking-[0.5em] font-bold">OSART_ELITE_V1.0_PROT_GAMIF</div>
                <div className="flex gap-1 h-2 items-end">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-1 bg-white" style={{ height: `${20 + (i * 7) % 80}%` }} />
                    ))}
                </div>
            </div>

            {/* Visual sound effects (Overlay flashes) */}
            <AnimatePresence>
                {feedback === "correct" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-green-500 z-30 pointer-events-none"
                    />
                )}
                {feedback === "incorrect" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-red-500 z-30 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
