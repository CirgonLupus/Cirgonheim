// Silnik wyświetlania treści w interfejsie książki
export function openBook(contentTitle, contentText) {
    const overlay = document.getElementById('book-overlay');
    const titleEl = document.getElementById('book-title');
    const textEl = document.getElementById('book-text');

    if (!overlay || !titleEl || !textEl) return;

    // Wstawienie treści
    titleEl.innerText = contentTitle;
    textEl.innerText = contentText;

    // Płynne wyświetlenie
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
}

export function closeBook() {
    const overlay = document.getElementById('book-overlay');
    if (!overlay) return;

    overlay.style.opacity = '0';
    // Czekamy na koniec animacji zanikania przed ukryciem elementu
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}
