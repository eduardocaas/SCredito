// Lógica de animações e outras funcionalidades da página
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
    }, 500);

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (cursor && follower) {
        cursor.style.transform = 'translate(-50%, -50%)';
        follower.style.transform = 'translate(-50%, -50%)';
        let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        function follow() {
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            requestAnimationFrame(follow);
        }
        follow();
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.35)';
                cursor.style.backgroundColor = '#00B27A';
                follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
                follower.style.borderColor = '#00B27A';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%)';
                cursor.style.backgroundColor = '#FF5A5F';
                follower.style.transform = 'translate(-50%, -50%)';
                follower.style.borderColor = '#FFB400';
            });
        });
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);

        document.querySelectorAll('.fade-in').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });

        document.querySelectorAll('.numero-value').forEach(numero => {
            const elementTop = numero.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100 && !numero.classList.contains('animated')) {
                numero.classList.add('animated');
                const finalValue = parseInt(numero.getAttribute('data-count'));
                animateValue(numero, 0, finalValue, 2000);
            }
        });
    });

    const stepsSection = document.querySelector('.steps');
    if (stepsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.step').forEach(step => {
                        const delay = parseInt(step.getAttribute('data-delay'));
                        setTimeout(() => { step.classList.add('animated'); }, delay);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(stepsSection);
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    const btnMobile = document.querySelector('.btn-mobile');
    const navMenu = document.querySelector('.nav-menu');
    if (btnMobile && navMenu) {
        btnMobile.addEventListener('click', () => {
            btnMobile.classList.toggle('active');
            navMenu.classList.toggle('active');
            btnMobile.innerHTML = btnMobile.classList.contains('active') ? '✕' : '☰';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1 && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
                if (navMenu && navMenu.classList.contains('active')) {
                    btnMobile.classList.remove('active');
                    navMenu.classList.remove('active');
                    btnMobile.innerHTML = '☰';
                }
            }
        });
    });

    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        const testimonialsTrack = testimonialsContainer.querySelector('.testimonials');
        const prevBtn = testimonialsContainer.querySelector('.testimonial-prev');
        const nextBtn = testimonialsContainer.querySelector('.testimonial-next');
        const dotsWrap = testimonialsContainer.querySelector('.testimonial-dots');
        let current = 0;
        let slideWidth = testimonialsContainer.offsetWidth;
        const testimonials = testimonialsTrack.querySelectorAll('.testimonial');

        testimonials.forEach((_, i) => { const d = document.createElement('div'); d.className = 'testimonial-dot'; if (!i) d.classList.add('active'); d.onclick = () => goTo(i); dotsWrap.appendChild(d); });
        const dots = [...dotsWrap.querySelectorAll('.testimonial-dot')];

        const goTo = (idx, animate = true) => {
            if (idx < 0) idx = testimonials.length - 1;
            if (idx >= testimonials.length) idx = 0;
            current = idx;
            testimonialsTrack.style.transition = animate ? '.6s ease' : 'none';
            testimonialsTrack.style.transform = `translateX(-${slideWidth * idx}px)`;
            dots.forEach(d => d.classList.remove('active')); dots[idx].classList.add('active');
        };

        prevBtn.onclick = () => goTo(current - 1);
        nextBtn.onclick = () => goTo(current + 1);
        let auto = setInterval(() => goTo(current + 1), 5000);
        testimonialsContainer.onmouseenter = () => clearInterval(auto);
        testimonialsContainer.onmouseleave = () => auto = setInterval(() => goTo(current + 1), 5000);
        window.addEventListener('resize', () => { slideWidth = testimonialsContainer.offsetWidth; goTo(current, false); });
    }

    

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            if (value.length > 10) value = `${value.slice(0, 9)}-${value.slice(9)}`;
            e.target.value = value;
        });
    }
});


