@echo off
TITLE Servidor ADK

echo ===================================
echo .     [AI] INICIANDO SERVIDOR ADK...
echo ===================================
echo.

cd scredito_adk\scredito

echo Ativando ambiente virtual...
python -m venv venv
CALL .\venv\Scripts\activate

echo.
echo Instalando/verificando dependencias...
pip install -r requirements.txt

cls

echo.
echo [OK] - Subindo servidor da UI na porta 8000... 
adk api_server --allow_origins="*"