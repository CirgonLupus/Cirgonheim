export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA:
        // Start: Dokładnie środek grafiki tła (50% wysokości kontenera)
        // Obniżenie: 1/5 wysokości postaci (używając margin-top, by nie psuć transform)
        // Koniec: Dolna krawędź grafiki tła (100% wysokości kontenera)
        
        const startY = 50; 
        const endY = 100;

        const wander = () => {
            // Losujemy postęp: 0 (środek grafiki) do 1 (dół grafiki)
            const progress = Math.random(); 
            
            // Obliczamy aktualne Y (pozycja stóp postaci)
            const targetY = startY + (progress * (endY - startY));
            
            // Skalowanie: 100% na starcie (środek) -> 150% na samym dole
            const targetScale = 1.0 + (progress * 0.5);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            char.style.top = `${targetY}%`;
            // Tylko centrowanie w poziomie i skala. Obniżenie o 1/5 jest w margin-top.
            char.style.transform = `translateX(-50%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA POCZĄTKOWE
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.width = "150px"; 
        char.style.top = `${startY}%`; // Środek grafiki
        
        // Obniżenie o 1/5 wysokości postaci (30px przy szerokości 150px, jeśli postać jest kwadratowa, 
        // lub dynamicznie 20% wysokości jeśli użyjemy % w margin-top)
        char.style.marginTop = "calc(150px / 5)"; 
        
        char.style.transform = "translateX(-50%) scale(1.0) scaleX(1)";
        char.style.transformOrigin = "bottom center";

        // Start ruchu
        setTimeout(wander, 1500);
    });
}
