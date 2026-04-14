export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Zakres ruchu w % ekranu
        const minX = 45;   // 45% szerokości ekranu
        const maxX = 55;   // 55% szerokości ekranu

        const minY = 52;   // trochę poniżej środka
        const maxY = 62;   // jeszcze niżej

        // Skala zależna od Y (perspektywa)
        const scaleAtMinY = 1.0;
        const scaleAtMaxY = 1.4;

        // Pozycja startowa
        let posX = 50;
        let posY = 58;

        // Ustawienia startowe
        char.style.position = "fixed";
        char.style.left = `${posX}vw`;
        char.style.top = `${posY}vh`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translate(-50%, -50%) scale(${scaleAtMinY})`;

        // --- FUNKCJA RUCHU GÓRA/DÓŁ + SKALA ---
        const moveVertical = () => {

            const goingDown = Math.random() > 0.5;

            const targetY = goingDown ? maxY : minY;

            // interpolacja skali
            const t = (targetY - minY) / (maxY - minY);
            const targetScale = scaleAtMinY + t * (scaleAtMaxY - scaleAtMinY);

            const duration = 2000 + Math.random() * 2000;

            char.style.transition = `
                top ${duration}ms ease-in-out,
                transform ${duration}ms ease-in-out
            `;

            char.style.top = `${targetY}vh`;
            char.style.transform = `translate(-50%, -50%) scale(${targetScale})`;

            setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
        };

        // --- FUNKCJA RUCHU LEWO/PRAWO ---
        const moveHorizontal = () => {

            const goingRight = Math.random() > 0.5;

            const targetX = goingRight ? maxX : minX;

            const duration = 1500 + Math.random() * 2000;

            char.style.transition = `
                left ${duration}ms ease-in-out
            `;

            char.style.left = `${targetX}vw`;

            setTimeout(moveHorizontal, duration + 500 + Math.random() * 1000);
        };

        // start ruchów
        setTimeout(moveVertical, 500);
        setTimeout(moveHorizontal, 800);
    });
}
