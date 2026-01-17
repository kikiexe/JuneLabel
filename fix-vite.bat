@echo off
echo ============================================
echo  FIXING VITE LOADING ISSUE
echo ============================================
echo.

echo [1/4] Clearing Laravel cache...
call php artisan config:clear
call php artisan route:clear
call php artisan view:clear
call php artisan cache:clear

echo.
echo [2/4] Clearing Vite cache...
rmdir /s /q node_modules\.vite 2>nul
rmdir /s /q public\build 2>nul

echo.
echo [3/4] Installing dependencies (if needed)...
call npm install

echo.
echo [4/4] Building assets for dev...
echo.
echo ============================================
echo  NOW RUN: npm run dev
echo  IN A SEPARATE TERMINAL
echo ============================================
pause
