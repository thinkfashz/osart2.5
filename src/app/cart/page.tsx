"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/checkout");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
