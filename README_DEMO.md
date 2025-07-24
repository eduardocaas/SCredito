# Demonstração

#### Abaixo são demonstrada imagens referentes ao fluxo de execução dos serviços do SCredito, juntamente com a simulação de solicitação de crédito e cadastro de um novo cliente.

### Scripts
A imagem abaixo demonstra os serviços em execução, cada um responsável por um serviço
* ADK (Canto superior esquerdo)
* Flask ML (Canto inferior esquerdo)
* Painel Integrado (Canto superior direito)
* Website com Chatbot (Canto inferior direito)

![Tela de Scripts](https://github.com/eduardocaas/SCredito/blob/main/imgs/1_SCRIPTS.jpg?raw=true)

### Website com chatbot
No canto inferior direito é possível visualizar o pop-up do chatbot **Steve Crédito**

![Tela de Chatbot](https://github.com/eduardocaas/SCredito/blob/main/imgs/1_CHATBOT.jpg?raw=true)

### Formulário novos clientes (Website)
Formulário para novos clientes solicitarem crédito (será enviado para o **ADK**)

![Tela de formulário](https://github.com/eduardocaas/SCredito/blob/main/imgs/2_FORM.jpg?raw=true)

### Formulário enviado (Website)
Mensagem pós envio de solicitação de crédito

![Mensagem de sucesso](https://github.com/eduardocaas/SCredito/blob/main/imgs/3_FORM.jpg?raw=true)

### Painel Integrado
Interface da página inicial do Painel Integrado para analistas de crédito

![Painel Integrado](https://github.com/eduardocaas/SCredito/blob/main/imgs/4_PAINEL.jpg?raw=true)

### Dashboard (Painel Integrado)
Visualização de PDFs gerados pelos agentes do **ADK** pós solicitação de crédito de novos clientes

![Dashboard de PDFs](https://github.com/eduardocaas/SCredito/blob/main/imgs/5_DASHBOARD.jpg?raw=true)

### PDF (Painel Integrado)
Exemplo de entrada no formulário, simulando novo cliente (website):
* Nome: **Fulano da Silva**
* Telefone: **11 99999 8888**
* Email: **fulano@email.com**
* Idade: **30**
* Cidade onde mora: **Sâo Paulo**
* Negocio: **Abrir uma loja de roupas joviais e modernas com preco acessível.**
* Valor que precisa: **Mais de 10000**
* Renda familiar: **5000**
* Ensino: **Técnico**

PDF gerado pelos agentes do **ADK**:

![PDF IA](https://github.com/eduardocaas/SCredito/blob/main/imgs/6_PDF.jpg?raw=true)

### Cadastro (Painel Integrado)
O cadastro de novos clientes pode ser auxiliado com um leitor de PDF, após esse cadastro, é acionado o servidor Flask que disponibiliza o endpoint do algoritmo de ML para definir o perfil desse novo cliente com base na renda familiar e no score de crédito.

![Cadastro de cliente](https://github.com/eduardocaas/SCredito/blob/main/imgs/7_CADASTRO.jpg?raw=true)

### CSV
O CSV referente a base de clientes da SCredito atualizado e já com as informações do novo cliente; juntamento com o perfil que foi definido pelo algoritmo de ML.

![Planilha CSV](https://github.com/eduardocaas/SCredito/blob/main/imgs/8_CSV.png?raw=true)