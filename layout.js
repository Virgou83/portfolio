/* ==========================================================================
   Fichier: layout.js - GESTION GLOBALE (Layout + Header/Footer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. INJECTION GLOBALE DU FOND ANIMÉ (BLOBS)
    // On cible le conteneur. S'il n'existe pas, on le crée.
    let bgContainer = document.querySelector('.background-container');
    
    // Le code HTML des blobs (récupère les couleurs définies dans style.css)
    const blobsHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    `;

    if (bgContainer) {
        // Si le conteneur existe (même vide comme sur presentation.html), on injecte les blobs
        bgContainer.innerHTML = blobsHTML;
    } else {
        // S'il n'existe pas du tout sur la page, on le crée et l'ajoute au début du body
        bgContainer = document.createElement('div');
        bgContainer.classList.add('background-container');
        bgContainer.innerHTML = blobsHTML;
        document.body.prepend(bgContainer);
    }

    // 1. INJECTION DU HEADER (MENU DE NAVIGATION)
    const headerHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">Virgile SANCHEZ</a>
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

    // On insère le header au tout début du body (juste après le background si inséré)
    // L'ordre visuel est géré par le CSS (z-index), donc pas de conflit.
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 2. GESTION DE LA CLASSE "ACTIVE"
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Petite sécurité pour gérer les ancres (ex: index.html#projets)
        if (link.getAttribute('href') === currentPage || (currentPage === "" && link.getAttribute('href') === "index.html")) {
            link.classList.add('active');
        }
    });

    // 3. INJECTION DU FOOTER (NOTCH FOOTER)
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

    // 4. LOGIQUE MOBILE
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

    const notch = document.getElementById('notchFooter');
    if (notch) {
        notch.addEventListener('click', function() {
            this.classList.toggle('active');
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
});