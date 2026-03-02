export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Ustawienie płynności dla wszystkich parametrów
        char.style.transition = "left 1.5s ease-in-out, transform 0.4s ease-in-out, opacity 0.7s ease-in-out";

        const move = () => {
            const currentLeft = parseFloat(char.style.left) || 60;
            const newLeft = Math.floor(Math.random() * 60) + 10;

            // MECHANIKA OBROTU:
            // Jeśli newLeft > currentLeft (idzie w prawo) -> zmienna --dir = -1
            // Jeśli newLeft < currentLeft (idzie w lewo) -> zmienna --dir = 1
            const direction = newLeft > currentLeft ? -1 : 1;
            char.style.setProperty('--dir', direction);

            // EFEKT PHASER (Zanikanie)
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // Powrót widoczności
            setTimeout(() => {
                char.style.opacity = "1";
            }, 800);

            // Czas do następnego ruchu: 1.5s marszu + ok. 0.5s - 1s postoju
            setTimeout(move, 2000 + Math.random() * 1000);
        };
        
        setTimeout(move, 300);
    });
}
