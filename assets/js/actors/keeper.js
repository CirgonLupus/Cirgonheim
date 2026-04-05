export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Skala ludzika
        const scale = 3.0;

        // Pozycja startowa (Twoje wartości)
        let posX = 500;   // możesz zmieniać ręcznie
        let posY = 600;   // startowa wysokość

        // Zakres ruchu góra/dół
        const minY = 600;   // najwyżej
        const maxY = 1000;  // najniżej

        // Ustawienia startowe
        char.style.position = "absolute";
        char.style.left = `${posX}px`;
        char.style.top = `${posY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scale})`;

        // --- FUNKCJA RUCHU GÓRA/DÓŁ ---
        const moveVertical = () => {

            // losowy wybór: góra albo dół
            const goingDown = Math.random() > 0.5;

            const targetY = goingDown ? maxY : minY;

            // losowy czas trwania ruchu
            const duration = 2000 + Math.random() * 2000;

            char.style.transition = `top ${duration}ms ease-in-out`;
            char.style.top = `${targetY}px`;

            // po zakończeniu ruchu — kolejny
            setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
        };

        // start ruchu
        setTimeout(moveVertical, 500);
    });
}
