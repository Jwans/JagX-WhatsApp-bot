@echo off
echo.
echo ╔════════════════════════════════════════╗
echo ║  JagX WhatsApp Bot - Windows Setup     ║
echo ║  Created by JRILICENSE ^& JagX         ║
echo ╚════════════════════════════════════════╝
echo.
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not installed!
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)
echo Installing...
git clone https://github.com/Jwans/JagX-WhatsApp-bot.git
cd JagX-WhatsApp-bot
call npm install
if not exist .env copy .env.example .env
if not exist logs mkdir logs
if not exist sessions mkdir sessions
echo.
echo ✅ Setup Complete!
echo Run: npm start
echo.
pause
