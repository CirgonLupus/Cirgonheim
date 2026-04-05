export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Pobieramy naturalną wysokość grafiki
        const rawHeight = char.offsetHeight;

        // Skala podstawowa
        const scale = 3.0;

        // Obniżenie o wysokość po skalowaniu (żeby stał na ziemi)
        const scaledOffset = rawHeight * (scale - 1);

        // Podniesienie o 1/5 wysokości (Twoje wymaganie)
        const lift = rawHeight / 5;

        // Pozycja środkowa ekranu
        const centerX = window.innerWidth * 0.5;
        const centerY = (window.innerHeight * 0.5) - (rawHeight / 2);

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${centerX}px`;
        char.style.top = `${centerY + scaledOffset - lift}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scale})`;
    });
}
