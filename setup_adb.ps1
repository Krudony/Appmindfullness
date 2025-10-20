# Setup Android Platform Tools (ADB)
# Run this script as Administrator

Write-Host "=== Android Platform Tools Setup ===" -ForegroundColor Cyan

# ตรวจสอบว่าโฟลเดอร์ platform-tools อยู่ที่ไหน
$platformToolsPath = "C:\platform-tools"

if (-not (Test-Path $platformToolsPath)) {
    Write-Host "ERROR: Platform Tools not found at $platformToolsPath" -ForegroundColor Red
    Write-Host "Please extract platform-tools-latest-windows.zip to C:\platform-tools first" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Steps:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://dl.google.com/android/repository/platform-tools-latest-windows.zip" -ForegroundColor White
    Write-Host "2. Extract to C:\platform-tools" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    exit 1
}

# ตรวจสอบว่า adb.exe มีอยู่จริง
$adbPath = Join-Path $platformToolsPath "adb.exe"
if (-not (Test-Path $adbPath)) {
    Write-Host "ERROR: adb.exe not found in $platformToolsPath" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Found platform-tools at: $platformToolsPath" -ForegroundColor Green

# เพิ่ม PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")

if ($currentPath -notlike "*$platformToolsPath*") {
    Write-Host "Adding to PATH..." -ForegroundColor Yellow
    $newPath = "$currentPath;$platformToolsPath"
    [System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "✓ PATH updated successfully!" -ForegroundColor Green
} else {
    Write-Host "✓ PATH already contains platform-tools" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. CLOSE THIS TERMINAL and open a NEW one" -ForegroundColor White
Write-Host "2. Run: adb --version" -ForegroundColor White
Write-Host "3. Enable USB Debugging on your phone:" -ForegroundColor White
Write-Host "   - Settings → About Phone → Tap 'Build Number' 7 times" -ForegroundColor Gray
Write-Host "   - Settings → Developer Options → Enable 'USB Debugging'" -ForegroundColor Gray
Write-Host "4. Connect your phone via USB" -ForegroundColor White
Write-Host "5. Run: adb devices" -ForegroundColor White
Write-Host ""
