/**
 * Script para crear usuarios de prueba en Supabase Auth
 * 
 * USUARIOS DE PRUEBA:
 * 
 * 1. Carlos Mendez (Usuario Regular)
 *    Email: carlos.mendez@osart.com
 *    Password: OsartDemo2026!
 *    Role: user
 * 
 * 2. Ana Rodriguez (Administrador)
 *    Email: ana.rodriguez@osart.com
 *    Password: AdminOsart2026!
 *    Role: admin
 * 
 * INSTRUCCIONES:
 * 
 * Opción 1 - Desde la aplicación Next.js (Recomendado):
 * 1. Ir a http://localhost:3000/auth/signup
 * 2. Registrar cada usuario manualmente con los datos de arriba
 * 3. Los perfiles se crearán automáticamente por el trigger de Supabase
 * 
 * Opción 2 - Desde Supabase Dashboard:
 * 1. Ir a: https://supabase.com/dashboard/project/bplifywjbhtwzcplxksg/auth/users
 * 2. Click en "Add user" > "Create new user"
 * 3. Ingresar email y contraseña para cada usuario
 * 4. Marcar "Auto Confirm User"
 * 
 * Opción 3 - Ejecutar este código desde una ruta API de Next.js:
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null as any;

async function createTestUsers() {
    if (!supabaseAdmin) {
        console.error('❌ Supabase admin client not initialized. Check environment variables.');
        return;
    }
    console.log('🚀 Creando usuarios de prueba para osart...\n');

    // Usuario 1: Carlos Mendez (Regular)
    const { data: user1, error: error1 } = await supabaseAdmin.auth.admin.createUser({
        email: 'carlos.mendez@osart.com',
        password: 'OsartDemo2026!',
        email_confirm: true,
        user_metadata: {
            full_name: 'Carlos Mendez'
        }
    });

    if (error1) {
        console.error('❌ Error creando usuario 1:', error1.message);
    } else {
        console.log('✅ Usuario creado: Carlos Mendez');
        console.log('   Email: carlos.mendez@osart.com');
        console.log('   Password: OsartDemo2026!');
        console.log('   ID:', user1.user?.id);

        // Actualizar perfil con rol
        if (user1.user) {
            await supabaseAdmin
                .from('profiles')
                .update({
                    full_name: 'Carlos Mendez',
                    role: 'user',
                    knowledge_points: 150 // Algunos puntos iniciales
                })
                .eq('id', user1.user.id);
        }
    }

    console.log('');

    // Usuario 2: Ana Rodriguez (Admin)
    const { data: user2, error: error2 } = await supabaseAdmin.auth.admin.createUser({
        email: 'ana.rodriguez@osart.com',
        password: 'AdminOsart2026!',
        email_confirm: true,
        user_metadata: {
            full_name: 'Ana Rodriguez'
        }
    });

    if (error2) {
        console.error('❌ Error creando usuario 2:', error2.message);
    } else {
        console.log('✅ Usuario creado: Ana Rodriguez');
        console.log('   Email: ana.rodriguez@osart.com');
        console.log('   Password: AdminOsart2026!');
        console.log('   ID:', user2.user?.id);

        // Actualizar perfil con rol admin
        if (user2.user) {
            await supabaseAdmin
                .from('profiles')
                .update({
                    full_name: 'Ana Rodriguez',
                    role: 'admin',
                    knowledge_points: 850 // Puntos de administrador experto
                })
                .eq('id', user2.user.id);
        }
    }

    console.log('\n✨ Proceso completado!\n');
    console.log('📋 RESUMEN DE USUARIOS:');
    console.log('========================');
    console.log('1. Carlos Mendez - carlos.mendez@osart.com (OsartDemo2026!)');
    console.log('2. Ana Rodriguez - ana.rodriguez@osart.com (AdminOsart2026!)');
    console.log('');
    console.log('🔑 Puedes iniciar sesión en: http://localhost:3000/auth/signin');
}

// Para ejecutar desde una API route de Next.js:
// export default async function handler(req: any, res: any) {
//   await createTestUsers();
//   res.status(200).json({ message: 'Usuarios creados' });
// }

// Para ejecutar directamente (requiere ts-node):
// createTestUsers().catch(console.error);

export { createTestUsers };
