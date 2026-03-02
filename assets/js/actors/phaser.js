export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Ustawiamy przejścia: ruch, obrót i znikanie
        char.style.transition = "left 1.5s ease-in-out, transform 0.4s ease-in-out, opacity 0.7s ease-in-out";

        const move = () => {
            const currentLeft = parseFloat(char.style.left) || 60;
            const newLeft = Math.floor(Math.random() * 60) + 10;

            // OBRÓT: Sprawdzamy kierunek podróży
            // Jeśli newLeft > currentLeft, idzie w prawo. Jeśli nie, w lewo.
            char.style.transform = (newLeft > currentLeft) ? "scaleX(-1)" : "scaleX(1)";

            // FAZOWANIE: Znika w trakcie startu
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // POWRÓT: Odzyskuje materialność po 800ms (w połowie drogi)
            setTimeout(() => {
                char.style.opacity = "1";
            }, 800);

            // Kolejna decyzja o ruchu za 2.5 - 3 sekundy
            setTimeout(move, 2500 + Math.random() * 500);
        };
        
        // Start z lekkim opóźnieniem
        setTimeout(move, 500);
    });
}
