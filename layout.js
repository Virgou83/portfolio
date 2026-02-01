/* ==========================================================================
   Fichier: layout.js - GESTION GLOBALE + INTELLIGENCE DU FOOTER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. INJECTION GLOBALE DU FOND ANIMÉ (BLOBS)
    let bgContainer = document.querySelector('.background-container');
    const blobsHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    `;

    if (bgContainer) {
        bgContainer.innerHTML = blobsHTML;
    } else {
        bgContainer = document.createElement('div');
        bgContainer.classList.add('background-container');
        bgContainer.innerHTML = blobsHTML;
        document.body.prepend(bgContainer);
    }

    // 1. INJECTION DU HEADER
    const headerHTML = `
    <nav class="navbar">
        <div class="nav-container">

<a href="index.html" class="logo">
    <img src="favicon.png" alt="VS Logo" class="logo-icon">
    <span class="logo-text">Virgile Sanchez</span>
</a>
            <div class="nav-right">
                <ul class="nav-links">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="parcours.html">Parcours</a></li>
                    <li><a href="competences.html">Compétences</a></li>
                    <li><a href="projets.html">Projets</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </div>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 2. GESTION DE LA CLASSE "ACTIVE" DU MENU
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === "" && link.getAttribute('href') === "index.html")) {
            link.classList.add('active');
        }
    });

    // 3. INJECTION DU FOOTER (AVEC TÉLÉPHONE)
    const footerHTML = `
    <div class="notch-footer" id="notchFooter">
        <div class="notch-trigger">
            <div class="pulse-dot"></div>
            <span class="notch-label">Contact</span>
        </div>
        <div class="notch-content">
            <div class="notch-brand">
                <span class="initials">VS</span>
                <span class="fullname">Virgile Sanchez</span>
            </div>
            <div class="notch-sep"></div>
            <div class="notch-info">
                <a href="tel:0771741373" class="info-link">
                    <span class="icon">📱</span> 07 71 74 13 73
                </a>
                
                <a href="mailto:svirgile83@gmail.com" class="info-link">
                    <span class="icon">📧</span> Me contacter
                </a>

                <div class="link-row">
                    <a href="https://www.linkedin.com/in/virgile-sanchez" target="_blank" class="info-link-small">LinkedIn</a>
                    <a href="mon-cv.pdf" target="_blank" class="info-link-small highlight">CV PDF</a>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 4. LOGIQUE MOBILE (Burger)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const body = document.body;

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            body.classList.toggle('no-scroll');
        });
    }

    // 5. ANIMATION REVEAL
    window.addEventListener('scroll', reveal);
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100;
            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active');
            }
        }
    }
    reveal();

    // ============================================================
    // 6. INTELLIGENCE DU NOTCH FOOTER (NOUVEAU)
    // ============================================================
    const notch = document.getElementById('notchFooter');
    if (notch) {
        
        // A. Clic sur le notch : on ouvre/ferme (avec stopPropagation pour ne pas déclencher le clic document)
        notch.addEventListener('click', function(e) {
            e.stopPropagation(); 
            this.classList.toggle('active');
        });

        // B. Clic sur un lien À L'INTÉRIEUR (ex: CV, Tel) : on ferme le notch
        const notchLinks = notch.querySelectorAll('a');
        notchLinks.forEach(link => {
            link.addEventListener('click', () => {
                notch.classList.remove('active');
            });
        });

        // C. Clic AILLEURS sur la page : on ferme le notch
        document.addEventListener('click', function(e) {
            if (notch.classList.contains('active')) {
                // Si l'élément cliqué n'est pas le notch ni un de ses enfants
                if (!notch.contains(e.target)) {
                    notch.classList.remove('active');
                }
            }
        });
    }
});