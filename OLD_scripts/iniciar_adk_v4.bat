@echo off
TITLE Servidor ADK (Conda)

echo ===================================
echo .      [AI] INICIANDO SERVIDOR ADK...
echo ===================================
echo.

cd scredito_adk\scredito

echo Ativando ambiente Conda 'adk_env'...
CALL conda activate adk_env

IF ERRORLEVEL 1 (
    echo.
    echo [ERRO] Nao foi possivel ativar o ambiente Conda 'adk_env'.
    echo Verifique se o ambiente existe (use: conda env list) e se o Conda esta instalado corretamente.
    pause
    GOTO :EOF
)

echo.
echo Instalando/verificando dependencias do requirements.txt...
pip install -r requirements.txt

cls

echo.
echo [OK] - Subindo servidor do ADK na porta 8000...
adk api_server --allow_origins="*"

echo.
REM Desativa o ambiente ao fechar o servidor (opcional, mas boa pratica)
CALL conda deactivate