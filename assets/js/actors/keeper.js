export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Skala minimalna i maksymalna (możesz zmieniać)
        const scaleMin = 3.0;   // skala u góry
        const scaleMax = 6.0;   // skala na dole

        // Pozycja startowa
        let posX = 950;
        let posY = 600;

        // Zakres ruchu góra/dół
        const minY = 600;   // najwyżej
        const maxY = 950;   // najniżej

        // Zakres ruchu lewo/prawo
        const minX = 900;   // najbardziej w lewo
        const maxX = 1000;  // najbardziej w prawo

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${posX}px`;
        char.style.top = `${posY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translate(-50%, ${posY}px) scale(${scaleMin})`;

        // --- FUNKCJA RUCHU GÓRA/DÓŁ + SKALA ---
        const moveVertical = () => {

            const goingDown = Math.random() > 0.5;

            const targetY = goingDown ? maxY : minY;
            const targetScale = goingDown ? scaleMax : scaleMin;

            const duration = 2000 + Math.random() * 2000;

            // JEDEN transition dla wszystkiego
            char.style.transition = `
                top ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                transform ${duration}ms ease-in-out
            `;

            char.style.top = `${targetY}px`;
            char.style.transform = `translate(-50%, ${targetY}px) scale(${targetScale})`;

            setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
        };

        // --- FUNKCJA RUCHU LEWO/PRAWO ---
        const moveHorizontal = () => {

            const goingRight = Math.random() > 0.5;

            const targetX = goingRight ? maxX : minX;

            const duration = 1500 + Math.random() * 2000;

            // JEDEN transition dla wszystkiego
            char.style.transition = `
                top ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                transform ${duration}ms ease-in-out
            `;

            char.style.left = `${targetX}px`;

            setTimeout(moveHorizontal, duration + 500 + Math.random() * 1000);
        };

        // start ruchów
        setTimeout(moveVertical, 500);
        setTimeout(moveHorizontal, 800);
    });
}
