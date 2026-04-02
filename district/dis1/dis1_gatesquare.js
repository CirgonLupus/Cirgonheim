import { initCarousel } from '../../assets/js/engine/carousel.js';
import { initWanderers } from '../../assets/js/actors/wanderer.js';
import { initPhasers } from '../../assets/js/actors/phaser.js';
import { initCalmTwisters } from '../../assets/js/actors/calm_twister.js';

const translations = {
    pl: {
        "title-info": "Dom Informacyjny",
        "desc-info": "Miejsce, w którym znajdziesz najważniejsze informacje na temat Cirgona i Cirgonheimu – od historii po aktualności.",
        "title-pina": "Pinakoteka",
        "desc-pina": "Galeria obrazów autorstwa założyciela miasta. W kolekcji znajdują się wyłącznie dzieła wykonane na płótnie."
    },
    en: {
        "title-info": "Information House",
        "desc-info": "A place where you will find the most important information about Cirgon and Cirgonheim – from history to latest news.",
        "title-pina": "Pinacotheca",
        "desc-pina": "A gallery of paintings by the city's founder. The collection features exclusively works created on canvas."
    }
};

function updateLanguage(lang) {
    localStorage.setItem('cirgon_lang', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.innerHTML = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

window.onload = () => {
    const savedLang = localStorage.getItem('cirgon_lang') || 'pl';
    updateLanguage(savedLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.onclick = () => updateLanguage(btn.dataset.lang);
    });

    try {
        const engine = initCarousel(0);
        if (engine) {
            document.getElementById('btn-next').onclick = engine.moveNext;
            document.getElementById('btn-prev').onclick = engine.movePrev;
        }
    } catch(e) { console.error(e); }
    

    /* ============================================================
       FADE-IN PRZY KLIKNIĘCIU BUDYNKU
       ============================================================ */
    const fade = document.getElementById('enter-fade');

    document.querySelectorAll('.house-card').forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                const targetUrl = this.getAttribute('data-url');
                if (targetUrl && targetUrl !== "#") {

                    // uruchamiamy fade-in
                    fade.classList.add('active');

                    // przejście po 0.5 sekundy
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 500);
                }
            }
        });
    });


    /* ============================================================
       FADE-OUT PRZY WEJŚCIU NA STRONĘ
       ============================================================ */
    // zaczynamy od czarnego ekranu
    fade.classList.add('active');

    // po chwili rozjaśniamy
    setTimeout(() => {
        fade.classList.remove('active');
    }, 200);


    /* ============================================================
       AKTORZY
       ============================================================ */
    try { 
        initWanderers(); 
        initPhasers(); 
        initCalmTwisters(); 
    } catch(e) { console.error(e); }

    document.addEventListener('contextmenu', e => e.preventDefault());
};
