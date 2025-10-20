# Wireless Debugging Setup for Android
# Run this script as Administrator

Write-Host "=== Android Wireless Debugging Setup ===" -ForegroundColor Cyan
Write-Host ""

# ตรวจสอบว่า ADB พร้อมใช้งาน
$adbPath = "C:\platform-tools\adb.exe"
if (-not (Test-Path $adbPath)) {
    Write-Host "ERROR: ADB not found at $adbPath" -ForegroundColor Red
    Write-Host "Please install Platform Tools first." -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ ADB found" -ForegroundColor Green
Write-Host ""

# แสดงคำแนะนำ
Write-Host "=== Steps to Connect ===" -ForegroundColor Yellow
Write-Host ""
Write-Host "On your Android phone (Android 11+):" -ForegroundColor Cyan
Write-Host "1. Go to Settings → Developer Options" -ForegroundColor White
Write-Host "2. Enable 'Wireless Debugging'" -ForegroundColor White
Write-Host "3. Tap 'Wireless Debugging'" -ForegroundColor White
Write-Host "4. Tap 'Pair device with QR code'" -ForegroundColor White
Write-Host "5. A QR code will appear on your phone" -ForegroundColor White
Write-Host ""
Write-Host "=== Ready to Pair ===" -ForegroundColor Yellow
Write-Host ""
Write-Host "Choose pairing method:" -ForegroundColor Cyan
Write-Host "[1] Pair with QR code (requires camera)" -ForegroundColor White
Write-Host "[2] Pair with pairing code (manual)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host ""
    Write-Host "Starting QR code pairing..." -ForegroundColor Yellow
    Write-Host "Point your phone's QR code at the camera when prompted" -ForegroundColor White
    Write-Host ""

    # Run ADB pairing with QR code
    & $adbPath pair qrcode

} elseif ($choice -eq "2") {
    Write-Host ""
    Write-Host "Manual Pairing Mode" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "On your phone:" -ForegroundColor Cyan
    Write-Host "1. Instead of 'QR code', tap 'Pair device with pairing code'" -ForegroundColor White
    Write-Host "2. You will see:" -ForegroundColor White
    Write-Host "   - IP address and Port (e.g., 192.168.1.100:12345)" -ForegroundColor Gray
    Write-Host "   - 6-digit Pairing code (e.g., 123456)" -ForegroundColor Gray
    Write-Host ""

    $ipPort = Read-Host "Enter IP:Port from phone (e.g., 192.168.1.100:37453)"
    $pairingCode = Read-Host "Enter 6-digit pairing code"

    Write-Host ""
    Write-Host "Pairing..." -ForegroundColor Yellow

    # Run ADB pairing with manual code
    & $adbPath pair $ipPort $pairingCode

} else {
    Write-Host "Invalid choice" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Checking Connection ===" -ForegroundColor Yellow

# Wait a bit for pairing to complete
Start-Sleep -Seconds 2

# List paired devices
& $adbPath devices

Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "If device shows 'offline' or not listed:" -ForegroundColor Yellow
Write-Host "1. Go back to 'Wireless Debugging' screen on phone" -ForegroundColor White
Write-Host "2. Look at 'IP address & Port' (e.g., 192.168.1.100:12345)" -ForegroundColor White
Write-Host "3. Run this command:" -ForegroundColor White
Write-Host "   adb connect <IP>:<Port>" -ForegroundColor Gray
Write-Host ""
Write-Host "Example:" -ForegroundColor White
Write-Host "   adb connect 192.168.1.100:12345" -ForegroundColor Gray
Write-Host ""
Write-Host "To verify connection:" -ForegroundColor White
Write-Host "   adb devices" -ForegroundColor Gray
Write-Host ""
