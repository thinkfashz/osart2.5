"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AuthModal from "./AuthModal";
import { User, LogOut, Shield, Zap, LogIn } from "lucide-react";
import Link from "next/link";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function AuthButton() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const { data } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                setProfile(data);
            }
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                const { data } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", currentUser.id)
                    .single();
                setProfile(data);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
    };

    if (loading) return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;

    if (user) {
        return (
            <div className="relative group">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 pl-2 pr-6 py-1.5 rounded-full hover:bg-white/10 hover:border-accent luxury-transition"
                >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent/20 p-0.5">
                        <img
                            src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + (user.user_metadata?.full_name || user.email)}
                            alt={user.user_metadata?.full_name || ""}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="text-left hidden md:block">
                        <div className="text-[10px] font-black uppercase tracking-tight truncate max-w-[80px]">{user.user_metadata?.full_name || user.email?.split('@')[0]}</div>
                        <div className="flex items-center gap-1.5">
                            <Zap size={10} className="text-accent" />
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{profile?.xp || 0} XP</span>
                        </div>
                    </div>
                </button>

                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-4 w-64 bg-black border border-white/10 rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 space-y-4"
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className="space-y-1">
                            <div className="text-xs font-black uppercase tracking-widest text-white/20">Rango Actual</div>
                            <div className="text-sm font-black italic uppercase tracking-tight text-white">
                                {profile?.role === 'admin' ? 'Administrador Élite' : 'Especialista Junior'}
                            </div>
                        </div>

                        <div className="h-[1px] bg-white/5 w-full" />

                        <div className="space-y-2">
                            {profile?.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white luxury-transition"
                                >
                                    <Shield size={14} /> Panel Administrativo
                                </Link>
                            )}
                            <Link
                                href="/profile"
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black luxury-transition"
                            >
                                <User size={14} /> Mi Perfil Elite
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white luxury-transition"
                            >
                                <LogOut size={14} /> Desconectar Protocolo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 bg-black text-white border border-white/10 px-6 py-3 rounded-full hover:bg-accent hover:scale-105 luxury-transition group"
            >
                <LogIn size={18} className="group-hover:translate-x-1 luxury-transition" />
                <span className="text-[10px] font-black uppercase tracking-widest">Identificarse</span>
            </button>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
