export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Skala minimalna i maksymalna (możesz zmieniać)
        const scaleMin = 3.0;   // skala u góry
        const scaleMax = 5.0;   // skala na dole

        // Pozycja startowa
        let posX = 950;
        let posY = 600;

        // Zakres ruchu góra/dół
        const minY = 600;   // najwyżej
        const maxY = 950;   // najniżej

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${posX}px`;
        char.style.top = `${posY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scaleMin})`;

        // --- FUNKCJA RUCHU GÓRA/DÓŁ + SKALA ---
        const moveVertical = () => {

            const goingDown = Math.random() > 0.5;

            const targetY = goingDown ? maxY : minY;
            const targetScale = goingDown ? scaleMax : scaleMin;

            const duration = 2000 + Math.random() * 2000;

            char.style.transition = `
                top ${duration}ms ease-in-out,
                transform ${duration}ms ease-in-out
            `;

            char.style.top = `${targetY}px`;
            char.style.transform = `translateX(-50%) scale(${targetScale})`;

            setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
        };

        setTimeout(moveVertical, 500);
    });
}
