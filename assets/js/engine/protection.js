/* ============================================
   CIRGONHEIM SECURITY MODULE — LEVEL 2
   Global protection for images and assets
   ============================================ */

/* 1. Blokada przeciągania elementów <img> */
document.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") e.preventDefault();
});

/* 2. Blokada przeciągania całej strony (drag&drop) */
document.addEventListener("drop", e => e.preventDefault());
document.addEventListener("dragover", e => e.preventDefault());

/* 3. Blokada zaznaczania obrazów */
document.querySelectorAll("img").forEach(img => {
    img.style.userSelect = "none";
    img.style.webkitUserDrag = "none";
});

/* 4. Blokada prawego przycisku na obrazach */
document.addEventListener("contextmenu", e => {
    if (e.target.tagName === "IMG" || e.target.closest(".protected-image")) {
        e.preventDefault();
    }
});

/* 5. Automatyczne nakładanie tła na .protected-image */
document.querySelectorAll(".protected-image").forEach(el => {
    const url = el.dataset.img;
    if (url) el.style.backgroundImage = `url('${url}')`;
});

/* 6. Blokada skrótów klawiaturowych (Ctrl+S, Ctrl+U, Ctrl+Shift+I, PrintScreen) */
document.addEventListener("keydown", e => {
    const blocked = [
        // Zapis strony
        e.ctrlKey && e.key.toLowerCase() === "s",
        // Źródło strony
        e.ctrlKey && e.key.toLowerCase() === "u",
        // DevTools
        e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i",
        // PrintScreen (częściowa ochrona)
        e.key === "PrintScreen"
    ];

    if (blocked.some(Boolean)) {
        e.preventDefault();
    }
});

/* 7. Częściowa ochrona przed PrintScreen — czyszczenie schowka */
document.addEventListener("keyup", e => {
    if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("");
    }
});
