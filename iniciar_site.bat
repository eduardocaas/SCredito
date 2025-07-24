@echo off
TITLE Website (UI)

echo ===========================================
echo    [UI] INICIANDO WEBSITE...
echo ===========================================
echo.

cd scredito_website

echo.
echo Instalando/verificando dependencias do Node.js (npm)...
CALL npm install

cls

echo Subindo servidor, aguarde...
timeout /t 15 /nobreak

echo.
echo [OK] - Subindo servidor da UI na porta 3001... 
node server.js