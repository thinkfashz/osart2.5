import { createTestUsers } from '../../../../scripts/create-test-users';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Esta ruta usa el script existente para crear los 2 usuarios básicos (Ana y Carlos)
        await createTestUsers();
        return NextResponse.json({ message: "Usuarios básicos creados correctamente." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