// ==================== LÓGICA COMPLETA DO CHATBOT ====================
document.addEventListener('DOMContentLoaded', function () {
    const chatWidget = document.querySelector('.chat-widget');
    const chatPopup = document.querySelector('.chat-popup');
    const chatCloseBtn = document.querySelector('.chat-close-btn');
    const chatForm = document.querySelector('.chat-popup .input-wrapper');
    const chatInput = document.querySelector('.chat-popup .chat-input');
    const chatSendBtn = document.querySelector('.chat-popup .chat-send-btn');
    const chatMessages = document.querySelector('.chat-popup .chat-messages');
    const typingIndicator = document.querySelector('.chat-popup .typing-indicator');
    const historyBtn = document.querySelector('.chat-history-btn');
    const modal = document.getElementById('modalHistorico');
    const modalCloseBtns = modal.querySelectorAll('.btn-close, .btn-primary-modal');
    const modalClearBtn = modal.querySelector('.btn-secondary-modal');

    if (!chatWidget) return;

    const appState = {
        sessionId: getSessionId(),
        isLoading: false,
    };

    function getSessionId() {
        let id = sessionStorage.getItem('chatSessionId');
        if (!id) {
            id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem('chatSessionId', id);
        }
        return id;
    }

    function addMessageToUI(sender, content) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}-message`;
        const avatarIcon = sender === 'user' ? 'fa-user' : 'fa-robot';
        const formattedTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const bubbleContent = document.createElement('div');
        bubbleContent.className = 'message-bubble';
        if (sender === 'bot') {
            bubbleContent.innerHTML = content;
        } else {
            bubbleContent.textContent = content;
        }

        messageEl.innerHTML = `
            <div class="message-avatar"><i class="fas ${avatarIcon}"></i></div>
            <div class="message-content">
                ${bubbleContent.outerHTML}
                <div class="message-time">${formattedTime}</div>
            </div>`;

        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function handleSendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText || appState.isLoading) return;

        addMessageToUI('user', messageText);
        chatInput.value = '';
        appState.isLoading = true;
        typingIndicator.style.display = 'block';
        chatSendBtn.disabled = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensagem: messageText, sessionId: appState.sessionId }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.erro || 'Erro do servidor');
            }

            const data = await response.json();
            addMessageToUI('bot', data.respostaHTML);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            addMessageToUI('bot', `Desculpe, ocorreu um erro: ${error.message}.`);
        } finally {
            appState.isLoading = false;
            typingIndicator.style.display = 'none';
            chatSendBtn.disabled = false;
            chatInput.focus();
        }
    }

    async function loadHistory() {
        const contentDiv = document.getElementById('historicoContent');
        contentDiv.innerHTML = '<p>Carregando...</p>';
        try {
            const response = await fetch(`/api/historico/${appState.sessionId}`);
            const data = await response.json();

            if (!data.historico || data.historico.length === 0) {
                contentDiv.innerHTML = '<p>Nenhuma conversa nesta sessão.</p>';
                return;
            }

            contentDiv.innerHTML = data.historico.map(item => `
                <div class="historico-item">
                    <div class="historico-pergunta"><strong>Você:</strong> ${item.pergunta}</div>
                    <div class="historico-resposta"><strong>Steve:</strong> ${item.resposta}</div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            contentDiv.innerHTML = '<p>Não foi possível carregar o histórico.</p>';
        }
    }

    async function clearHistory() {
        if (!confirm('Deseja realmente apagar o histórico desta sessão?')) return;
        try {
            await fetch(`/api/historico/${appState.sessionId}`, { method: 'DELETE' });
            loadHistory();
            chatMessages.innerHTML = '';
            addMessageToUI('bot', 'Olá! 👋 O histórico foi limpo. Como posso te ajudar agora?');
        } catch (error) {
            alert('Erro ao limpar o histórico.');
        }
    }

    function toggleModal() {
        const isVisible = modal.style.display === 'flex';
        modal.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) {
            loadHistory();
        }
    }

    chatWidget.addEventListener('click', () => {
        chatPopup.classList.toggle('active');
        if (chatPopup.classList.contains('active')) {
            chatInput.focus();
        }
    });
    chatCloseBtn.addEventListener('click', () => chatPopup.classList.remove('active'));

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSendMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    historyBtn.addEventListener('click', toggleModal);
    modalCloseBtns.forEach(btn => btn.addEventListener('click', toggleModal));
    modalClearBtn.addEventListener('click', clearHistory);

    // Adiciona a primeira mensagem do bot apenas se não houver outras mensagens
    if (chatMessages.children.length === 0) {
        addMessageToUI('bot', 'Olá! 👋 Sou o Steve, seu assistente virtual da SCredito. Como posso te ajudar hoje?');
    }

    // Efeito de partículas no fundo (opcional - pode ser pesado para alguns dispositivos)
    function createParticles() {
        const numParticles = 50;
        const particles = document.createElement('div');
        particles.className = 'particles';
        particles.style.position = 'fixed';
        particles.style.top = '0';
        particles.style.left = '0';
        particles.style.width = '100%';
        particles.style.height = '100%';
        particles.style.pointerEvents = 'none';
        particles.style.zIndex = '-1';
        document.body.appendChild(particles);

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 5 + 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            particles.appendChild(particle);
        }

        // Adicionar keyframes para animação
        const style = document.createElement('style');
        style.innerHTML = `
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                    }
                    25% {
                        transform: translateY(${Math.random() * 10}px) translateX(${Math.random() * 10}px);
                    }
                    50% {
                        transform: translateY(${Math.random() * -10}px) translateX(${Math.random() * -10}px);
                    }
                    75% {
                        transform: translateY(${Math.random() * -10}px) translateX(${Math.random() * 10}px);
                    }
                    100% {
                        transform: translateY(0) translateX(0);
                    }
                }
            `;
        document.head.appendChild(style);
    }

    createParticles();
});