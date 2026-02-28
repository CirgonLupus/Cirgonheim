export function initCalmTwisters() {
    const twisters = document.querySelectorAll('.char-twister');
    
    twisters.forEach(char => {
        let currentRotation = 0;

        // Synchronizacja czasu ruchu i obrotu (3 sekundy na akcję)
        char.style.transition = "left 3s ease-in-out, transform 3s ease-in-out"; 

        const moveAndSpin = () => {
            const currentLeft = parseFloat(char.style.left) || 50;
            const newLeft = Math.floor(Math.random() * 60) + 20;
            
            const distance = newLeft - currentLeft;
            
            // Jeden pełny obrót (360 stopni) na każdy spacer
            // Dodajemy do aktualnej rotacji, aby kręcił się płynnie dalej
            currentRotation += (distance > 0 ? 360 : -360);

            char.style.left = newLeft + "%";
            char.style.transform = `rotate(${currentRotation}deg)`;

            // Przerwa między turlaniem (1.5 - 3 sekundy)
            setTimeout(moveAndSpin, 4500 + Math.random() * 1500);
        };
        
        moveAndSpin();
    });
}
