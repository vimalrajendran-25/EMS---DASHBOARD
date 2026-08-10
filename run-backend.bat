@echo off
title EMS Backend - Spring Boot (Port 8080)
echo Starting Spring Boot REST Backend on http://localhost:8080...
cd /d "%~dp0backend"
mvn spring-boot:run
pause
