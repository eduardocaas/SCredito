# 💻 Documentação de scripts de automação

### ⚠️ Alerta ⚠️
Não se assuste com a execução do script **INICIAR_SERVICOS.bat**, irá ser aberta 4 janelas do CMD, porém cada um equivale a um serviço do ambiente SCredito.

#### As etapas para execução dos serviços podem ser encontradas logo abaixo e a documentação dos scripts está descrita no último item deste documento.

---

### Ambiente
Os serviços que compõem o ambiente do SCredito foram desenvolvidos para SO Windows 10 ou 11, estão localizados na pasta ***/scripts*** na raiz do projeto. Os scripts são do tipo *batch* e executados pelo **cmd.exe**.

---
$~$

# 🏁 Etapas para subir os serviços 👈
### Para executar os serviços, é necessário seguir a ordem:

### 1. Arquivos .env
Renomear os arquivos ***.env.example*** para ***.env***, e colocar sua chave de API do Google AI Studio

* **Os arquivos .env.example estão localizados em:**
  * *scredito_website/.env.example*
  * *scredito_adk/scredito/.env.example*
  * *scredito_adk/scredito/agente_analista/.env.example*
  * *scredito_adk/scredito/agente_dashboard/.env.example*
  * *scredito_adk/scredito/agente_pdf/.env.example*

### 2. Instalar wkhtmltox (wkhtmltox.exe)
Tem como objetivo converter HTML para PDF nativamente.
* Instalar o arquivo **wkhtmltox.exe** da raiz do projeto
* Se preferir baixar do site oficial [wkhtmltopdf.org](wkhtmltopdf.org)

### 3. Subir serviços via script (INICIAR_SERVICOS.bat)
Na raiz do projeto está localizado o arquivo **INICIAR_SERVICOS.bat**
* Ao executá-lo será iniciado os scripts de automação para cada serviço

   

---

### Scripts
A automação é composta por 5 scripts, sendo 4 para inicialização e 1 para orquestração. 
#### Lista de scripts
* **INICIAR_SERVICOS.bat**: Orquestração de scripts, inicializador.
* **iniciar_adk.bat**: Criação e inicialização do serviço e API do *Google ADK*.
* **iniciar_ml.bat**: Criação e inicialização de servidor *Flask* para servir algoritmo de ML.
* **iniciar_ui.bat**: Inicialização do serviço de portal integrado do SCredito.
* **iniciar_site.bat**: Inicialização de website do SCredito.

#### Descrição
**INICIAR_SERVICOS.bat**
 - Invocação dos scripts dos serviços de ADK, ML, UI e WEBSITE.

**iniciar_adk.bat**
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

