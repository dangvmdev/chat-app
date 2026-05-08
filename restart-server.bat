@echo off
echo Dang dung server hien tai...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Dang xoa cache va file cu...
rmdir /s /q .next 2>nul
rmdir /s /q app\api 2>nul

echo Khoi dong lai server...
npm run dev

@REM Made with Bob
