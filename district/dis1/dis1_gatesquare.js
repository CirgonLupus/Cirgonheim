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

window.addEventListener('load', () => {
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
    } catch (e) { console.error(e); }

    const fade = document.getElementById('enter-fade');

    /* ============================
       FADE-OUT PRZY WEJŚCIU NA PLAC
       ============================ */
    if (fade) {
        // start: czarny (opacity: 1)
        // po chwili: scena widoczna
        setTimeout(() => {
            fade.classList.add('fade-hidden');
        }, 50); // małe opóźnienie, żeby transition zaskoczył
    }

    /* ============================
       FADE-IN PRZY KLIKNIĘCIU DOMU
       ============================ */
    document.querySelectorAll('.house-card').forEach(card => {
        card.addEventListener('click', function () {
            if (!this.classList.contains('active')) return;

            const targetUrl = this.getAttribute('data-url');
            if (!targetUrl || targetUrl === "#") return;

            if (fade) {
                // z widocznej sceny → czarny
                fade.classList.remove('fade-hidden');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 650); // dopasowane do 0.6s z CSS
            } else {
                window.location.href = targetUrl;
            }
        });
    });

    try {
        initWanderers();
        initPhasers();
        initCalmTwisters();
    } catch (e) { console.error(e); }

    document.addEventListener('contextmenu', e => e.preventDefault());
});
