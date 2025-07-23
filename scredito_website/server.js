require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CONFIGURAÇÕES PARA O ADK ---
const ADK_API_URL = 'http://127.0.0.1:8000';
const ADK_USER_ID = 'u_scredito_web';
const ADK_SESSION_ID = 's_scredito_web';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuração dos assistentes
const assistente = {
    nome: 'Steve Crédito',
    emoji: '💰',
    prompt: `Você é um chatbot de assistência financeira amigável e prestativo chamado Steve Crédito. Seu objetivo é ajudar os usuários com dúvidas e problemas relacionados a finanças pessoais. Você deve ser cordial, paciente e oferecer informações úteis sobre orçamento, poupança, investimentos básicos e como lidar com dívidas. Evite dar conselhos financeiros específicos ou personalizados, foque em informações gerais e educativas. Se não souber a resposta, diga que não pode ajudar com aquele assunto e sugira procurar um profissional qualificado. Seja empático e compreensivo com as dificuldades financeiras dos usuários.

    ### Estilo de Resposta:
    - Linguagem simples e acessível
    - Exemplos numéricos quando fizer sentido
    - Formato em **Markdown**
    - Se o usuário fizer uma pergunta vaga como "Me ajuda", sugira um tema financeiro popular (ex: orçamento, dívidas, investimentos iniciais)
    - Se apresente na primeira mensagem, mas não precisa se apresentar a cada nova mensagem, trate o chat como uma conversa

    ### Exemplo de tom de resposta:
    - "Ótima pergunta, vamos lá: imagine que você ganha R$2000 por mês... "

    ### Regra Importante
    - Não deixe o usuário desvirtuar do assunto, tente sempre retornar ao tópico ou responda que não pode responder sobre o assunto sugerido`
};

// Armazenamento de histórico
const historicos = new Map();
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de chat
app.post('/api/chat', async (req, res) => {
    const { mensagem, sessionId } = req.body;

    if (!mensagem) {
        return res.status(400).json({ erro: 'Mensagem é obrigatória.' });
    }


    const sessionKey = sessionId || 'default';
    if (!historicos.has(sessionKey)) historicos.set(sessionKey, []);

    const historico = historicos.get(sessionKey);

    // Construir contexto com últimas 3 interações desse assistente
    let contextoHistorico = '';
    const ultimasInteracoes = historico.slice(-3);
    if (ultimasInteracoes.length > 0) {
        contextoHistorico = '\n\nContexto da conversa anterior:\n';
        ultimasInteracoes.forEach(item => {
            contextoHistorico += `P: ${item.pergunta}\nR: ${item.resposta.substring(0, 150)}...\n\n`;
        });
    }

    const promptCompleto = `${assistente.prompt}${contextoHistorico}\n\nPergunta atual: ${mensagem}`;

    try {
        const body = {
            contents: [
                {
                    parts: [
                        { text: promptCompleto }
                    ]
                }
            ]
        };
    
        const response = await axios.post(GEMINI_URL, body, {
            headers: { 'Content-Type': 'application/json' }
        });
    
        const candidates = response.data.candidates;
    
        if (!candidates || candidates.length === 0 || !candidates[0].content || !candidates[0].content.parts[0].text) {
            return res.status(500).json({ erro: 'A API Gemini não retornou nenhuma resposta válida. Tente novamente.' });
        }
    
        const respostaMarkdown = candidates[0].content.parts[0].text;
        const respostaHTML = marked.parse(respostaMarkdown);
    
        historico.push({
            pergunta: mensagem,
            resposta: respostaMarkdown,
            timestamp: new Date().toISOString()
        });
    
        if (historico.length > 50) historico.splice(0, historico.length - 50);
    
        res.json({
            respostaHTML,
            respostaMarkdown,
            assistente: assistente.nome,
            timestamp: new Date().toISOString()
        });
    
    } catch (error) {
        console.error('Erro na API Gemini:', error.response ? error.response.data : error.message);
        res.status(500).json({ erro: 'Erro ao chamar a API Gemini.' });
    }
    
});

// Obter histórico
app.get('/api/historico/:sessionId', (req, res) => {
    const historico = historicos.get(req.params.sessionId) || [];
    res.json({ historico });
});

// Limpar histórico
app.delete('/api/historico/:sessionId', (req, res) => {
    historicos.delete(req.params.sessionId);
    res.json({ sucesso: true, mensagem: 'Histórico apagado.' });
});

// --- FUNÇÃO PARA CRIAR SESSÃO ADK NA INICIALIZAÇÃO ---
const criarSessaoADK = async () => {
    try {
        console.log("Tentando criar sessão na API do ADK...");
        const response = await axios.post(`${ADK_API_URL}/apps/agent/users/${ADK_USER_ID}/sessions/${ADK_SESSION_ID}`);
        console.log("Sessão com a API do ADK criada com sucesso!");
    } catch (error) {
        console.error('Erro ao criar a sessão com a API do ADK.');
    }
};



// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`[] Servidor rodando em http://localhost:${PORT}`);
    criarSessaoADK();
});
