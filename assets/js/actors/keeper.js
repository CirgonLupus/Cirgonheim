export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // Punkt startowy (głębia pokoju) i końcowy (przy widzu)
        const startY = 45; // % wysokości ekranu
        const endY = 85;   // % wysokości ekranu (dolna krawędź)
        
        // Funkcja aplikująca pozycję i skalę
        const setPosition = (y) => {
            // Skalowanie: 0.6 w oddali do 1.2 przy krawędzi
            const scale = 0.6 + ((y - startY) / (endY - startY)) * 0.6;
            char.style.top = `${y}%`;
            char.style.transform = `translateX(-50%) scale(${scale}) scaleX(var(--dir, 1))`;
        };

        // Inicjalizacja pozycji początkowej
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.transformOrigin = "bottom center";
        setPosition(startY);

        // Rozpoczęcie Etapu 1: Marsz w dół z powiększaniem
        setTimeout(() => {
            const duration = 5000; // 5 sekund na dojście do krawędzi
            char.style.transition = `top ${duration}ms linear, transform ${duration}ms linear`;
            
            setPosition(endY);

            setTimeout(() => {
                console.log("Keeper dotarł do krawędzi. Czekam na dalsze etapy.");
            }, duration);
        }, 1000);
    });
}
