/* ==========================================
   CONFIGURAÇÃO DOS LINKS DO INFLUENCIADOR
   (Fácil de manter e atualizar)
   ========================================== */
const config = {
    nome: "Luke bennett ",
    bio: "Criador de conteúdo digital & focado em lifestyle e tecnologia. 🚀",
    avatarUrl: "assets/img/avatar.jpg", // Caminho para imagem real do irmão
    links: [
        {
            nome: "TikTok",
            url: "status.html",
            icone: "fab fa-tiktok",
            corHover: "#ffffff" // Cor característica da rede para efeito neon personalizado
        }, 
        {
            nome: "facebook",
            url: "status.html",
            icone: "fab fa-facebook",
            corHover: "#3944f9" // Cor característica da rede para efeito neon personalizado
        }, 
        {
            nome: "Instagram",
            url: "https://www.instagram.com/lukebennettoficial?igsh=cDlrdGRlZjdtYnNu",
            icone: "fab fa-instagram",
            corHover: "#f55bb9f3"
        },
        {
            nome: "YouTube",
            url: "https://youtube.com/@lukebennettoficial?si=sN6E1a0g_PwsFSbu",
            icone: "fab fa-youtube",
            corHover: "#ff2d2d"
        },
  /*      {
            nome: "twitter",
            url: "status.html",
            icone: "fab fa-twitter",
            corHover: "#ff0000"
        }, */
  /*      {
            nome: "Grupo VIP (WhatsApp)",
            url: "status.html",
            icone: "fas fa-users",
            corHover: "#25d366"
        }, */
        {
            nome: "Contactar WhatsApp",
            url: "https://wa.me/244956550233",
            icone: "fab fa-whatsapp",
            corHover: "#1ff323"
        },
        {
            nome: "Site Oficial",
            url: "status.html",
            icone: "fas fa-globe",
            corHover: "#00f0ff"
        } 
    ]
};

/* ==========================================
   DOM INITIALIZATION
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosPerfil();
    renderizarLinks();
    initParticulas();
    initTema();
    initCompartilhar();
    
    // Atualiza o ano de copyright automaticamente
    document.getElementById("current-year").textContent = new Date().getFullYear();
});

/* Carrega textos e fotos dinamicamente */
function carregarDadosPerfil() {
    document.title = `${config.nome} | Meus Links Oficiais`;
    document.getElementById("profile-name").textContent = config.nome;
    document.getElementById("profile-bio").textContent = config.bio;
    if (config.avatarUrl) {
        document.getElementById("profile-img").src = config.avatarUrl;
    }
}

/* Renderiza os botões de links configurados */
function renderizarLinks() {
    const wrapper = document.getElementById("links-wrapper");
    wrapper.innerHTML = ""; // Limpa container

    config.links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "link-btn";
        a.innerHTML = `
            <i class="${link.icone}"></i>
            <span>${link.nome}</span>
        `;

        // Efeito de hover colorido customizado
        a.addEventListener("mouseenter", () => {
            a.style.borderColor = link.corHover;
            a.style.boxShadow = `0 5px 20px ${link.corHover}33`; // Brilho suave
        });

        a.addEventListener("mouseleave", () => {
            a.style.borderColor = "var(--card-border)";
            a.style.boxShadow = "var(--card-shadow)";
        });

        // Evento para o efeito Ripple (onda de clique)
        a.addEventListener("click", function(e) {
            criarEfeitoRipple(e, this);
        });

        wrapper.appendChild(a);
    });
}

/* Criação do efeito Ripple nativo */
function criarEfeitoRipple(event, element) {
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const rippleActive = element.getElementsByClassName("ripple")[0];
    if (rippleActive) {
        rippleActive.remove();
    }

    element.appendChild(circle);
}

/* ==========================================
   SISTEMA DE PARTÍCULAS INTERATIVAS (Canvas)
   ========================================== */
