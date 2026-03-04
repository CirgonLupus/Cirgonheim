export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA ZAKRESU:
        const startY = 50;  // Punkt podstawowy (środek)
        const endY = 75;    // Punkt najniższy (skrócona droga)
        const offsetV = 20; // Stałe obniżenie o 1/5 wysokości

        // KONFIGURACJA SKALI:
        const baseScale = 2.0; // Wielkość w punkcie podstawowym
        const maxScale = 4.0;  // 2x większy niż w punkcie podstawowym (2.0 * 2)

        const wander = () => {
            // Losujemy postęp: 0 (środek) do 1 (najniższy punkt)
            const progress = Math.random(); 
            
            // Obliczamy aktualne Y w zakresie 50% - 75%
            const targetY = startY + (progress * (endY - startY));
            
            // Obliczamy skalę: od 2.0 do 4.0
            const targetScale = baseScale + (progress * (maxScale - baseScale));
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Aplikujemy pozycję, obniżenie i nową skalę
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            // Po zakończeniu ruchu czekamy i losujemy kolejny cel
            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA STARTOWE (Punkt podstawowy)
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.width = "150px"; 
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${baseScale}) scaleX(1)`;
        char.style.transformOrigin = "bottom center";
        char.style.marginTop = "0px";

        // Start animacji
        setTimeout(wander, 2000);
    });
}
