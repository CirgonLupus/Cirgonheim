export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // Punkt startowy: Dokładnie środek grafiki (50%)
        // Punkt końcowy: Dolna krawędź tła (95%)
        const startY = 50; 
        const endY = 95; 

        const wander = () => {
            // Losujemy postęp: 0 to środek (góra), 1 to krawędź (dół)
            const progress = Math.random(); 
            
            // Obliczamy aktualne Y i skalę
            const targetY = startY + (progress * (endY - startY));
            // Skala: 1.0 na środku, rośnie do 1.6 przy krawędzi
            const targetScale = 1.0 + (progress * 0.6);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Ustawiamy pozycję
            char.style.top = `${targetY}%`;
            // translateY(20%) to Twoje obniżenie o 1/5 wysokości postaci
            char.style.transform = `translateX(-50%) translateY(20%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // INICJALIZACJA: Dokładnie na środku ekranu
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        // Obniżenie o 1/5 wysokości postaci i skala 1.0
        char.style.transform = "translateX(-50%) translateY(20%) scale(1.0) scaleX(1)";
        char.style.transformOrigin = "bottom center";

        // Pierwszy ruch po chwili
        setTimeout(wander, 1500);
    });
}
