@echo off
title EMS Portal
echo ===================================================
echo     STARTING ENTERPRISE EMS PORTAL SUITE
echo ===================================================
echo.

echo Starting Frontend Dev Server (React + Vite) on http://localhost:3000...
start "EMS Frontend - Vite (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Starting Backend Server (Spring Boot) on http://localhost:8080...
cd /d "%~dp0backend"
mvn spring-boot:run

pause
