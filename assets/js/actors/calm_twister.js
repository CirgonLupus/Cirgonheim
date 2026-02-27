export function initCalmTwisters() {
    const twisters = document.querySelectorAll('.char-twister');
    
    twisters.forEach(char => {
        // Zmienna trzymająca aktualny kąt obrotu, aby kręcił się w nieskończoność
        let currentRotation = 0;

        // Płynność ruchu i obrotu
        char.style.transition = "left 3s ease-in-out, transform 3s ease-in-out"; 

        const moveAndSpin = () => {
            const currentLeft = parseFloat(char.style.left) || 50;
            const newLeft = Math.floor(Math.random() * 60) + 20;
            
            // Obliczamy dystans, żeby wiedzieć, ile "obrotów" wykonać
            const distance = newLeft - currentLeft;
            
            // Jeśli idzie w prawo (distance > 0), kręci się w prawo (plus stopnie)
            // Jeśli idzie w lewo (distance < 0), kręci się w lewo (minus stopnie)
            // 720 stopni to dwa pełne obroty na jeden spacer
            currentRotation += (distance > 0 ? 720 : -720);

            // Wykonujemy ruch i obrót jednocześnie
            char.style.left = newLeft + "%";
            char.style.transform = `rotate(${currentRotation}deg)`;

            // Krótka przerwa po dotarciu do celu (0.5s - 1.5s) i kolejny ruch
            setTimeout(moveAndSpin, 3500 + Math.random() * 1000);
        };
        
        moveAndSpin();
    });
}