function initParticulas() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    
    let arrayParticulas = [];
    const coresParticulas = ["#00f0ff", "#9d4edd", "#00e5ff"];
    
    const mouse = {
        x: null,
        y: null,
        radius: 120 // Raio de influência do mouse
    };

    // Redimensionamento do canvas responsivo
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Rastreia interação do mouse e toque
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.tamanho = Math.random() * 2.5 + 1;
            this.velocidadeX = (Math.random() - 0.5) * 0.6; // Movimento bem suave
            this.velocidadeY = (Math.random() - 0.5) * 0.6;
            this.cor = coresParticulas[Math.floor(Math.random() * coresParticulas.length)];
            this.pesoParallax = Math.random() * 0.3 + 0.1; // Multiplicador de profundidade
        }

        desenhar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
            ctx.fillStyle = this.cor;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.cor;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
        }

        atualizar() {
            this.x += this.velocidadeX;
            this.y += this.velocidadeY;

            // Mantém as partículas dentro da tela
            if (this.x < 0 || this.x > canvas.width) this.velocidadeX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.velocidadeY *= -1;

            // Efeito Parallax/Reação ao mouse
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distancia = Math.hypot(dx, dy);

                if (distancia < mouse.radius) {
                    // Empurra levemente a partícula dependendo da profundidade (parallax)
                    const forca = (mouse.radius - distancia) / mouse.radius;
                    this.x -= (dx / distancia) * forca * this.pesoParallax * 4;
                    this.y -= (dy / distancia) * forca * this.pesoParallax * 4;
                }
            }
            this.desenhar();
        }
    }

    function setup() {
        arrayParticulas = [];
        // Define densidade com base no tamanho da tela
        const totalParticulas = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
        for (let i = 0; i < totalParticulas; i++) {
            arrayParticulas.push(new Particula());
        }
    }

    // Desenha linhas de conexão suaves entre partículas próximas
    function conectar() {
        let opacidadeConexao = 0.15;
        for (let a = 0; a < arrayParticulas.length; a++) {
            for (let b = a; b < arrayParticulas.length; b++) {
                let dx = arrayParticulas[a].x - arrayParticulas[b].x;
                let dy = arrayParticulas[a].y - arrayParticulas[b].y;
                let distancia = Math.hypot(dx, dy);

                if (distancia < 100) {
                    let opacidade = (1 - (distancia / 100)) * opacidadeConexao;
                    ctx.strokeStyle = `rgba(157, 78, 221, ${opacidade})`; // Cor Roxa suave para conexões
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(arrayParticulas[a].x, arrayParticulas[a].y);
                    ctx.lineTo(arrayParticulas[b].x, arrayParticulas[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < arrayParticulas.length; i++) {
            arrayParticulas[i].atualizar();
        }
        conectar();
        requestAnimationFrame(animar);
    }

    setup();
    animar();

    // Reajusta caso mude a orientação/tamanho de tela drasticamente
    window.addEventListener("resize", setup);
}

/* ==========================================
   MODO CLARO / ESCURO (PERSISTENTE)
   ========================================== */
function initTema() {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const icone = toggleBtn.querySelector("i");

    // Verifica preferência anterior salva
    const temaSalvo = localStorage.getItem("tema_preferido") || "dark";
    
    if (temaSalvo === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        icone.className = "fas fa-sun";
    }

    toggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            icone.className = "fas fa-sun";
            localStorage.setItem("tema_preferido", "light");
        } else {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            icone.className = "fas fa-moon";
            localStorage.setItem("tema_preferido", "dark");
        }
    });
}

/* ==========================================
   FUNCIONALIDADE NATIVA DE COMPARTILHAMENTO
   ========================================== */
function initCompartilhar() {
    const shareBtn = document.getElementById("share-btn");
    
    shareBtn.addEventListener("click", async () => {
        const dadosCompartilhamento = {
            title: `${config.nome} | Links Oficiais`,
            text: `Confira os links oficiais do ${config.nome}!`,
            url: window.location.href
        };

        // Se o navegador for mobile/suportar compartilhamento nativo do sistema
        if (navigator.share) {
            try {
                await navigator.share(dadosCompartilhamento);
            } catch (err) {
                console.log("Compartilhamento cancelado.");
            }
        } else {
            // Fallback: Copiar para área de transferência e mostrar Toast
            try {
                await navigator.clipboard.writeText(window.location.href);
                mostrarToast();
            } catch (err) {
                alert("Erro ao copiar link.");
            }
        }
    });
}

function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}