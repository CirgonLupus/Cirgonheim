export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Pobieramy naturalną wysokość grafiki
        const rawHeight = char.offsetHeight;

        // Skala podstawowa
        const scale = 2.5;

        // Obniżenie o wysokość po skalowaniu
        const offsetY = rawHeight * (scale - 1);

        // Pozycja środkowa
        const centerX = window.innerWidth * 0.5;
        const centerY = (window.innerHeight * 0.5) - (rawHeight / 2);

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${centerX}px`;
        char.style.top = `${centerY + offsetY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scale})`;
    });
}
