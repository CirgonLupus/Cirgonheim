export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Wymuszamy CSS bezpośrednio na elemencie, żeby wykluczyć błędy z arkusza stylów
        char.style.transition = "left 1.5s ease-in-out, transform 0.4s ease-in-out, opacity 0.7s ease-in-out";
        // Ustawiamy startowy transform, żeby przeglądarka miała punkt odniesienia
        char.style.transform = "scaleX(1)";

        const move = () => {
            // Pobieramy pozycję (usuwamy znak %, żeby mieć czystą liczbę)
            const currentLeft = parseFloat(char.style.left) || 60;
            const newLeft = Math.floor(Math.random() * 60) + 10;

            // MECHANIKA OBROTU (Zapożyczona z Wanderera)
            // Jeśli cel (newLeft) jest WIĘKSZY niż obecna pozycja -> idzie w prawo -> scaleX(-1)
            if (newLeft > currentLeft) {
                char.style.setProperty('transform', 'scaleX(-1)');
            } else {
                char.style.setProperty('transform', 'scaleX(1)');
            }

            // EFEKT PHASER
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // POWRÓT WIDOCZNOŚCI
            setTimeout(() => {
                char.style.opacity = "1";
            }, 750);

            // POSTÓJ (zgodnie z prośbą: nie dłużej niż 1 sekunda po zakończeniu ruchu)
            // Ruch trwa 1500ms + losowo do 1000ms postoju
            setTimeout(move, 1500 + Math.random() * 1000);
        };
        
        // Start
        setTimeout(move, 300);
    });
}
