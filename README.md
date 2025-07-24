# 💻 SCredito - Solução de IA 💵
### 📜 Projeto final para disciplina de Inteligência Artificial do curso de ADS do UNISENAC/RS ministrada pelo professor Vitor Hugo.

#### Integrantes: [🔗Eduardo Castro](https://github.com/eduardocaas), [🔗 João Gularte](https://github.com/OndeJoaoGularte)

---
### ℹ️ O objetivo deste projeto é entregar uma solução em IA para a SCredito, uma fintech especializada em democratizar o acesso ao crédito para empreendedores de baixa renda que desejam abrir ou expandir seus negócios. 


### ⚠️ Este projeto é baseado em uma empresa ficticia chamada SCredito, os datasets e documentação técnica dessa empresa está localizada na pasta *info/* na raiz do projeto.

$~$

## 📃 Resumo

O projeto de solução com IA para a SCredito está dividido em duas vertentes: **foco no cliente** e **foco na empresa**. 

Com foco no cliente, foi proposto e implementado o **Steve Crédito**, um chatbot de assistência virtual com foco em finanças, objetivo desse chatbot é ajudar os usuários com dúvidas e problemas relacionados a finanças pessoais. Estará situado no website da SCredito.

Com foco na empresa, foi implementado um sistema de análise de crédito para novos clientes, com o uso do poderio da nova ferramenta **Google ADK** foi desenvolvido um sistema multiagente para análisar novos clientes mediante solicitação de crédito no website da empresa. Os agentes de IA tem como objetivo reduzir o tempo de decisão do analista humano, mantendo a precisão, para atingir as metas de negócio da SCredito.

## ℹ️ Funcionamento
> * ### A documentação referente ao deploy e execução dos serviços está localizada em [README_SCRIPTS.md](https://github.com/eduardocaas/SCredito/blob/main/README_SCRIPTS.md).
> * ### A demonstração do funcionamento do projeto pode ser localizada em [README_DEMO.md](https://github.com/eduardocaas/SCredito/blob/main/README_DEMO.md).
$~$

## Tecnologias utilizadas

* Gemini PRO
* Google Agent Development Kit
* Machine Learning (Random Forest)
* Python, Flask
* Node.js, Express


## Propostas

### Website com funcionalidade de Chatbot
> Localização: **scredito_website**

Foi reutilizado o site da SCredito e municiado com um chatbot LLM, o **Steve Crédito** que presta assistência financeira amigável. Seu objetivo é ajudar os usuários com dúvidas e problemas relacionados a finanças pessoais. O site foi adequado para utilizar um servidor Node, onde é realizada a comunicação com a API do Google.

#### Tecnologias
* LLM Gemini 2.0 Flash
* API do Gemini
* Prompt adequado a proposta da SCredito
* Node.js com Express

---

### Análise de novos clientes com Google ADK
> Localização: **scredito_adk/scredito**

Sistema multiagente de IA para análise de crédito de novos clientes utilizando o Google ADK. Foi desenvolvido em ambiente Python e SO Windows. O sistema roda em uma API do ADK.

Tem como objetivo realizar de forma sequencial uma análise de crédito, recebendo dados em JSON do website da SCrédito, e realizando uma análise sobre a proposta de negócio, perfil do cliente, renda, idade, etc.. E monta um PDF com insights, trazendo maior facilidade para o analista humano.

> 🔎 **Para mais informações sobre os agentes, explore os prompts nos respectivos diretórios citados abaixo:** 
> 1. agent.py
> 2. agente_analista/agent.py
> 3. agente_dashboard/agent.py
> 4. agente_pdf/agent.py

#### Agentes
* Orquestrador: Recebe os dados de entrada e invoca sequencialmente os agentes a seguir.
* Analista:  Aplica um conjunto explícito e detalhado de regras de negócio de crédito, realiza cálculos de pontuação e gera textos de análise.
* Dashboard: Recebe dados de análise de crédito já processados e validados, sua única função é preencher um template HTML com esses dados.
* PDF: Recebe um código em HTML, sua única função é gerar um arquivo PDF com base nesse HTML, e salvar em um diretório.

---

### Painel Integrado para Analista de Crédito
> Localização: **scredito_unificado**

