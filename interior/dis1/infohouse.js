import { initKeepers } from '../../assets/js/actors/keeper.js';

const translations = {
    pl: {
        'title-main': 'Dom Informacyjny',
        'subtitle-main': 'Wybierz temat z paneli bocznych.',
        'btn-me': 'O Mnie: Cirgon',
        'btn-city': "O Cirgonheim'ie",
        'exit-label': 'Wyjście',
        'close-book': 'Zamknij',

        'book-me-text': `
Swoje dzieła tworzę jako Cirgon Tyberius Marcus Lupus. Zajmuję się głównie geoorganiką ornamentalną. Tak nazywam swój styl, w którym matematyczna precyzja geometrii spotyka się z nieprzewidywalnością form organicznych. Każda praca to proces składający się z trzech "rytuałów":<br><br>
<b>Forma:</b> Cienkopis, który dyscyplinuje myśl i zamyka ją w konkretnych liniach. Tu nie ma miejsca na błędy.<br>
<b>Głębia:</b> Markery alkoholowe, dzięki którym bawię się cieniem i nasyceniem, nadając płaskiej kartce trzeci wymiar.<br>
<b>Ornament:</b> Finałowa zabawa detalem, która potrafi całkowicie przekształcić pierwotne elementy, nadając im biżuteryjny charakter.<br><br>
Inspiracją jest dla mnie wszystko, co dostrzeże moja świadomość – od skomplikowanej struktury neuronu po surowość architektury. Nie chcę jednak dawać Ci gotowych odpowiedzi. Moim celem jest rozbudzenie w Tobie ciekawości. Chcę, abyś patrząc na moje prace, poczuł chęć zajrzenia głębiej, odkrycia ukrytego splotu linii i zadania sobie pytania: „Co widzę tym razem?”.<br><br>
Zapraszam Cię do mojego świata, w którym cienkopis i kolor stają się językiem snów.
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
I create my works as Cirgon Tyberius Marcus Lupus. My focus is ornamental geo-organics — that’s what I call my style, where the mathematical precision of geometry meets the unpredictability of organic forms. Every piece is a process built on three “rituals”:<br><br>
<b>Form:</b> A fineliner that disciplines thought and locks it into deliberate lines. There is no room for mistakes here.<br>
<b>Depth:</b> Alcohol markers that let me play with shadow and saturation, giving a flat sheet of paper a third dimension.<br>
<b>Ornament:</b> The final dance of detail, capable of transforming the original elements entirely and giving them a jewel‑like character.<br><br>
My inspiration is anything my awareness manages to catch — from the intricate structure of a neuron to the rawness of architecture. But I don’t want to hand you ready-made answers. My goal is to spark your curiosity. I want you, when looking at my work, to feel the urge to look deeper, to uncover the hidden weave of lines, and to ask yourself: “What do I see this time?”<br><br>
I invite you into my world, where fineliner and color become the language of dreams.
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

/* UMBILICUS – skala + pozycja */

function setUmbilicus({ scale = 2, x = 0, y = 0 } = {}) {
    const umb = document.getElementById('umbilicus');
    if (!umb) return;

    umb.style.transform = `
        translateX(-50%)
        translate(${x}px, ${y}px)
        scale(${scale})
    `;
}

/* CORNUA – skala + pozycja */

function setCornua({ scale = 1.7, x = 0, y = 0 } = {}) {
    const cor = document.getElementById('cornua');
    if (!cor) return;

    cor.style.transform = `
        translateX(-50%)
        translate(${x}px, ${y}px)
        scale(${scale})
    `;
}

/* SHADOWBOX – sterowanie (x, y, width, height) */

function setShadowbox({ x = '50%', y = 0, width = '80%', height = 140 } = {}) {
    const box = document.getElementById('shadowbox');
    if (!box) return;

    box.style.top = typeof y === 'number' ? `${y}px` : y;

    if (typeof x === 'number') {
        box.style.left = `${x}px`;
        box.style.transform = 'translateX(0)';
    } else {
        box.style.left = x;
        box.style.transform = 'translateX(-50%)';
    }

    box.style.width = typeof width === 'number' ? `${width}px` : width;
    box.style.height = typeof height === 'number' ? `${height}px` : height;
}

/* OTWIERANIE KSIĄŻKI */

function openBook(id, lang) {
    const overlay = document.getElementById('book-overlay');
    const cornua = document.getElementById('cornua');
    const text = document.getElementById('cornua-text');

    // startowe ustawienia
    setUmbilicus({ scale: 2, x: 0, y: 0 });
    setCornua({ scale: 1.7, x: 0, y: 0 });

    // shadowbox na górze
    //setShadowbox({
    //    x: '50%',
    //    y: 0,
    //    width: '80%',
    //    height: 140
    //});

    text.innerHTML = translations[lang][`book-${id}-text`] || '';

    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    document.body.style.overflow = 'hidden';

    // cornua startuje wysoko nad ekranem
    cornua.style.top = '-120%';
    text.style.opacity = '0';

    requestAnimationFrame(() => overlay.style.opacity = '1');

    // wymuszenie reflow
    void cornua.offsetWidth;

    // cornua wjeżdża z góry na docelową pozycję
    cornua.style.top = '-50%';

    setTimeout(() => {
        text.style.opacity = '1';
    }, 1200);
}

/* ZAMYKANIE KSIĄŻKI */

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
