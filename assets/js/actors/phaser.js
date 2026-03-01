export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Ruch trwa 1.5s, zanikanie (opacity) 0.7s
        char.style.transition = "left 1.5s ease-in-out, transform 0.3s, opacity 0.7s ease-in-out";

        const move = () => {
            const currentLeft = parseFloat(char.style.left) || 50;
            const newLeft = Math.floor(Math.random() * 70) + 15;

            // 1. START: Obrót, ruch i wejście w fazę (20% widoczności)
            char.style.transform = (newLeft > currentLeft) ? "scaleX(-1)" : "scaleX(1)";
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // 2. ŚRODEK: Powrót do pełnej formy przed dotarciem do celu
            setTimeout(() => {
                char.style.opacity = "1";
            }, 750);

            // 3. POSTÓJ: Bardzo krótki (od 0.5s do 1s)
            setTimeout(move, 1500 + (Math.random() * 500 + 500));
        };
        
        setTimeout(move, 500);
    });
}
