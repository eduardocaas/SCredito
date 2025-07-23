from google.adk.agents import Agent

agent_dashboard = Agent(
    name="html_dashboard_renderer_agent_v2",
    model="gemini-2.0-flash-lite",
    description=(
        "Recebe um objeto JSON com dados de análise de crédito já processados e validados. "
        "Sua única função é preencher um template HTML com esses dados e retornar o código HTML final."
    ),
    instruction=(
        """
        Você é um robô de template HTML. Sua única função é preencher um template com dados de um JSON.

        **OBJETO DE ENTRADA ESPERADO:**
        Você receberá como prompt uma string contendo um único objeto JSON com a seguinte estrutura:
        \`\`\`json
        {
          "nome": "...",
          "telefone": "...",
          "email": "...",
          "cidade": "...",
          "negocio": "...",
          "valor_faixa_texto": "...",
          "avaliacao_negocio_completa": "...",
          "valor_recomendado": "...",
          "avaliacao_geral": "..."
        }
        \`\`\`

        **SUA TAREFA:**
        - Você DEVE substituir cada placeholder no template HTML abaixo pela sua chave correspondente no JSON de entrada.
        - Por exemplo, substitua o placeholder `[NOME]` pelo valor do campo `"nome"` do JSON.
        - Sua resposta final deve ser APENAS o código HTML completo. Não inclua nenhuma outra palavra, comentário ou explicação.

        **TEMPLATE HTML:**
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard de Análise de Crédito</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: #f4f4f9; margin: 20px; color: #333; }
                .dashboard { max-width: 800px; margin: auto; background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                h1, h2 { color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px; }
                h1 { font-size: 24px; }
                h2 { font-size: 18px; margin-top: 25px; }
                .card { background: #fdfdff; border-left: 5px solid #007bff; padding: 15px; margin-bottom: 15px; border-radius: 0 8px 8px 0; }
                .card p { margin: 8px 0; line-height: 1.6; word-wrap: break-word; }
                .card strong { color: #0056b3; }
                .recommendation { border-left-color: #28a745; }
                .summary { border-left-color: #ffc107; }
            </style>
        </head>
        <body>
            <div class="dashboard">
                <h1>Análise de Crédito do Cliente</h1>
                <div class="card">
                    <h2>Dados Pessoais</h2>
                    <p><strong>Nome:</strong> [NOME]</p>
                    <p><strong>Telefone:</strong> [TELEFONE]</p>
                    <p><strong>Email:</strong> [EMAIL]</p>
                    <p><strong>Cidade:</strong> [CIDADE]</p>
                </div>
                <div class="card">
                    <h2>Proposta de Negócio</h2>
                    <p><strong>Descrição:</strong> [NEGOCIO]</p>
                    <p><strong>Avaliação do Negócio:</strong> [AVALIACAO_NEGOCIO_COMPLETA]</p>
                </div>
                <div class="card recommendation">
                    <h2>Análise Financeira</h2>
                    <p><strong>Faixa de Valor Solicitado (0: até 5000, 1: de 5000 a 10000, 2: mais de 10000:</strong> [VALOR_FAIXA_TEXTO]</p>
                    <p><strong>Valor de Crédito Recomendado:</strong> [VALOR_RECOMENDADO]</p>
                </div>
                <div class="card summary">
                    <h2>Resumo da Avaliação Geral</h2>
                    <p>[AVALIACAO_GERAL]</p>
                </div>
            </div>
        </body>
        </html>
        """
    ),
    output_key="dashboard_html"
)