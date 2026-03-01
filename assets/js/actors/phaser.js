export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Czas marszu: 1.5s, czas zanikania: 0.7s (połowa ruchu)
        char.style.transition = "left 1.5s ease-in-out, transform 0.3s, opacity 0.7s ease-in-out";

        const move = () => {
            const currentLeft = parseFloat(char.style.left) || 50;
            const newLeft = Math.floor(Math.random() * 70) + 15;

            // 1. WEJŚCIE W FAZĘ: Obrót, start ruchu i spadek opacity do 20%
            char.style.transform = (newLeft > currentLeft) ? "scaleX(-1)" : "scaleX(1)";
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // 2. WYJŚCIE Z FAZY: W połowie drogi (750ms) wraca do 100%
            setTimeout(() => {
                char.style.opacity = "1";
            }, 750);

            // 3. KRÓTKI POSTÓJ: Od 0.5s do 1s (zgodnie z prośbą, nie dłużej niż sekunda)
            setTimeout(move, 1500 + (Math.random() * 500 + 500));
        };
        
        setTimeout(move, 500);
    });
}
