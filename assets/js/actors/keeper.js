export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA PUNKTÓW SKRAJNYCH
        // Start: Środek (50%) + offset 1/5 wysokości postaci
        const startY = 50; 
        const offsetV = 30; // 1/5 z 150px to 30px
        
        // Koniec: Linia dolna tła
        const endY = 90; 

        // Funkcja losująca parametry i wykonująca krok
        const wander = () => {
            // Losujemy cel: 0 to góra (punkt startowy), 1 to dół (krawędź tła)
            const targetPos = Math.random(); 
            
            // Obliczamy aktualne parametry na podstawie losowania
            // Y: od startY do endY
            const targetY = startY + (targetPos * (endY - startY));
            // Skala: od 1.0 (góra) do 1.6 (dół)
            const targetScale = 1.0 + (targetPos * 0.6);
            // Margines (offset 1/5): maleje do 0 gdy idzie w dół
            const targetMargin = offsetV * (1 - targetPos);
            
            // Losujemy czas trwania ruchu (od 3 do 6 sekund)
            const duration = 3000 + Math.random() * 3000;
            
            // Aplikujemy przejście
            char.style.transition = `top ${duration}ms ease-in-out, 
                                     transform ${duration}ms ease-in-out, 
                                     margin-top ${duration}ms ease-in-out`;
            
            // Ustawiamy wartości
            char.style.top = `${targetY}%`;
            char.style.marginTop = `${targetMargin}px`;
            char.style.transform = `translateX(-50%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            // Po zakończeniu ruchu, czekamy chwilę (0.5 - 2s) i losujemy kolejny
            setTimeout(wander, duration + (500 + Math.random() * 1500));
        };

        // Ustawienia początkowe (zaczyna tam gdzie prosiłeś)
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.marginTop = `${offsetV}px`;
        char.style.transform = "translateX(-50%) scale(1.0) scaleX(var(--dir, 1))";
        char.style.transformOrigin = "bottom center";

        // Pierwszy ruch po krótkim przygotowaniu
        setTimeout(wander, 2000);
    });
}
