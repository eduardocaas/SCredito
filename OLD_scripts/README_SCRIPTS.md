# Documentação de scripts de automação

### ALERTA
Não se assuste com a execução do script INICIAR_SERVICOS.bat, irá ser aberta várias janelas do CMD, porém cada um equivale a um serviço do ambiente SCredito.
O Script de maior execução é o ***iniciar_adk_v2.bat***, onde faz instalação de gerenciador de pacotes ***MSYS2*** e instalação de dependências ***GTK3*** do Linux, para o bom funcionamento do WeasyPrint (usado para gerar PDF no Linux).

---

### Ambiente
Os serviços que compõem o ambiente do SCredito foram desenvolvidos para SO Windows 10 ou 11, estão localizados na pasta ***/scripts*** na raiz do projeto. Os scripts são do tipo *batch* e executados pelo **cmd.exe**.

---

### Scripts
A automação é composta por 5 scripts, sendo 4 para inicialização e 1 para orquestração. 
#### Lista de scripts
* **INICIAR_SERVICOS.bat**: Orquestração de scripts, inicializador.
* **iniciar_adk_v2.bat**: Criação e inicialização do serviço e API do *Google ADK*.
* **iniciar_ml.bat**: Criação e inicialização de servidor *Flask* para servir algoritmo de ML.
* **iniciar_ui.bat**: Inicialização do serviço de portal integrado do SCredito.
* **iniciar_site.bat**: Inicialização de website do SCredito.

#### Descrição
**INICIAR_SERVICOS.bat**
 - Invocação dos scripts dos serviços de ADK, ML, UI e WEBSITE.

**iniciar_adk_v2.bat**
 - Verificação/Instalação do MSYS2 (Gerenciador de pacotes pacman - Linux).
 - Verificação/Instalação de dependências GTK3 via MSYS2 (Para funcionar o WeasyPrint).
 - Criação de ambiente virtual Python / Instalação de dependências.
 - Inicialização de API do Google ADK.

**iniciar_ml.bat**
 - Criação de ambiente virtual Python / Instalação de dependências.
 - Inicialização do serviço Flask.

**iniciar_ui.bat**
 - Verificação/Instalação das dependências do Node.
 - Inicialização do servidor Node.

 **iniciar_site.bat**
 - Verificação/Instalação das dependências do Node.
 - Inicialização do servidor Node.

 ---