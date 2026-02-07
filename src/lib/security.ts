import { z } from "zod";

/**
 * Filtra y sanitiza strings para prevenir ataques XSS básicos.
 * Elimina etiquetas HTML y caracteres potencialmente peligrosos de forma más robusta.
 */
export const sanitizeString = (str: string): string => {
    if (!str) return "";
    return str
        .replace(/<[^>]*>?/gm, "") // Elimina etiquetas HTML
        .replace(/[&<>"'/\\`=]/g, (m) => {
            const map: Record<string, string> = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "\\": "&#x5C;",
                "`": "&#x60;",
                "=": "&#x3D;",
            };
            return map[m];
        })
        .trim();
};

/**
 * Esquema de validación para entradas de búsqueda.
 */
export const searchSchema = z.object({
    query: z.string().max(100).transform((val) => sanitizeString(val)).optional().or(z.literal("")),
});

/**
 * Esquema de validación para autenticación (Login/Signup).
 */
export const authSchema = z.object({
    email: z.string().email({ message: "Email inválido" }).max(255),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(100)
        .regex(/[A-Z]/, { message: "Debe incluir una mayúscula" })
        .regex(/[0-9]/, { message: "Debe incluir un número" })
        .regex(/[^A-Za-z0-9]/, { message: "Debe incluir un carácter especial" }),
});

/**
 * Esquema para nombres y perfiles.
 */
export const profileSchema = z.object({
    fullName: z.string().min(2).max(100).transform((val) => sanitizeString(val)),
});

/**
 * Wrapper de seguridad para manejar errores sin filtrar información sensible (leaks).
 */
export const safeAction = async <T>(
    callback: () => Promise<T>,
    fallbackMessage = "Ocurrió un error en el sistema. Por favor, intente más tarde."
): Promise<{ data: T | null; error: string | null }> => {
    try {
        const result = await callback();
        return { data: result, error: null };
    } catch (err: any) {
        if (process.env.NODE_ENV === "development") {
            console.error("[Security Leak Prevention]:", {
                message: err.message,
                stack: err.stack,
                details: err.details,
                hint: err.hint,
                code: err.code,
                error: err
            });
        }
        // Ocultamos el error real (SQL, Supabase, etc) y devolvemos un mensaje seguro.
        return { data: null, error: fallbackMessage };
    }
};