O painel integrado do SCredito é o ambiente aonde o analista humano vai poder acessar o conteúdo gerado pelos agentes de IA, como os PDFs, onde terá uma tabela com todos os PDFs dos novos clientes, ao visualiza-los, poderá preencher um formulário de cadastro e proposta para esse novo cliente. Ao realizar o cadastro do novo cliente aprovado, através do formulário, também será realizada uma consulta ao endpoint do algoritmo de ML para definir o perfil desse novo usuário e salvar no CSV de Clientes da SCredito.

#### Tecnologias
* Node.js
* Express
* Leitor de PDF

---

### Definição de perfil com Machine Learning
> Localização: **scredito_ml**

Foi implementado um servidor **Flask** que irá fazer o deploy de um endpoint para servir um algoritmo de Machine Learning **Random Forest** para realizar a definição de perfis de novos clientes.

Para a atual base de clientes já existente, foi realizado uma definição de perfis de forma estrutural, com as seguintes regras:

**Renda Familiar**
* A - maior que 5000.
* B - maior que 2500 e menor que 5000.
* C - menor que 2500.

**Score**
* 1 - maior que 650
* 2 - maior que 400 e menor que 650
* 3 - menor que 400

**Legenda**
- A1: Alta renda e score alto
- A2: Alta renda e score médio
- A3: Alta renda e score baixo
- B1: Média renda e score alto
- B2: Média renda e score médio
- B3: Média renda e score baixo
- C1: Baixa renda e score alto
- C2: Baixa renda e score médio
- C3: Baixa renda e score baixo

Através de um algoritmo Python foi preenchido o CSV de Clientes com essa definição de perfis.

> Após isso foi treinado um algoritmo de classificação multiclasse **Random Forest** baseado em **Decision Tree** para realizar a classificação de novos clientes cadastrados na SCredito.

#### Tecnologias
* Flask
* Python

#### Algoritmo
Em **scredito_df.py** foi realizada uma adequação do CSV de Clientes com base nos perfis acima, e após é usado para treinar o algoritmo citado abaixo.

Em **scredito_ml.py**, é implementado um algoritmo de classificação multiclasse **Random Forest** com base nas colunas/classes ***renda_familiar*** e ***score_credito***, usando os rótulos da coluna ***perfil***. Foi utilizado o Python e a biblioteca **sklearn**.


## Deploy
As soluções citadas acima, foram desenvolvidas em ambiente local e deploy local para demonstração, foi utilizado o sistema operacional Windows 11 como base. 

**As portas das aplicações foram definidas em:**
* 3000: Portal integrado SCredito
* 3001: Website SCredito
* 5000: Algoritmo ML (Flask)
* 8000: API do Google ADK

> Foi desenvolvido uma série de scripts de automação em "BATCH" para inicialização dos serviços, a documentação pode ser encontrada em README_SCRIPTS.md

## Conclusão
O projeto do assistente financeiro via IA e análise de crédito por IA, irá agregar valor na redução de inadimplência, pois ao escalar a orientação financeira, tende a melhorar a saúde financeira dos clientes. Aumento na retenção de clientes, o uso de IA entrega um serviço disponível 24/7 e moderno, passando uma imagem de uma instituição tecnológica e atualizada, melhora o relacionamento. Também contribui com a redução de carga de funcionários de atendimento e orientação financeira, pois para casos mais usuais a carga fica para o assistente financeiro de IA. E por fim, com o uso de IA para analisar crédito para novos clientes e definir perfis, a análise fica mais rica em detalhes e adepta as necessidades da empresa. 

### O objetivo desse projeto para com a SCredito é atingir as seguintes **métricas de sucesso**:
* Eficiência: Reduzir o Tempo de análise para abaixo da meta de 48 horas, liberando os analistas para focarem em casos complexos.
* Qualidade: Manter a taxa de inadimplência da carteira abaixo da meta de 10%, garantindo que a IA mantenha ou melhore a qualidade das aprovações.
* Agilidade: Acelerar a análise de crédito para novos clientes, reduzindo o tempo de decisão e
mantendo a precisão, para atingir as metas de negócio da SCredito.
* Retenção: Um serviço disponível 24/7, fortalece o relacionamento e ajuda a superar a meta de retenção de clientes de 80%.