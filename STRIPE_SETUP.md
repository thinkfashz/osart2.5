# Guía de Configuración de Stripe

## 📋 Pasos para Configurar Stripe

### 1. Instalar Dependencias

Ejecuta en tu terminal (CMD o PowerShell como administrador):

```bash
npm install stripe @stripe/stripe-js
```

> **Nota:** Si tienes problemas con PowerShell, ejecuta primero:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

### 2. Crear Cuenta de Stripe

1. Ve a [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Crea una cuenta gratuita
3. Activa el "Modo de Prueba" (Test Mode)

### 3. Obtener API Keys

1. En el dashboard de Stripe, ve a **Developers → API keys**
2. Copia las siguientes claves:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`)

### 4. Configurar Variables de Entorno

Abre tu archivo `.env.local` y reemplaza los placeholders:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA_REAL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA_REAL
STRIPE_WEBHOOK_SECRET=whsec_TU_WEBHOOK_SECRET  # Por ahora déjalo así
```

### 5. Reiniciar Servidor de Desarrollo

Detén el servidor (`Ctrl+C`) y vuelve a ejecutar:

```bash
npm run dev
```

---

## 🔗 Configurar Webhooks (Opcional para Desarrollo Local)

### Opción A: Usar Stripe CLI (Recomendado)

1. **Instalar Stripe CLI:**
   - Descarga desde [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
   - O con Chocolatey: `choco install stripe-cli`

2. **Autenticar:**
   ```bash
   stripe login
   ```

3. **Escuchar webhooks localmente:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copiar el webhook secret:**
   - El CLI mostrará algo como `whsec_...`
   - Cópialo y agrégalo a `.env.local` como `STRIPE_WEBHOOK_SECRET`

### Opción B: Usar ngrok (Alternativa)

1. **Instalar ngrok:**
   - Descarga desde [https://ngrok.com/download](https://ngrok.com/download)

2. **Exponer tu servidor local:**
   ```bash
   ngrok http 3000
   ```

3. **Configurar webhook en Stripe Dashboard:**
   - Ve a **Developers → Webhooks**
   - Click en "Add endpoint"
   - URL: `https://TU-URL-NGROK.ngrok.io/api/webhooks/stripe`
   - Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.processing`
   - Copia el "Signing secret" a `.env.local`

---

## 🧪 Probar Pagos

### Tarjetas de Prueba de Stripe

Usa estas tarjetas en modo de prueba:

**Pago Exitoso:**
- Número: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura
- CVC: Cualquier 3 dígitos
- ZIP: Cualquier 5 dígitos

**Pago Rechazado:**
- Número: `4000 0000 0000 0002`

**Requiere Autenticación (3D Secure):**
- Número: `4000 0025 0000 3155`

**Más tarjetas:** [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## 🔧 Solución de Problemas

### Error: "Cannot find module 'stripe'"

**Solución:**
1. Verifica que las dependencias se instalaron:
   ```bash
   npm list stripe
   ```
2. Si no aparece, instala manualmente:
   ```bash
   npm install stripe @stripe/stripe-js
   ```
3. Reinicia el servidor

### Error: "STRIPE_SECRET_KEY no está configurado"

**Solución:**
1. Verifica que `.env.local` tiene las claves correctas
2. Reinicia el servidor de desarrollo
3. Asegúrate de que no hay espacios extra en las claves

### Webhooks no funcionan

**Solución:**
1. Verifica que `STRIPE_WEBHOOK_SECRET` está configurado
2. Si usas Stripe CLI, asegúrate de que está corriendo
3. Revisa los logs del servidor para ver errores

---

## 📝 Próximos Pasos

Una vez configurado Stripe:

1. ✅ Probar crear una orden
2. ✅ Probar pago con tarjeta de prueba
3. ✅ Verificar que el webhook confirma el pago
4. ✅ Verificar que el stock se reduce automáticamente

---

## 🔐 Seguridad

> ⚠️ **IMPORTANTE:** Nunca compartas tus claves secretas de Stripe
> ⚠️ **NUNCA** subas `.env.local` a Git
> ⚠️ En producción, usa las claves de producción (`pk_live_...` y `sk_live_...`)

---

## 📚 Recursos

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe Dashboard](https://dashboard.stripe.com)
- [Tarjetas de Prueba](https://stripe.com/docs/testing)
- [Webhooks](https://stripe.com/docs/webhooks)
