document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. HEADER INJECTION (BOUTON ACCESSIBLE MOBILE) --- */
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

                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </div>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    /* --- 2. FOOTER INJECTION --- */
    const footerHTML = `
    <div class="notch-footer">
        <div class="notch-trigger">
            <span class="pulse-dot"></span>
            <span class="notch-label">Contact</span>
        </div>
        <div class="notch-content">
            <div class="notch-brand">
                <span class="initials">VS</span>
                <span class="fullname">Virgile Sanchez</span>
            </div>
            <div class="notch-sep"></div>
            <div class="notch-info">
                <a href="mailto:svirgile83@gmail.com" class="info-link"><span class="icon">📧</span> svirgile83@gmail.com</a>
                <a href="tel:+33771741373" class="info-link"><span class="icon">📱</span> 07 71 74 13 73</a>
                <div class="link-row">
                    <a href="https://www.linkedin.com/in/virgile-sanchez-b0780729b/" target="_blank" class="info-link-small">LinkedIn &nearr;</a>
                    <a href="mon-cv.pdf" target="_blank" class="info-link-small highlight">CV &darr;</a>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    /* --- 3. ACTIVE LINK LOGIC --- */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    /* --- 4. INIT FONCTIONS --- */
    initGlobalScripts();
});

function initGlobalScripts() {
    /* BURGER MENU */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    if(burger){
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            body.classList.toggle('no-scroll');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            body.classList.remove('no-scroll');
        });
    });

    /* DARK MODE TOGGLE (AVEC CORRECTIF MOBILE "REPAINT") */
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    // Appliquer le thème sauvegardé au chargement
    if(savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        // 1. Basculer la classe
        body.classList.toggle('dark-mode');

        // 2. Changer l'icône et sauvegarder
        if(body.classList.contains('dark-mode')){
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }

        // 3. --- FIX REPAINT MOBILE (ANTI-GLITCH) ---
        // On force le navigateur à redessiner l'arrière-plan pour éviter les bugs de texture
        const bg = document.querySelector('.background-container');
        if (bg) {
            bg.style.display = 'none'; // On cache...
            bg.offsetHeight;           // On force le calcul (Reflow)...
            bg.style.display = 'block';// On réaffiche instantanément.
        }
    });

    /* NOTCH FOOTER & SCROLL REVEAL */
    const notch = document.querySelector('.notch-footer');
    if(notch) {
        notch.addEventListener('click', (e) => { e.stopPropagation(); notch.classList.toggle('active'); });
        document.addEventListener('click', () => { notch.classList.remove('active'); });
    }
    const checkReveal = () => { document.querySelectorAll('.reveal').forEach(r => { if(r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add('active'); }); };
    window.addEventListener('scroll', checkReveal); checkReveal();
}