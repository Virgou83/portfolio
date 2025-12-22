document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. INJECTION DU FOND */
    if (!document.querySelector('.background-container')) {
        document.body.insertAdjacentHTML("afterbegin", `
        <div class="background-container">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>`);
    }

    /* 2. INJECTION HEADER */
    document.body.insertAdjacentHTML("beforeend", `
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">Virgile Sanchez</a>
            <div class="nav-right">
                <ul class="nav-links">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="presentation.html">À propos</a></li>
                    <li><a href="parcours.html">Parcours</a></li>
                    <li><a href="projets.html">Projets</a></li>
                    <li><a href="competences.html">Compétences</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="theme-toggle">🌙</div>
                <div class="burger"><div class="line1"></div><div class="line2"></div><div class="line3"></div></div>
            </div>
        </div>
    </nav>`);

    /* 3. INJECTION FOOTER */
    document.body.insertAdjacentHTML("beforeend", `
    <div class="notch-footer">
        <div class="notch-trigger"><span class="pulse-dot"></span><span class="notch-label">Contact</span></div>
        <div class="notch-content">
            <div class="notch-brand"><span class="initials">VS</span><span class="fullname">Virgile Sanchez</span></div>
            <div class="notch-sep"></div>
            <div class="notch-info">
                <a href="mailto:svirgile83@gmail.com" class="info-link">📧 svirgile83@gmail.com</a>
                <a href="tel:+33771741373" class="info-link">📱 07 71 74 13 73</a>
            </div>
        </div>
    </div>`);

    initGlobalScripts();
});

function initGlobalScripts() {
    /* MENU BURGER */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if(burger){
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            document.body.classList.toggle('no-scroll');
        });
    }
    document.querySelectorAll('.nav-links li').forEach(l => l.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    }));

    /* --- GESTION DU THÈME AVEC ANIMATION DE NETTOYAGE --- */
    const themeToggle = document.querySelector('.theme-toggle');
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        // 1. Basculer le thème
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // 2. L'INNOVATION : On force l'animation du flou sur TOUTES les cartes
        // On sélectionne tous les éléments en verre du site
        const glassElements = document.querySelectorAll('.hero-glass-card, .card-preview, .comp-card, .timeline-content, .navbar, .notch-footer');
        
        glassElements.forEach(el => {
            // On retire la classe si elle existe déjà (pour pouvoir la relancer)
            el.classList.remove('ios-texture-fix');
            
            // Astuce pour forcer le navigateur à comprendre qu'on a enlevé la classe (Reflow)
            void el.offsetWidth;
            
            // On ajoute la classe qui lance l'animation de 0.3s
            el.classList.add('ios-texture-fix');
        });
    });

    /* ACTIVE LINKS, FOOTER, SCROLL */
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(a => {
        if(a.getAttribute('href') === path) a.classList.add('active');
    });

    const notch = document.querySelector('.notch-footer');
    if(notch) notch.addEventListener('click', () => notch.classList.toggle('active'));
    
    /* SCROLL REVEAL & ANCHORS */
    const checkReveal = () => document.querySelectorAll('.reveal').forEach(r => { 
        if(r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add('active'); 
    });
    window.addEventListener('scroll', checkReveal);
    checkReveal();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const isMobile = window.innerWidth <= 768;
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: isMobile ? 'start' : 'center'
                });
            }
        });
    });
}