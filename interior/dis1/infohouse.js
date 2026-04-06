import { initKeepers } from '../../assets/js/actors/keeper.js';

const translations = {
    pl: {
        'title-main': 'Dom Informacyjny',
        'subtitle-main': 'Wybierz temat z paneli bocznych.',
        'btn-me': 'O Mnie',
        'btn-city': "O Cirgonheim'ie",
        'exit-label': 'Wyjście',
        'close-book': 'Zamknij',

        'book-me-title': 'Cirgon Tyberius Marcus Lupus',
        'book-me-text': `
Mój styl to geoorganika ornamentalna. To miejsce, w którym matematyczna precyzja geometrii spotyka się z nieprzewidywalnością form organicznych. Każda praca to proces składający się z trzech "rytuałów":<br><br>
<b>Forma:</b> Cienkopis, który dyscyplinuje myśl i zamyka ją w konkretnych liniach.<br>
<b>Głębia:</b> Markery alkoholowe, dzięki którym bawię się cieniem i nasyceniem.<br>
<b>Ornament:</b> Finałowa zabawa detalem, która potrafi całkowicie przekształcić pierwotne elementy.<br><br>
Inspiracją jest dla mnie wszystko, co dostrzeże moja świadomość – od struktury neuronu po architekturę.<br><br>
Zapraszam Cię do mojego świata, w którym cienkopis i kolor stają się językiem snów.
        `,

        'book-city-title': "O Cirgonheim'ie",
        'book-city-text': `
Cirgonheim to bastion wiedzy i magii, kraina zrodzona w snach, gdzie linie i cienie tworzą fundamenty rzeczywistości.<br><br>
Plac Bramny jest progiem, Dom Informacyjny – przewodnikiem, a kolejne miejsca odkrywają coraz głębsze warstwy tego świata.<br><br>
Cirgonheim nie jest gotową opowieścią. To przestrzeń, w której Twoja wyobraźnia staje się współautorem.
        `
    },

    en: {
        'title-main': 'Information House',
        'subtitle-main': 'Choose a topic from the side panels.',
        'btn-me': 'About Me',
        'btn-city': 'About Cirgonheim',
        'exit-label': 'Exit',
        'close-book': 'Close',

        'book-me-title': 'Cirgon Tyberius Marcus Lupus',
        'book-me-text': `
My style is ornamental geo-organics – where geometric precision meets organic unpredictability.<br><br>
<b>Form:</b> Fineliner that disciplines thought.<br>
<b>Depth:</b> Alcohol markers adding dimension.<br>
<b>Ornament:</b> Final detailing that transforms the whole.<br><br>
Inspiration comes from anything my awareness catches – from neurons to architecture.<br><br>
Welcome to my world, where fineliner and colour become the language of dreams.
        `,

        'book-city-title': 'About Cirgonheim',
        'book-city-text': `
Cirgonheim is a bastion of knowledge and magic, a realm born in dreams where lines and shadows shape reality.<br><br>
The Gate Square is the threshold, the Information House – a guide, and further places reveal deeper layers.<br><br>
Cirgonheim is not a finished story. It is a space where your imagination becomes a co-author.
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

// NOWA LOGIKA KSIĄŻKI: UMBILICUS + CORNUA + TEKST

function openBook(id, lang) {
    const overlay = document.getElementById('book-overlay');
    const imgCornua = document.getElementById('book-cornua');
    const cornuaText = document.getElementById('book-cornua-text');

    // tekst na cornua z tłumaczeń
    cornuaText.innerHTML = translations[lang][`book-${id}-text`] || '';

    // reset stanu
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    overlay.style.opacity = '0';

    imgCornua.style.top = '-100%';
    cornuaText.style.opacity = '0';

    // fade-in overlay
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // wymuszenie reflow, żeby transition top zadziałał
    void imgCornua.offsetWidth;

    // 1. Cornua wjeżdża od góry
    imgCornua.style.top = '0';

    // 2. Po zakończeniu animacji pojawia się tekst
    setTimeout(() => {
        cornuaText.style.opacity = '1';
    }, 1200); // tyle samo co transition top w CSS
}

function closeBook() {
    const overlay = document.getElementById('book-overlay');
    const imgCornua = document.getElementById('book-cornua');
    const cornuaText = document.getElementById('book-cornua-text');

    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        imgCornua.style.top = '-100%';
        cornuaText.style.opacity = '0';
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
