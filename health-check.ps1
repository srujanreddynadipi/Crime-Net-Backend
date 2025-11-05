# CrimeNet - Quick Health Check Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CrimeNet Health Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
Write-Host "1. Checking Backend (localhost:8080)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/actuator/health" -TimeoutSec 3 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✓ Backend is RUNNING" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Backend is NOT RUNNING or not accessible" -ForegroundColor Red
    Write-Host "   → Start backend: cd backend && mvn spring-boot:run" -ForegroundColor Yellow
}

Write-Host ""

# Check if frontend is running
Write-Host "2. Checking Frontend (localhost:5173)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 3 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✓ Frontend is RUNNING" -ForegroundColor Green
    }
} catch {
    Write-Host "   ✗ Frontend is NOT RUNNING or not accessible" -ForegroundColor Red
    Write-Host "   → Start frontend: npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Check Node modules
Write-Host "3. Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "   ✗ node_modules NOT found" -ForegroundColor Red
    Write-Host "   → Run: npm install" -ForegroundColor Yellow
}

Write-Host ""

# Check important files
Write-Host "4. Checking Configuration Files..." -ForegroundColor Yellow

$files = @(
    @{Path="src/firebase.ts"; Name="Firebase Config"},
    @{Path="src/api/client.ts"; Name="API Client"},
    @{Path="src/contexts/AuthContext.jsx"; Name="Auth Context"},
    @{Path="backend/src/main/resources/application.properties"; Name="Backend Properties"}
)

foreach ($file in $files) {
    if (Test-Path $file.Path) {
        Write-Host "   ✓ $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $($file.Name) NOT found" -ForegroundColor Red
    }
}

Write-Host ""

# Check new API-integrated components
Write-Host "5. Checking Phase 2 Components..." -ForegroundColor Yellow

$components = @(
    "src/pages/user/QuickStatsAPI.jsx",
    "src/pages/user/ChatModuleAPI.jsx",
    "src/pages/user/MissingPersonsAPI.jsx",
    "src/pages/user/SafetyAlertsAPI.jsx",
    "src/pages/user/UserProfile.jsx",
    "src/pages/user/ReportCrimeAPI.jsx",
    "src/pages/user/MyCasesAPI.jsx",
    "src/pages/user/AnonymousTips.jsx",
    "src/pages/user/TrackTip.jsx",
    "src/pages/user/NotificationsCenter.jsx"
)

$found = 0
foreach ($component in $components) {
    if (Test-Path $component) {
        $found++
    }
}

Write-Host "   Found $found/10 Phase 2 components" -ForegroundColor $(if ($found -eq 10) { "Green" } else { "Yellow" })

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Quick Start Commands" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  cd backend && mvn spring-boot:run" -ForegroundColor White
Write-Host "Frontend: npm run dev" -ForegroundColor White
Write-Host "Test:     http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
