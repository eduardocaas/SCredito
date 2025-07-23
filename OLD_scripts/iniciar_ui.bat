@echo off
TITLE Interface do Usuario (UI)

echo ===========================================
echo    [UI] INICIANDO PAINEL INTEGRADO...
echo ===========================================
echo.

cd scredito_unificado

echo.
echo Instalando/verificando dependencias do Node.js (npm)...
CALL npm install

cls

echo.
echo [OK] - Subindo servidor da UI na porta 3000... 
node server.js