import { createClient } from '@supabase/supabase-js';
import { dummyUsers } from '@/data/dummyUsers';
import { NextResponse } from 'next/server';

export async function POST() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        return NextResponse.json(
            { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor." },
            { status: 500 }
        );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    try {
        console.log('🚀 Iniciando inyección de usuarios de ejemplo...');

        for (const user of dummyUsers) {
            // 1. Intentar crear en Auth (esto puede fallar si ya existen)
            const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email: user.email!,
                password: 'OsartDemo2026!',
                email_confirm: true,
                user_metadata: { full_name: user.full_name }
            });

            if (authError) {
                console.log(`⚠️ Usuario ${user.email} ya existe o error en Auth:`, authError.message);

                // Si ya existe, intentar encontrar su ID
                const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
                const found = existingUser.users.find(u => u.email === user.email);

                if (found) {
                    // 2. Actualizar perfil existente
                    await supabaseAdmin
                        .from('profiles')
                        .update({
                            full_name: user.full_name,
                            role: user.role,
                            knowledge_points: user.knowledge_points
                        })
                        .eq('id', found.id);
                }
            } else if (authUser.user) {
                // 2. Actualizar perfil recién creado (el trigger lo crea, nosotros le damos los datos adicionales)
                await supabaseAdmin
                    .from('profiles')
                    .update({
                        full_name: user.full_name,
                        role: user.role,
                        knowledge_points: user.knowledge_points
                    })
                    .eq('id', authUser.user.id);
            }
        }

        return NextResponse.json({ message: "Protocolo de generación completado exitosamente." });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
