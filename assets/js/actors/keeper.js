export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA POŁOŻENIA
        const topLimit = 35;  // Najwyższy punkt (głębia tła) - teraz wyżej
        const bottomLimit = 90; // Najniższy punkt (przy krawędzi)
        const offsetV = 30;   // 1/5 wysokości postaci (przyjmując 150px)

        const wander = () => {
            // Losujemy nową pozycję między topLimit a bottomLimit
            const targetPos = Math.random(); 
            const targetY = topLimit + (targetPos * (bottomLimit - topLimit));
            
            // Skalowanie: 0.5 (daleko) do 1.5 (blisko)
            const targetScale = 0.5 + (targetPos * 1.0);
            
            // Offset 1/5 wysokości: im wyżej jest, tym bardziej go stosujemy
            const targetMargin = offsetV * (1 - targetPos);
            
            const duration = 4000 + Math.random() * 4000;
            
            char.style.transition = `top ${duration}ms ease-in-out, 
                                     transform ${duration}ms ease-in-out, 
                                     margin-top ${duration}ms ease-in-out`;
            
            char.style.top = `${targetY}%`;
            char.style.marginTop = `${targetMargin}px`;
            char.style.transform = `translateX(-50%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // Inicjalizacja: Ustawiamy go "wyżej" na start
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${topLimit}%`;
        char.style.marginTop = `${offsetV}px`;
        char.style.transform = "translateX(-50%) scale(0.5) scaleX(1)";
        char.style.transformOrigin = "bottom center";

        setTimeout(wander, 1000);
    });
}
