# Guía de Configuración de Proveedores de Pago

Esta guía te ayudará a configurar **Stripe**, **MercadoPago** y **PayPal** para tu aplicación OSART.

---

## 📦 Instalación de Dependencias

### Paso 1: Instalar todas las dependencias

Ejecuta en tu terminal (CMD como administrador):

```bash
npm install stripe @stripe/stripe-js mercadopago @paypal/checkout-server-sdk
```

> **Nota:** Si tienes problemas con PowerShell, ejecuta primero:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

---

## 💳 Configuración de Stripe

### 1. Crear Cuenta

1. Ve a [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Crea una cuenta gratuita
3. Activa el "Modo de Prueba" (Test Mode)

### 2. Obtener API Keys

1. En el dashboard, ve a **Developers → API keys**
2. Copia las siguientes claves:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### 3. Configurar Webhook

1. Ve a **Developers → Webhooks**
2. Click en "Add endpoint"
3. URL: `https://tu-dominio.com/api/webhooks/stripe`
4. Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.processing`
5. Copia el "Signing secret": `whsec_...`

### 4. Variables de Entorno

```env
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA
STRIPE_WEBHOOK_SECRET=whsec_TU_WEBHOOK_SECRET
```

### Tarjetas de Prueba

- **Pago Exitoso:** `4242 4242 4242 4242`
- **Pago Rechazado:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0025 0000 3155`

[Más tarjetas de prueba](https://stripe.com/docs/testing)

---

## 🇦🇷 Configuración de MercadoPago

### 1. Crear Cuenta

1. Ve a [https://www.mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
2. Crea una cuenta o inicia sesión
3. Ve a "Tus aplicaciones" → "Crear aplicación"

### 2. Obtener Credenciales

1. En tu aplicación, ve a **Credenciales**
2. Selecciona "Credenciales de prueba"
3. Copia:
   - **Access Token**: `APP_USR-...`
   - **Public Key**: `APP_USR-...`

### 3. Variables de Entorno

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-TU_ACCESS_TOKEN
MERCADOPAGO_PUBLIC_KEY=APP_USR-TU_PUBLIC_KEY
```

### Tarjetas de Prueba (Argentina)

- **Visa:** `4509 9535 6623 3704`
- **Mastercard:** `5031 7557 3453 0604`
- **Nombre:** APRO (aprobada) o OTRA (rechazada)
- **CVV:** 123
- **Fecha:** Cualquier fecha futura

[Más tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)

---

## 🅿️ Configuración de PayPal

### 1. Crear Cuenta de Desarrollador

1. Ve a [https://developer.paypal.com](https://developer.paypal.com)
2. Inicia sesión o crea una cuenta
3. Ve a **Dashboard → My Apps & Credentials**

### 2. Crear Aplicación

1. Click en "Create App"
2. Nombre: "OSART Store"
3. Selecciona "Merchant" como tipo de cuenta

### 3. Obtener Credenciales

En la sección **Sandbox**:
- **Client ID**: `AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx`
- **Secret**: `EXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx`

### 4. Variables de Entorno

```env
PAYPAL_CLIENT_ID=TU_CLIENT_ID
PAYPAL_CLIENT_SECRET=TU_CLIENT_SECRET
```

### Cuentas de Prueba

1. Ve a **Sandbox → Accounts**
2. Usa las cuentas de prueba generadas automáticamente:
   - **Personal Account** (comprador)
   - **Business Account** (vendedor)

[Documentación de Sandbox](https://developer.paypal.com/tools/sandbox/)

---

## 🎛️ Panel de Configuración en el Dashboard

### Acceder al Panel

1. Inicia sesión como administrador
2. Ve a `/admin`
3. Desplázate hasta "Proveedores de Pago"

### Características del Panel

✅ **Monitoreo en Tiempo Real:**
- Barra de estado verde = Conectado
- Barra de estado roja = Desconectado
- Auto-refresh cada 30 segundos

✅ **Configuración Visual:**
- Click en "Configurar Claves API" para expandir
- Muestra las variables de entorno necesarias
- Instrucciones paso a paso

✅ **Verificación Automática:**
- Verifica conexión con cada proveedor
- Muestra errores específicos si hay problemas
- Timestamp de última verificación

---

## 🔄 Flujo de Configuración Completo

### 1. Instalar Dependencias

```bash
npm install stripe @stripe/stripe-js mercadopago @paypal/checkout-server-sdk
```

### 2. Configurar Variables de Entorno

Abre `.env.local` y agrega todas las claves:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...
MERCADOPAGO_PUBLIC_KEY=APP_USR-...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
```

### 3. Reiniciar Servidor

```bash
# Detener servidor (Ctrl+C)
npm run dev
```

### 4. Verificar Conexión

1. Ve a `/admin`
2. Verifica que las barras de estado estén en verde
3. Si hay errores, revisa los mensajes específicos

---

## 🧪 Probar Pagos

### Stripe

1. Ir a checkout
2. Seleccionar "Tarjeta de Crédito/Débito"
3. Usar tarjeta: `4242 4242 4242 4242`
4. Verificar que el pago se confirme

### MercadoPago

1. Ir a checkout
2. Seleccionar "MercadoPago"
3. Usar tarjeta: `4509 9535 6623 3704`
4. Nombre: APRO
5. Verificar confirmación

### PayPal

1. Ir a checkout
2. Seleccionar "PayPal"
3. Usar cuenta de prueba de Sandbox
4. Verificar confirmación

---

## 🔐 Seguridad

### ⚠️ IMPORTANTE

- ❌ **NUNCA** subas `.env.local` a Git
- ❌ **NUNCA** compartas tus claves secretas
- ✅ Usa claves de prueba en desarrollo
- ✅ Usa claves de producción solo en producción
- ✅ Rota las claves regularmente

### Producción

Cuando vayas a producción:

1. **Stripe:** Cambia a claves `pk_live_...` y `sk_live_...`
2. **MercadoPago:** Cambia a "Credenciales de producción"
3. **PayPal:** Cambia a "Live" en lugar de "Sandbox"

---

## 🛠️ Solución de Problemas

### Error: "Cannot find module 'stripe'"

**Solución:**
```bash
npm install stripe @stripe/stripe-js
```

### Error: "API key no configurada"

**Solución:**
1. Verifica que `.env.local` tiene las claves
2. Reinicia el servidor
3. Asegúrate de que no hay espacios extra

### Barra de Estado Roja

**Solución:**
1. Click en "Configurar Claves API"
2. Revisa el mensaje de error específico
3. Verifica que las claves sean correctas
4. Click en "Actualizar" para re-verificar

### Webhooks no Funcionan

**Solución:**
1. Usa Stripe CLI para desarrollo local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
2. Copia el webhook secret mostrado
3. Agrégalo a `.env.local`

---

## 📚 Recursos

### Stripe
- [Documentación](https://stripe.com/docs)
- [Dashboard](https://dashboard.stripe.com)
- [Tarjetas de Prueba](https://stripe.com/docs/testing)

### MercadoPago
- [Documentación](https://www.mercadopago.com.ar/developers)
- [Panel de Desarrolladores](https://www.mercadopago.com.ar/developers/panel)
- [Tarjetas de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)

### PayPal
- [Documentación](https://developer.paypal.com/docs)
- [Dashboard](https://developer.paypal.com/dashboard)
- [Sandbox](https://developer.paypal.com/tools/sandbox/)

---

## ✅ Checklist de Configuración

- [ ] Dependencias instaladas
- [ ] Cuenta de Stripe creada
- [ ] Claves de Stripe agregadas a `.env.local`
- [ ] Cuenta de MercadoPago creada
- [ ] Claves de MercadoPago agregadas a `.env.local`
- [ ] Cuenta de PayPal Developer creada
- [ ] Claves de PayPal agregadas a `.env.local`
- [ ] Servidor reiniciado
- [ ] Panel de admin muestra barras verdes
- [ ] Pago de prueba con Stripe exitoso
- [ ] Pago de prueba con MercadoPago exitoso
- [ ] Pago de prueba con PayPal exitoso

---

¡Listo! Ahora tienes 3 proveedores de pago configurados y monitoreados en tiempo real. 🎉
