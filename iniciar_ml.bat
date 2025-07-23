@echo off
TITLE Servidor Flask (ML)

echo ========================================
echo    [ML] INICIANDO SERVIDOR ML - FLASK...
echo ========================================
echo.

cd scredito_ml/scredito_ml

echo Ativando ambiente virtual...
python -m venv venv
CALL .\venv\Scripts\activate

echo.
echo Instalando/verificando dependencias...
pip install -r requirements.txt

cls

echo.
echo [OK] - Subindo servidor Flask na porta 5000...
python app.py