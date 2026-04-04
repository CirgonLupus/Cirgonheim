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
<b>Forma:</b> Cienkopis, który dyscyplinuje myśl i zamyka ją w konkretnych liniach. Tu nie ma miejsca na błędy.<br>
<b>Głębia:</b> Markery alkoholowe, dzięki którym bawię się cieniem i nasyceniem, nadając płaskiej kartce trzeci wymiar.<br>
<b>Ornament:</b> Finałowa zabawa detalem, która potrafi całkowicie przekształcić pierwotne elementy, nadając im biżuteryjny charakter.<br><br>
Inspiracją jest dla mnie wszystko, co dostrzeże moja świadomość – od skomplikowanej struktury neuronu po surowość architektury. Nie chcę jednak dawać Ci gotowych odpowiedzi. Moim celem jest rozbudzenie w Tobie ciekawości. Chcę, abyś patrząc na moje prace, poczuł chęć zajrzenia głębiej, odkrycia ukrytego splotu linii i zadania sobie pytania: „Co widzę tym razem?”.<br><br>
Zapraszam Cię do mojego świata, w którym cienkopis i kolor stają się językiem snów.
        `,
        'book-city-title': "O Cirgonheim'ie",
        'book-city-text': `
Cirgonheim to bastion wiedzy i magii, kraina zrodzona w snach, gdzie linie i cienie tworzą fundamenty rzeczywistości. To miasto, w którym architektura, symbole i ornamentyka nie są tylko dekoracją – są językiem, którym opowiada się historie.<br><br>
Każda dzielnica ma własny charakter, własny rytm i własne przeznaczenie. Plac Bramny jest progiem, Dom Informacyjny – przewodnikiem, a kolejne miejsca odkrywają przed Tobą coraz głębsze warstwy tego świata.<br><br>
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
My style is ornamental geo-organics – a place where the mathematical precision of geometry meets the unpredictability of organic forms. Each work is a process built from three "rituals":<br><br>
<b>Form:</b> Fineliner that disciplines thought and locks it into concrete lines. There is no room for mistakes here.<br>
<b>Depth:</b> Alcohol markers that let me play with shadow and saturation, giving a flat sheet a third dimension.<br>
<b>Ornament:</b> Final play with detail that can completely transform the original elements, giving them a jewel-like character.<br><br>
Inspiration comes from anything my awareness catches – from the complex structure of a neuron to the rawness of architecture. I do not want to give you ready-made answers. My goal is to awaken curiosity in you.<br><br>
I invite you into my world, where fineliner and colour become the language of dreams.
        `,
        'book-city-title': 'About Cirgonheim',
        'book-city-text': `
Cirgonheim is a bastion of knowledge and magic, a realm born in dreams where lines and shadows form the foundations of reality. Each district has its own character, rhythm and purpose. The Gate Square is the threshold, the Information House – a guide, and further places reveal deeper layers of this world.<br><br>
Cirgonheim is not a finished story. It is a space where your imagination becomes a co-author.
        `
    }
};

function updateLanguage(lang) {
    localStorage.setItem('cirgon_lang', lang);

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const value = translations[lang][key];
        if (!value) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = value;
        } else {
            el.innerHTML = value;
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function fadeOutOnEnter() {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) return;

    overlay.style.opacity = '1';
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

    overlay.style.opacity = '0';
    overlay.offsetHeight; // reflow
    overlay.style.opacity = '1';

    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

function openBook(id, lang) {
    const overlay = document.getElementById('book-overlay');
    const titleEl = document.getElementById('book-title');
    const textEl = document.getElementById('book-text');

    if (id === 'me') {
        titleEl.innerHTML = translations[lang]['book-me-title'];
        textEl.innerHTML = translations[lang]['book-me-text'];
    } else if (id === 'city') {
        titleEl.innerHTML = translations[lang]['book-city-title'];
        textEl.innerHTML = translations[lang]['book-city-text'];
    }

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
}

function closeBook() {
    const overlay = document.getElementById('book-overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    // FADE PRZY WEJŚCIU
    fadeOutOnEnter();

    // JĘZYK STARTOWY
    const savedLang = localStorage.getItem('cirgon_lang') || 'pl';
    updateLanguage(savedLang);

    // PRZEŁĄCZNIK JĘZYKA
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            updateLanguage(lang);
        });
    });

    // PRZYCISKI KSIĄŻKI
    document.getElementById('btn-me').addEventListener('click', () => {
        const lang = localStorage.getItem('cirgon_lang') || 'pl';
        openBook('me', lang);
    });

    document.getElementById('btn-city').addEventListener('click', () => {
        const lang = localStorage.getItem('cirgon_lang') || 'pl';
        openBook('city', lang);
    });

    document.getElementById('close-book').addEventListener('click', closeBook);

    // WYJŚCIE Z DOMU INFORMACYJNEGO (FADE → PLAC BRAMNY)
    document.getElementById('exit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        fadeInAndGo('../../district/dis1/dis1_gatesquare.html');
    });

    // KEEPER
    try {
        initKeepers();
    } catch (e) {
        console.error('Keeper error:', e);
    }

    // BLOKADA PPM
    document.addEventListener('contextmenu', e => e.preventDefault());
});

// POWRÓT Z HISTORII
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        fadeOutOnEnter();
    }
});
