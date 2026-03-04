export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // PARAMETRY STARTOWE Z INFOHOUSE
        // Start: Środek ekranu (50%)
        // Obniżenie: 1/5 wysokości postaci (20%)
        // Koniec: Dolna krawędź tła (100%)
        
        const startY = 50; 
        const endY = 100;
        const offsetV = 20; // 20% to 1/5 wysokości

        const wander = () => {
            // Losujemy postęp: 0 (start/środek) do 1 (dół/krawędź)
            const progress = Math.random(); 
            
            // Obliczamy pozycję Y
            const targetY = startY + (progress * (endY - startY));
            
            // Skalowanie: 100% na starcie -> 150% na samym dole
            const targetScale = 1.0 + (progress * 0.5);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Aplikujemy ruch:
            // translateY(offsetV) utrzymuje Twoje obniżenie o 1/5 wysokości w każdym punkcie ścieżki
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // INICJALIZACJA: Dokładnie parametry z infohouse
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.width = "150px"; // Szerokość z infohouse.html
        char.style.top = `${startY}%`;
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(1.0) scaleX(1)`;
        char.style.transformOrigin = "bottom center";

        // Start ruchu
        setTimeout(wander, 1500);
    });
}
