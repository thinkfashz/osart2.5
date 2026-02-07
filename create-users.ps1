# Script para crear usuarios de prueba
# Ejecutar: .\create-users.ps1

$url = "http://localhost:3001/api/create-test-users"

Write-Host "🚀 Creando usuarios de prueba en osart..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -ContentType "application/json"
    
    Write-Host "✅ Respuesta del servidor:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    Write-Host ""
    Write-Host "📋 Credenciales de prueba:" -ForegroundColor Yellow
    Write-Host "1. carlos.mendez@osart.com / OsartDemo2026! (Usuario)" -ForegroundColor White
    Write-Host "2. ana.rodriguez@osart.com / AdminOsart2026! (Admin)" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Probar login en: http://localhost:3001/auth/login" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Asegúrate de que:" -ForegroundColor Yellow
    Write-Host " - El servidor dev esté corriendo (npm run dev)" -ForegroundColor White
    Write-Host " - SUPABASE_SERVICE_ROLE_KEY esté en .env.local" -ForegroundColor White
}
