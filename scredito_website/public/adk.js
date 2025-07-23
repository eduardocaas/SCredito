const ADK_USER_ID = 'u_scredito_web';
const ADK_SESSION_ID = 's_scredito_web';

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('btn-loading');
    setTimeout(() => {
      const formContainer = document.querySelector('.form-container');
      formContainer.innerHTML = `<div class="success-message" style="text-align: center; padding: 40px 20px;"><div style="font-size: 60px; margin-bottom: 20px;">🎉</div><h3 style="font-size: 28px; margin-bottom: 15px; color: var(--verde);">Formulário enviado com sucesso!</h3><p style="font-size: 18px; margin-bottom: 30px;">Em breve nossa equipe entrará em contato.</p><a href="#" class="btn" onclick="location.reload()">Voltar ao início</a></div>`;
    }, 2000);


    // VALORES DO FORMULÁRIO
    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;
    let idade = document.getElementById('idade').value;
    let cidade = document.getElementById('cidade').value;
    let negocio = document.getElementById('negocio').value;
    let valor = document.getElementById('valor').value;
    let renda = document.getElementById('renda').value;
    let escolaridade = document.getElementById('escolaridade').value;

    // OBJETO JSON DO FORMULÁRIO
    let dados = {
      nome: nome,
      telefone: telefone,
      email: email,
      idade: parseInt(idade),
      cidade: cidade,
      negocio: negocio,
      valor: parseInt(valor),
      renda_familiar: parseFloat(renda),
      escolaridade: parseInt(escolaridade)
    };

    var requestAdk = {
      appName: "agent",
      userId: ADK_USER_ID,
      sessionId: ADK_SESSION_ID,
      newMessage: {
        role: "user",
        parts: [{
          text: JSON.stringify(dados)
        }]
      }
    };

    console.log("Enviando dados formatados para o agente:", JSON.stringify(requestAdk, null, 2));

    // ENVIANDO REQUEST PARA API DO ADK
    return fetch('http://127.0.0.1:8000/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestAdk)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição final para /run');
      }
      console.log("Dados enviados com sucesso para o ADK!");
      return response.json();
    })
      .then(dataFinal => {
        console.log("Resposta do agente:", dataFinal);
        alert("Solicitação foi enviada com sucesso!");
      }).catch(error => {
        console.error('Ocorreu um erro:', error);
        alert("Houve um problema ao enviar a solicitação. Tente novamente.");
      });
  });
}