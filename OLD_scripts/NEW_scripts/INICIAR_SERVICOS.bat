@echo off
TITLE Painel de Controle Geral - SCredito

echo =================================================================
echo        INICIANDO TODOS OS SERVICOS DO PROJETO SCREDITO
echo =================================================================
echo.
echo Este script ira iniciar os seguintes servicos em janelas separadas:
echo.
echo   - [] API de Machine Learning (ML)
echo   - [] Servidor de Agentes (ADK)
echo   - [] Interface do Usuario (UI)
echo   - [] Website (UI)
echo.
pause
cls

echo Iniciando os 4 processos em novas janelas...

START "Servidor ADK" "%~dp0scripts\iniciar_adk_v2.bat"
START "Servidor Flask (ML)" "%~dp0scripts\iniciar_ml.bat"
START "Interface (UI)" "%~dp0scripts\iniciar_ui.bat"
START "Website (UI)" "%~dp0scripts\iniciar_site.bat"

echo.
echo [OK] - Os processos dos servidores ADK, ML, (UI - 2) foram iniciados em novas janelas.
echo.
echo Este terminal agora pode ser fechado.
pause