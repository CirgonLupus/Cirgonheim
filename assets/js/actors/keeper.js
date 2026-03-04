export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA:
        // Start: Środek grafiki (50%)
        // Koniec: Dolna krawędź (100%)
        const startY = 50; 
        const endY = 100; 

        const wander = () => {
            // Losujemy postęp: 0 (środek) do 1 (dół)
            const progress = Math.random(); 
            
            // Obliczamy aktualne Y
            const targetY = startY + (progress * (endY - startY));
            
            // SKALA: 2.0 na starcie (środek) -> 3.0 na dole (krawędź)
            const targetScale = 2.0 + (progress * 1.0);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Pozycja i skala (bez dodatkowych przesunięć)
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA POCZĄTKOWE: Na środku i od razu 2x większy
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.width = "150px"; 
        char.style.transform = "translateX(-50%) scale(2.0) scaleX(1)";
        char.style.transformOrigin = "bottom center";
        char.style.marginTop = "0px";

        // Start patrolowania
        setTimeout(wander, 2000);
    });
}
