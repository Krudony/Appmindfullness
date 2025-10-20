# Install AppMinefullness on connected Android device
# Run this after wireless pairing is complete

Write-Host "=== AppMinefullness Installation ===" -ForegroundColor Cyan
Write-Host ""

# Check ADB
$adbPath = "C:\platform-tools\adb.exe"
if (-not (Test-Path $adbPath)) {
    Write-Host "ERROR: ADB not found" -ForegroundColor Red
    exit 1
}

# Check connected devices
Write-Host "Checking connected devices..." -ForegroundColor Yellow
& $adbPath devices
Write-Host ""

$devices = & $adbPath devices | Select-String "device$"
if ($devices.Count -eq 0) {
    Write-Host "ERROR: No device connected" -ForegroundColor Red
    Write-Host "Please run wireless_debug.ps1 first to pair your device" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Device connected" -ForegroundColor Green
Write-Host ""

# Build the app
Write-Host "Building AppMinefullness..." -ForegroundColor Yellow
Write-Host ""

$gradlew = ".\gradlew.bat"
if (-not (Test-Path $gradlew)) {
    Write-Host "ERROR: gradlew.bat not found" -ForegroundColor Red
    exit 1
}

& $gradlew assembleDebug

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✓ Build successful" -ForegroundColor Green
Write-Host ""

# Install the app
Write-Host "Installing app on device..." -ForegroundColor Yellow
$apkPath = "app\build\outputs\apk\debug\app-debug.apk"

if (-not (Test-Path $apkPath)) {
    Write-Host "ERROR: APK not found at $apkPath" -ForegroundColor Red
    exit 1
}

& $adbPath install -r $apkPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ App installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now open 'AppMinefullness' on your phone" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "ERROR: Installation failed" -ForegroundColor Red
}

Write-Host ""
