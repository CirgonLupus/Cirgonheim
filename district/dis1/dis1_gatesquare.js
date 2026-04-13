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

/* === FADE: TYLKO NA OPACITY, BEZ KLAS === */

function fadeOutOnEnter() {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) return;

    // start: czarny
    overlay.style.opacity = '1';

    // upewniamy się, że transition działa
    overlay.style.transition = 'opacity 1s ease';

    // następna klatka → fade do 0
    requestAnimationFrame(() => {
        overlay.style.opacity = '0';
    });
}

function fadeInAndGo(url) {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) {
        window.location.href = url;
        return;
    }

    // start: przezroczysty
    overlay.style.transition = 'opacity 1s ease';
    overlay.style.opacity = '0';

    // wymuszenie reflow, żeby przeglądarka „złapała” stan początkowy
    overlay.offsetHeight;

    // teraz dopiero fade do czerni
    overlay.style.opacity = '1';

    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

/* === START STRONY === */

document.addEventListener('DOMContentLoaded', () => {
    // fade-out przy wejściu (działa z bramy i z domku)
    fadeOutOnEnter();

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
    } catch (e) {}

    document.querySelectorAll('.house-card').forEach(card => {
        card.addEventListener('click', function () {
            if (!this.classList.contains('active')) return;

            const url = this.getAttribute('data-url');
            if (!url || url === "#") return;

            fadeInAndGo(url);
        });
    });

    try {
        initWanderers();
        initPhasers();
        initCalmTwisters();
    } catch (e) {}

    document.addEventListener('contextmenu', e => e.preventDefault());
});

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        fadeOutOnEnter();
    }
});
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 4; 
    const y = (e.clientY / window.innerHeight - 0.5) * 4;

    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});
