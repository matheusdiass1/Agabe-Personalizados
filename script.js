// ========== MENU MOBILE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== ROLAGEM SUAVE (descontando a altura do header) ==========
const header = document.getElementById('header');

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.getElementById(href.substring(1));
        if (!target) return;

        e.preventDefault();
        window.scrollTo({
            top: target.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    });
});

// ========== EVENTOS DE SCROLL (header, link ativo e botão de topo) ==========
const sections = document.querySelectorAll('section[id]');
const scrollTopBtn = document.getElementById('scrollTop');

function onScroll() {
    const y = window.scrollY;

    // Sombra do header
    header.classList.toggle('scrolled', y > 50);

    // Botão de voltar ao topo
    scrollTopBtn.classList.toggle('visible', y > 500);

    // Link ativo no menu
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
        if (link) {
            link.classList.toggle('active', y > top && y <= top + section.offsetHeight);
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== ANIMAÇÃO DE ENTRADA DOS CARDS ==========
// Usa classes CSS (.reveal / .is-visible) em vez de estilo inline,
// para não atrapalhar o efeito de hover dos cards.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        el.classList.add('is-visible');
        revealObserver.unobserve(el);

        // Depois que a animação termina, devolve o controle ao CSS normal
        setTimeout(() => el.classList.remove('reveal', 'is-visible'), 700);
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.servico-card, .info-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

