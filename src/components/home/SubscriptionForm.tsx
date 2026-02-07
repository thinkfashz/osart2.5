"use client";

import { useState } from "react";
import { sanitizeString } from "@/lib/security";

export default function SubscriptionForm() {
    const [subscriberEmail, setSubscriberEmail] = useState("");

    return (
        <div className="flex items-center justify-center p-3 bg-slate-900/5 border border-slate-900/5 rounded-full max-w-xl w-full hover:border-celeste/30 transition-all shadow-inner">
            <input
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(sanitizeString(e.target.value))}
                placeholder="ID_DE_OPERADOR @ CELERIAL.NET"
                className="bg-transparent border-none outline-none flex-1 px-8 text-xs font-black uppercase tracking-[0.4em] text-slate-900 placeholder:text-slate-900/10"
            />
            <button className="bg-slate-900 text-white h-14 px-12 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-celeste hover:shadow-celeste-glow transition-all">
                ENLAZAR
            </button>
        </div>
    );
}
