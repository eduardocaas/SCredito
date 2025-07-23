// 1. Importações
const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

// 2. Configurações
const app = express();
const PORT = 3000;
const PDF_FOLDER = path.join(__dirname, '..', 'scredito_pdfs');

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. API para listar arquivos
app.get('/api/files', (req, res) => {
    const { status } = req.query;

    fs.readdir(PDF_FOLDER, (err, files) => {
        if (err) {
            console.error("Erro ao ler o diretório:", err);
            return res.status(500).json({ error: 'Não foi possível acessar a pasta de PDFs.' });
        }

        let allPdfs = files
            .filter(file => file.toLowerCase().endsWith('.pdf'))
            .map(file => {
                const isRead = file.startsWith('readed_');
                const displayName = isRead ? file.substring(7) : file;
                return {
                    originalName: file,
                    displayName: displayName,
                    isRead: isRead
                };
            });

        if (status === 'read') {
            allPdfs = allPdfs.filter(pdf => pdf.isRead);
        } else if (status === 'unread') {
            allPdfs = allPdfs.filter(pdf => !pdf.isRead);
        }

        res.json(allPdfs);
    });
});

// 5. API para abrir um PDF (marcar como lido)
app.post('/api/open', (req, res) => {
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ error: 'Nome do arquivo não fornecido.' });
    }

    const isRead = filename.startsWith('readed_');
    const filePath = path.join(PDF_FOLDER, filename);

    if (!isRead) {
        const newFileName = `readed_${filename}`;
        const newFilePath = path.join(PDF_FOLDER, newFileName);
        const command = `start "" "${newFilePath}"`;

        fs.rename(filePath, newFilePath, (renameErr) => {
            if (renameErr) {
                return res.status(500).json({ error: 'Falha ao marcar o arquivo como lido.' });
            }
            exec(command, (execErr) => {
                if (execErr) {
                    return res.status(500).json({ error: 'Arquivo renomeado, mas falhou ao abrir.' });
                }
                res.json({ success: true, message: `Arquivo ${newFileName} aberto.` });
            });
        });
    } else {
        const command = `start "" "${filePath}"`;
        exec(command, (execErr) => {
            if (execErr) {
                return res.status(500).json({ error: 'Falha ao abrir o PDF.' });
            }
            res.json({ success: true, message: `Arquivo ${filename} aberto.` });
        });
    }
});


// 6. API para servir (exibir) o PDF no navegador
app.get('/api/pdfs/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(PDF_FOLDER, filename);

    // Verifica se o arquivo existe antes de tentar enviá-lo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("Arquivo PDF não encontrado:", filePath);
            return res.status(404).send('Arquivo não encontrado.');
        }
        
        // Envia o arquivo para o cliente (navegador)
        res.sendFile(filePath);
    });
});


// 7. API para criar a pasta de PDFs
app.post('/api/create-folder', (req, res) => {
    console.log('Recebida requisição para criar a pasta de PDFs...');
    fs.mkdir(PDF_FOLDER, { recursive: true }, (err) => {
        if (err) {
            console.error("Erro ao tentar criar o diretório:", err);
            return res.status(500).json({ error: 'Falha grave ao criar a pasta no servidor.' });
        }

        console.log(`Pasta ${PDF_FOLDER} verificada/criada com sucesso.`);
        res.status(201).json({ message: 'Pasta de PDFs criada com sucesso! A lista será atualizada.' });
    });
});

app.post('/api/prepare-for-register', (req, res) => {
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ error: 'Nome do arquivo não fornecido.' });
    }

    const isRead = filename.startsWith('readed_');
    const filePath = path.join(PDF_FOLDER, filename);

    // Se o arquivo ainda não foi lido, renomeia primeiro
    if (!isRead) {
        const newFileName = `readed_${filename}`;
        const newFilePath = path.join(PDF_FOLDER, newFileName);

        fs.rename(filePath, newFilePath, (renameErr) => {
            if (renameErr) {
                console.error("Erro ao renomear arquivo em /api/prepare-for-register:", renameErr); // Adicionado para depuração
                return res.status(500).json({ error: 'Falha ao marcar o arquivo como lido antes de cadastrar.' });
            }
            // Retorna o NOVO nome do arquivo
            res.json({ success: true, finalName: newFileName });
        });
    } else {
        // Se já foi lido, apenas retorna o nome que já existe
        res.json({ success: true, finalName: filename });
    }
});

// 8. Middleware para servir arquivos estáticos (DEPOIS das rotas da API)
app.use(express.static('public'));


// 9. Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📂 Monitorando a pasta: ${PDF_FOLDER}`);
    console.log(`✅ Aplicação principal disponível em http://localhost:${PORT}`);
});