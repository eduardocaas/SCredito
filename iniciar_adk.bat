@echo off
TITLE Servidor ADK

echo ===================================
echo.     [AI] INICIANDO SERVIDOR ADK...
echo ===================================
echo.

:: Caminho raiz
set ROOT_DIR=%~dp0

cd scredito_adk\scredito

echo Ativando ambiente virtual...
python -m venv venv
CALL .\venv\Scripts\activate

echo.
echo Instalando/verificando dependencias...
pip install -r requirements.txt

cls

START "Website (UI)" cmd /k "cd /d %ROOT_DIR% && iniciar_site.bat"

echo.
echo [OK] - Subindo servidor do ADK na porta 8000... 
adk api_server --allow_origins="*"

PAUSE