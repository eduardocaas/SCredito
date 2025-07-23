// Cole aqui o seu código JavaScript do formulário que você já me forneceu
// Nenhuma alteração é necessária neste arquivo.
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('clienteForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const idade = parseInt(document.getElementById('idade').value, 10);
            const rendaFamiliar = parseFloat(document.getElementById('rendaFamiliar').value);
            const regiao = document.getElementById('regiao').value;
            const escolaridade = document.getElementById('escolaridade').value;
            const temNegocioProprio = document.getElementById('negocioProprio').checked;
            const scoreCredito = parseInt(document.getElementById('scoreCredito').value, 10);
            const dataCadastro = document.getElementById('dataCadastro').value;

            const clienteId = crypto.randomUUID();
            const usaOrientacaoFinanceira = false;

            console.log(`Consultando API de perfil com Renda: ${rendaFamiliar} e Score: ${scoreCredito}...`);

            const responseApi = await fetch('http://127.0.0.1:5000/perfil', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    renda_familiar: rendaFamiliar,
                    score_credito: scoreCredito
                }),
            });

            if (!responseApi.ok) {
                throw new Error(`Erro na API: ${responseApi.status} ${responseApi.statusText}`);
            }

            const perfilData = await responseApi.json();
            const perfil = perfilData['perfil_predito'];

            const clienteParaSalvar = {
                cliente_id: clienteId,
                idade: idade,
                renda_familiar: rendaFamiliar,
                regiao: regiao,
                escolaridade: escolaridade,
                tem_negocio_proprio: temNegocioProprio,
                score_credito: scoreCredito,
                data_cadastro: dataCadastro,
                usa_orientacao_financeira: usaOrientacaoFinanceira,
                perfil: perfil
            };

            const salvarCliente = await fetch('http://127.0.0.1:5000/salvar_cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteParaSalvar)
            });

            if (!salvarCliente.ok) {
                const errorData = await salvarCliente.json();
                throw new Error(`Erro na API ao salvar: ${errorData.erro || salvarCliente.statusText}`);
            }

            const resultadoSalvar = await salvarCliente.json();
            console.log('Resposta do servidor:', resultadoSalvar.mensagem);

            alert('Cliente cadastrado com sucesso!');
            form.reset();

        } catch (error) {
            console.error('Ocorreu um erro ao cadastrar o cliente:', error);
            alert('Falha ao cadastrar cliente. Verifique se a API de perfil está rodando e tente novamente.');
        }
    });
});