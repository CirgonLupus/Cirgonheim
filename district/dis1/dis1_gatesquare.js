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

function fadeOutOnEnter(fade) {
    // start: czarny
    fade.classList.remove('hidden');

    // fade-out: czarny → scena
    requestAnimationFrame(() => {
        fade.classList.add('hidden');
    });
}

function fadeInAndGo(fade, url) {
    // 1. Ustaw overlay na stan początkowy animacji: opacity 0
    fade.classList.add('hidden'); // scena → czarny (start animacji)

    // 2. Wymuś reflow
    fade.style.transition = 'none';
    fade.offsetHeight;
    fade.style.transition = '';

    // 3. Odpal animację fade-in: opacity 0 → 1
    requestAnimationFrame(() => {
        fade.classList.remove('hidden'); // animacja do czerni
    });

    // 4. Przejście po animacji
    setTimeout(() => {
        window.location.href = url;
    }, 650);
}

function initPage() {
    const fade = document.getElementById('enter-fade');

    fadeOutOnEnter(fade);

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

            fadeInAndGo(fade, url);
        });
    });

    try {
        initWanderers();
        initPhasers();
        initCalmTwisters();
    } catch (e) {}

    document.addEventListener('contextmenu', e => e.preventDefault());
}

window.addEventListener('load', initPage);
window.addEventListener('pageshow', initPage);
