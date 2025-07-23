@echo off
TITLE Servidor ADK - Inicializacao e Setup

:: --- CONFIGURACAO ---
SET "MSYS2_INSTALL_DIR=C:\msys64"
SET "MSYS2_BIN_PATH=%MSYS2_INSTALL_DIR%\ucrt64\bin"
SET "MSYS2_INSTALLER_URL=https://github.com/msys2/msys2-installer/releases/download/2024-01-13/msys2-x86_64-20240113.exe"
SET "MSYS2_INSTALLER_NAME=msys2-installer.exe"

:: --- VERIFICACAO INICIAL ---
echo ===================================
echo    [AI] INICIANDO SERVIDOR ADK...
echo ===================================
echo.
echo Verificando dependencias necessarias (GTK3 para WeasyPrint)...
echo.

:: Verifica se o diretorio de bibliotecas do MSYS2 ja existe
IF EXIST "%MSYS2_BIN_PATH%" (
    echo [OK] - Dependencias ja instaladas.
) ELSE (
    echo [AVISO] - Dependencias nao encontradas. Tentando instalacao automatica...
    echo          (Requer privilegios de Administrador e conexao com a internet)
    echo.
    
    :: 1. Baixar o instalador do MSYS2 usando PowerShell
    echo Baixando o instalador do MSYS2...
    powershell -Command "Start-BitsTransfer -Source '%MSYS2_INSTALLER_URL%' -Destination '.\%MSYS2_INSTALLER_NAME%'"
    
    IF NOT EXIST ".\%MSYS2_INSTALLER_NAME%" (
        echo [ERRO] - Falha ao baixar o instalador. Verifique sua conexao ou o link no script.
        PAUSE
        EXIT /B 1
    )
    
    :: 2. Executar o instalador silenciosamente
    echo Instalando MSYS2 (isso pode levar alguns minutos)...
    start /wait .\%MSYS2_INSTALLER_NAME% /S
    
    :: 3. Deletar o instalador
    del .\%MSYS2_INSTALLER_NAME%
    
    :: 4. Atualizar pacotes e instalar GTK3 via pacman (nao interativo)
    echo Configurando pacotes do MSYS2...
    
    "%MSYS2_INSTALL_DIR%\usr\bin\bash.exe" -l -c "pacman -Syu --noconfirm"
    echo.
    "%MSYS2_INSTALL_DIR%\usr\bin\bash.exe" -l -c "pacman -S --noconfirm mingw-w64-ucrt-x86_64-gtk3"
    
    echo.
    echo [OK] - Instalacao automatica concluida!
)

echo.
echo Adicionando temporariamente as bibliotecas ao PATH desta sessao...
SET "PATH=%MSYS2_BIN_PATH%;%PATH%"
echo.

cd ../scredito_adk/scredito

echo Ativando ambiente virtual...
IF NOT EXIST ".\venv\Scripts\python.exe" (
    python -m venv venv
)
CALL .\venv\Scripts\activate

echo.
echo Instalando/verificando dependencias do projeto...
pip install -r requirements.txt --quiet --disable-pip-version-check

cls

echo.
echo ===================================
echo .      [OK] - Tudo pronto!
echo .      Subindo servidor da UI na porta 8000...
echo ===================================
echo.
adk api_server --allow_origins="*"

PAUSE