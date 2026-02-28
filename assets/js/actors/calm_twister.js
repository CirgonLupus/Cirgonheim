export function initCalmTwisters() {
    const twisters = document.querySelectorAll('.char-twister');
    
    twisters.forEach(char => {
        let currentRotation = 0;

        // Synchronizacja: ruch i obrót trwają tyle samo (3 sekundy)
        char.style.transition = "left 3s ease-in-out, transform 3s ease-in-out"; 

        const moveAndSpin = () => {
            const currentLeft = parseFloat(char.style.left) || 50;
            const newLeft = Math.floor(Math.random() * 60) + 20;
            const distance = newLeft - currentLeft;
            
            // Jeden pełny obrót (360 stopni) na każdy spacer
            currentRotation += (distance > 0 ? 360 : -360);

            char.style.left = newLeft + "%";
            char.style.transform = `rotate(${currentRotation}deg)`;

            // Przerwa przed kolejnym turlaniem (2 - 4 sekundy)
            setTimeout(moveAndSpin, 4000 + Math.random() * 2000);
        };
        
        // Start z lekkim opóźnieniem
        setTimeout(moveAndSpin, 500);
    });
}
