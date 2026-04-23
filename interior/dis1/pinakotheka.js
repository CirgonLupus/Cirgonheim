/* ===========================
   PROTEKCJA — FADE-IN
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("transition-overlay");
    setTimeout(() => overlay.classList.add("fade-out"), 50);

    initLanguage();
    initSeries();
    initCarousel();
    initDescriptionPanel();
    preloadImages();
});

/* BLOKADA PRAWEGO KLIKU */
document.addEventListener("contextmenu", e => e.preventDefault());

/* BLOKADA POWROTU Z CACHE */
window.addEventListener("pageshow", (event) => {
    if (event.persisted) window.location.reload();
});

/* ===========================
   SYSTEM JĘZYKOWY
=========================== */
const translations = {
    pl: {
        title: "Pinakoteka",
        series_worlds: "Światy równo‑odległe",
        series_spells: "Zaklęcia",
        desc_title: "Opis",
        close: "Zamknij",
        back: "Powrót"
    },
    en: {
        title: "Pinacotheca",
        series_worlds: "Equidistant Worlds",
        series_spells: "Spells",
        desc_title: "Description",
        close: "Close",
        back: "Back"
    }
};

function initLanguage() {
    const savedLang = localStorage.getItem("cirgon_lang") || "pl";
    updateLanguage(savedLang);

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === savedLang);

        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            localStorage.setItem("cirgon_lang", lang);
            updateLanguage(lang);

            document.querySelectorAll(".lang-btn").forEach(b =>
                b.classList.toggle("active", b.dataset.lang === lang)
            );
        });
    });
}

function updateLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.dataset.key;
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}

/* ===========================
   SERIE — LISTA OBRAZÓW
   (z obsługą obrotu)
=========================== */
const series = {
    swiaty: [
        { src: "../../assets/img/ro01.jpg", rotate: 0 },
        { src: "../../assets/img/ro02.jpg", rotate: -90 },
        { src: "../../assets/img/ro03.jpg", rotate: 0 },
        { src: "../../assets/img/ro04.jpg", rotate: 0 },
        { src: "../../assets/img/ro05.jpg", rotate: -90 },
        { src: "../../assets/img/ro06.jpg", rotate: 0 },
        { src: "../../assets/img/ro07.jpg", rotate: 0 }
    ],
    zaklecia: [
        { src: "../../assets/img/sp01.jpg", rotate: 0 },
        { src: "../../assets/img/sp02.jpg", rotate: 0 },
        { src: "../../assets/img/sp03.jpg", rotate: -90 },
        { src: "../../assets/img/sp04.jpg", rotate: 0 },
        { src: "../../assets/img/sp05.jpg", rotate: 0 },
        { src: "../../assets/img/sp06.jpg", rotate: -90 },
        { src: "../../assets/img/sp07.jpg", rotate: 0 },
        { src: "../../assets/img/sp08.jpg", rotate: 0 },
        { src: "../../assets/img/sp09.jpg", rotate: -90 }
    ]
};

let currentSeries = "swiaty";
let currentIndex = 0;

/* ===========================
   PRELOAD OBRAZÓW
=========================== */
function preloadImages() {
    Object.values(series).flat().forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
}

/* ===========================
   INICJALIZACJA SERII
=========================== */
function initSeries() {
    document.querySelectorAll(".series-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".series-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            currentSeries = btn.dataset.series;
            currentIndex = 0;
            updateCarouselImage();
        });
    });
}

/* ===========================
   KARUZELA
=========================== */
function initCarousel() {
    document.getElementById("prev-btn").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + series[currentSeries].length) % series[currentSeries].length;
        updateCarouselImage();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % series[currentSeries].length;
        updateCarouselImage();
    });

    updateCarouselImage();
}

/* ===========================
   ŁADOWANIE OBRAZU + OBRÓT
=========================== */
function updateCarouselImage() {
    const img = document.getElementById("carousel-image");
    img.classList.remove("visible");

    const item = series[currentSeries][currentIndex];
    const newImg = new Image();

    newImg.onload = () => {
        img.src = newImg.src;

        // OBRÓT OBRAZU
        img.style.transform = `rotate(${item.rotate}deg)`;

        img.classList.add("visible");
    };

    newImg.src = item.src + "?v=" + Math.random();
}

/* ===========================
   PANEL OPISU
=========================== */
function initDescriptionPanel() {
    const panel = document.getElementById("description-panel");
    const closeBtn = document.getElementById("close-desc");

    document.getElementById("carousel-image").addEventListener("click", () => {
        panel.classList.add("open");
        document.getElementById("desc-text").textContent =
            "Tutaj możesz dodać opis obrazu. (Możemy później zrobić system opisów per obraz.)";
    });

    closeBtn.addEventListener("click", () => {
        panel.classList.remove("open");
    });
}

/* ===========================
   POWRÓT NA PLAC BRAMNY
=========================== */
document.getElementById("back-btn").addEventListener("click", () => {
    const overlay = document.getElementById("transition-overlay");
    overlay.classList.remove("fade-out");
    overlay.style.opacity = "1";

    setTimeout(() => {
        window.location.href = "../../district/dis1/dis1_gatesquare.html";
    }, 300);
});
