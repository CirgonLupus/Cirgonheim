export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Płynny ruch, obrót i zanikanie
        char.style.transition = "left 1.5s ease-in-out, transform 0.4s ease-in-out, opacity 0.7s ease-in-out";

        const move = () => {
            // Pobieramy obecną pozycję (lub 60 jako start)
            const currentLeft = parseFloat(char.style.left) || 60;
            // Losujemy nową pozycję od 10% do 70%
            const newLeft = Math.floor(Math.random() * 60) + 10;

            // LOGIKA OBROTU:
            // Jeśli nowa pozycja jest większa niż obecna (idzie w prawo) -> obracamy (scaleX -1)
            // Jeśli nowa pozycja jest mniejsza (idzie w lewo) -> zostawiamy oryginał (scaleX 1)
            if (newLeft > currentLeft) {
                char.style.transform = "scaleX(-1)"; 
            } else {
                char.style.transform = "scaleX(1)";
            }

            // EFEKT PHASER:
            // Zmniejszamy widoczność na starcie ruchu
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // Przywracamy widoczność w połowie drogi (po 800ms)
            setTimeout(() => {
                char.style.opacity = "1";
            }, 800);

            // Czekamy 2.5s - 3s do kolejnego ruchu
            setTimeout(move, 2500 + Math.random() * 500);
        };
        
        // Startujemy z lekkim opóźnieniem, żeby uniknąć gwałtownego startu przy ładowaniu
        setTimeout(move, 500);
    });
}
