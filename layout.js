document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. INJECTION DU FOND (Si pas déjà présent) */
    if (!document.querySelector('.background-container')) {
        const bgHTML = `
        <div class="background-container">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>`;
        document.body.insertAdjacentHTML("afterbegin", bgHTML);
    }

    /* 2. INJECTION DU HEADER */
    const headerHTML = `
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
                <div class="theme-toggle" title="Changer le thème">🌙</div>
                <div class="burger"><div class="line1"></div><div class="line2"></div><div class="line3"></div></div>
            </div>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML("beforeend", headerHTML);

    /* 3. INJECTION DU FOOTER */
    const footerHTML = `
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
    </div>`;
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    /* 4. INITIALISATION */
    initGlobalScripts();
});

function initGlobalScripts() {
    /* MENU BURGER */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger){
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            document.body.classList.toggle('no-scroll');
        });
    }
    navLinks.forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
    }));

    /* MODE SOMBRE (SIMPLIFIÉ) */
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Appliquer le thème sauvegardé
    if(savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // LE CORRECTIF SIMPLE ET EFFICACE
        // On force le navigateur à redessiner le fond en le cachant une micro-seconde
        const bg = document.querySelector('.background-container');
        if (bg) {
            bg.style.display = 'none';
            bg.offsetHeight; // Force le recalcul
            bg.style.display = 'block';
        }
    });

    /* AUTRES (Scroll, Active links...) */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    const notch = document.querySelector('.notch-footer');
    if(notch) notch.addEventListener('click', () => notch.classList.toggle('active'));
    
    const checkReveal = () => document.querySelectorAll('.reveal').forEach(r => { 
        if(r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add('active'); 
    });
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}