"use client";

import { useState } from "react";
import { sanitizeString } from "@/lib/security";

export default function SubscriptionForm() {
    const [subscriberEmail, setSubscriberEmail] = useState("");

    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-zinc-900 border border-zinc-800 p-1 max-w-2xl w-full group focus-within:border-cyan-400/50 transition-all">
            <input
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(sanitizeString(e.target.value))}
                placeholder="OPERATOR_SIGNAL_ID @ OSART.IO"
                className="bg-zinc-950 border-none outline-none flex-1 py-4 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-100 placeholder:text-zinc-800 min-w-0 w-full"
            />
            <button className="osart-button w-full md:w-auto h-14 px-12 font-black text-[11px] uppercase tracking-[0.2em]">
                ENLAZAR
            </button>
        </div>
    );
}
