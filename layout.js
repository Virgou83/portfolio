/* ==========================================================================
   Fichier: layout.js - VERSION STABLE + FIX MOBILE (CLIC CARTES)
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

    // 1. INJECTION DU HEADER (MENU DE NAVIGATION)
    // On garde ta version stable "Icone + Nom" qui ne bug pas
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
                    <a href="https://www.linkedin.com/in/virgile-sanchez-b0780729b/" target="_blank" class="info-link-small">LinkedIn</a>
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

    // 6. INTELLIGENCE DU NOTCH FOOTER
    const notch = document.getElementById('notchFooter');
    if (notch) {
        // Clic sur le notch pour ouvrir/fermer
        notch.addEventListener('click', function(e) {
            e.stopPropagation(); 
            this.classList.toggle('active');
        });

        // Clic sur un lien à l'intérieur -> Ferme le notch
        const notchLinks = notch.querySelectorAll('a');
        notchLinks.forEach(link => {
            link.addEventListener('click', () => {
                notch.classList.remove('active');
            });
        });

        // Clic n'importe où ailleurs sur la page -> Ferme le notch
        document.addEventListener('click', function(e) {
            if (notch.classList.contains('active')) {
                // Si l'élément cliqué n'est pas le notch ni un de ses enfants
                if (!notch.contains(e.target)) {
                    notch.classList.remove('active');
                }
            }
        });
    }

    // ============================================================
    // 7. GESTION TACTILE DES CARTES (C'EST L'AJOUT IMPORTANT)
    // ============================================================
    // Cela permet de cliquer sur les cartes "Projets" et "Compétences" sur mobile pour voir les boutons
    
    const cards = document.querySelectorAll('.project-card, .comp-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            
            // Si l'utilisateur clique sur le lien/bouton à l'intérieur, on ne fait rien (on laisse le lien s'ouvrir)
            if (e.target.tagName === 'A' || e.target.closest('a')) return;

            // Sinon, c'est qu'il clique sur la carte pour l'ouvrir
            
            // 1. On ferme toutes les autres cartes (pour éviter d'en avoir trop d'ouvertes)
            cards.forEach(c => {
                if (c !== this) c.classList.remove('mobile-active');
            });

            // 2. On bascule l'état de la carte actuelle (Ouvrir/Fermer)
            this.classList.toggle('mobile-active');
        });
    });
// ============================================================
    // 8. INERTIAL CURSOR FOLLOWER (Le Blob qui suit la souris)
    // ============================================================
    
    // On vérifie qu'on n'est pas sur mobile pour économiser des ressources
    if (window.matchMedia("(min-width: 769px)").matches) {
        
        // 1. Création dynamique du blob (pas besoin de toucher au HTML)
        const cursorBlob = document.createElement('div');
        cursorBlob.classList.add('cursor-follower');
        document.body.appendChild(cursorBlob);

        // 2. Variables de position
        let mouseX = 0;
        let mouseY = 0;
        let blobX = 0;
        let blobY = 0;

        // 3. Écouteur de mouvement de souris
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Petit effet : le blob apparait quand on bouge, disparait si on sort
            cursorBlob.style.opacity = 1;
        });

        document.addEventListener('mouseout', () => {
            cursorBlob.style.opacity = 0;
        });

        // 4. Boucle d'animation (Physique fluide)
       function animateBlob() {
            const speed = 0.12; // Tu peux garder cette vitesse, ou mettre 0.08 pour plus de lourdeur
            
            blobX += (mouseX - blobX) * speed;
            blobY += (mouseY - blobY) * speed;

            // --- MODIFIE CETTE LIGNE ---
            // On soustrait 225 (la moitié de 450px) pour que le centre du blob soit sur la souris
            cursorBlob.style.transform = `translate3d(${blobX - 225}px, ${blobY - 225}px, 0)`; 
            
            requestAnimationFrame(animateBlob);
        }

        // Lancement de la boucle
        animateBlob();
    }

});