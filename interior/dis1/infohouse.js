import { initKeepers } from '../../assets/js/actors/keeper.js';

const translations = {
    pl: {
        'title-main': 'Dom Informacyjny',
        'subtitle-main': 'Wybierz temat z paneli bocznych.',
        'btn-me': 'O Mnie',
        'btn-city': "O Cirgonheim'ie",
        'exit-label': 'Wyjście',
        'close-book': 'Zamknij',

        'book-me-text': `
Mój styl to geoorganika ornamentalna. To miejsce, w którym matematyczna precyzja geometrii spotyka się z nieprzewidywalnością form organicznych.<br><br>
<b>Forma:</b> Cienkopis, który dyscyplinuje myśl.<br>
<b>Głębia:</b> Markery alkoholowe.<br>
<b>Ornament:</b> Detal, który zmienia wszystko.
        `,

        'book-city-text': `
Cirgonheim to bastion wiedzy i magii, kraina zrodzona w snach, gdzie linie i cienie tworzą fundamenty rzeczywistości.
        `
    },

    en: {
        'title-main': 'Information House',
        'subtitle-main': 'Choose a topic from the side panels.',
        'btn-me': 'About Me',
        'btn-city': 'About Cirgonheim',
        'exit-label': 'Exit',
        'close-book': 'Close',

        'book-me-text': `
My style is ornamental geo-organics – where geometric precision meets organic unpredictability.
        `,

        'book-city-text': `
Cirgonheim is a bastion of knowledge and magic, a realm born in dreams.
        `
    }
};

function updateLanguage(lang) {
    localStorage.setItem('cirgon_lang', lang);

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        const value = translations[lang][key];
        if (value) el.innerHTML = value;
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function fadeOutOnEnter() {
    const overlay = document.getElementById('transition-overlay');
    requestAnimationFrame(() => overlay.style.opacity = '0');
}

function fadeInAndGo(url) {
    const overlay = document.getElementById('transition-overlay');
    overlay.style.opacity = '1';
    setTimeout(() => window.location.href = url, 1000);
}

/* NOWA KSIĄŻKA */

function openBook(id, lang) {
    const overlay = document.getElementById('book-overlay');
    const cornua = document.getElementById('cornua');
    const text = document.getElementById('cornua-text');

    text.innerHTML = translations[lang][`book-${id}-text`] || '';

    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    document.body.style.overflow = 'hidden';

    cornua.style.top = '-120%';
    text.style.opacity = '0';

    requestAnimationFrame(() => overlay.style.opacity = '1');

    void cornua.offsetWidth;

    cornua.style.top = '10%';

    setTimeout(() => {
        text.style.opacity = '1';
    }, 1200);
}

function closeBook() {
    const overlay = document.getElementById('book-overlay');
    const cornua = document.getElementById('cornua');
    const text = document.getElementById('cornua-text');

    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        cornua.style.top = '-120%';
        text.style.opacity = '0';
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {

    fadeOutOnEnter();

    const savedLang = localStorage.getItem('cirgon_lang') || 'pl';
    updateLanguage(savedLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => updateLanguage(btn.dataset.lang));
    });

    document.getElementById('btn-me').addEventListener('click', () => {
        const lang = localStorage.getItem('cirgon_lang') || 'pl';
        openBook('me', lang);
    });

    document.getElementById('btn-city').addEventListener('click', () => {
        const lang = localStorage.getItem('cirgon_lang') || 'pl';
        openBook('city', lang);
    });

    document.getElementById('close-book').addEventListener('click', closeBook);

    document.getElementById('exit-btn').addEventListener('click', e => {
        e.preventDefault();
        fadeInAndGo('../../district/dis1/dis1_gatesquare.html');
    });

    try { initKeepers(); } catch(e) {}

    document.addEventListener('contextmenu', e => e.preventDefault());
});

window.addEventListener('pageshow', e => {
    if (e.persisted) fadeOutOnEnter();
});
