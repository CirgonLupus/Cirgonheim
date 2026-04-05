export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // --- PODSTAWOWE PARAMETRY ---
        const rawHeight = char.offsetHeight;

        // Pozycja bazowa (środek obrazka)
        const baseY = (window.innerHeight * 0.50) - (rawHeight / 2);
        const baseX = window.innerWidth * 0.50;

        // Pozycja "głęboka" (25px od dołu)
        const deepY = window.innerHeight - 25 - rawHeight;

        // Skalowanie zależne od pionu
        const scaleBase = 2.3;
        const scaleDeep = 4.1; // możesz dopasować

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${baseX}px`;
        char.style.top = `${baseY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scaleBase})`;

        // --- FUNKCJA RUCHU PIONOWEGO ---
        const moveVertical = () => {
            const goingDown = Math.random() > 0.5;

            const targetY = goingDown ? deepY : baseY;
            const targetScale = goingDown ? scaleDeep : scaleBase;

            const duration = 2000 + Math.random() * 2000;

            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            char.style.top = `${targetY}px`;
            char.style.transform = `translateX(-50%) scale(${targetScale})`;

            setTimeout(moveVertical, duration + 800 + Math.random() * 1200);
        };

        // --- FUNKCJA RUCHU POZIOMEGO ---
        const moveHorizontal = () => {
            const offset = (Math.random() * 16) - 8; // -8% do +8%
            const targetX = baseX + (window.innerWidth * (offset / 100));

            const duration = 1500 + Math.random() * 2000;

            char.style.transition = `left ${duration}ms ease-in-out`;
            char.style.left = `${targetX}px`;

            setTimeout(moveHorizontal, duration + 600 + Math.random() * 1200);
        };

        // Start obu pętli
        setTimeout(moveVertical, 300);
        setTimeout(moveHorizontal, 600);
    });
}
