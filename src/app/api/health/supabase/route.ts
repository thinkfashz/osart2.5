import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ status: "config_error", error: "Missing env vars" }, { status: 500 });
    }

    try {
        const start = performance.now();
        const supabase = createClient(supabaseUrl, supabaseKey);

        // We use a light query. 'products' table usually exists in e-commerce.
        // head: true means we only want the count, not data.
        const { error } = await supabase.from("products").select("*", { count: 'exact', head: true });

        const duration = performance.now() - start;

        if (error) {
            // Even if table doesn't exist, the connection to Supabase was successful if we got a Postgres error.
            // But we'll report it.
            return NextResponse.json({
                status: "connected_with_error",
                message: error.message,
                latency: Math.round(duration),
                url: supabaseUrl
            });
        }

        return NextResponse.json({
            status: "connected",
            latency: Math.round(duration),
            url: supabaseUrl
        });
    } catch (error: any) {
        return NextResponse.json({ status: "disconnected", error: error.message }, { status: 500 });
    }
}
