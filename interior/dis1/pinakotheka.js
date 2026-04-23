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
});

/* ===========================
   BLOKADA PRAWEGO KLIKU
=========================== */
document.addEventListener("contextmenu", e => e.preventDefault());

/* ===========================
   BLOKADA POWROTU Z CACHE
=========================== */
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.reload();
    }
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
        close: "Zamknij"
    },
    en: {
        title: "Pinacotheca",
        series_worlds: "Equidistant Worlds",
        series_spells: "Spells",
        desc_title: "Description",
        close: "Close"
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
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

/* ===========================
   SERIE — LISTA OBRAZÓW
=========================== */
const series = {
    swiaty: [
        "../../assets/img/ro01.jpg",
        "../../assets/img/ro02.jpg",
        "../../assets/img/ro03.jpg",
        "../../assets/img/ro04.jpg",
        "../../assets/img/ro05.jpg",
        "../../assets/img/ro06.jpg",
        "../../assets/img/ro07.jpg"
    ],
    zaklecia: [
        "../../assets/img/sp01.jpg",
        "../../assets/img/sp02.jpg",
        "../../assets/img/sp03.jpg",
        "../../assets/img/sp04.jpg",
        "../../assets/img/sp05.jpg",
        "../../assets/img/sp06.jpg",
        "../../assets/img/sp07.jpg",
        "../../assets/img/sp08.jpg",
        "../../assets/img/sp09.jpg"
    ]
};

let currentSeries = "swiaty";
let currentIndex = 0;

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
        currentIndex--;
        if (currentIndex < 0) currentIndex = series[currentSeries].length - 1;
        updateCarouselImage();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= series[currentSeries].length) currentIndex = 0;
        updateCarouselImage();
    });

    updateCarouselImage();
}

function updateCarouselImage() {
    const img = document.getElementById("carousel-image");
    img.classList.remove("visible");

    setTimeout(() => {
        img.src = series[currentSeries][currentIndex];
        img.classList.add("visible");
    }, 200);
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
