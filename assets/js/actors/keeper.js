export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // Skrypt nie ustawia pozycji startowej - bierze ją z CSS (czyli 50%)
        const startY = parseFloat(window.getComputedStyle(char).top) / window.innerHeight * 100 || 50;
        const endY = 100; // Dolna krawędź

        const wander = () => {
            // Losujemy postęp (0 = środek, 1 = krawędź)
            const progress = Math.random(); 
            
            const targetY = startY + (progress * (endY - startY));
            // Skaluje od 1.0 (bazowy rozmiar 150px) do 1.5 (225px)
            const targetScale = 1.0 + (progress * 0.5);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Zachowujemy Twoje translateY(20%) w każdym kroku ruchu
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(20%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // Ustawiamy origin na dół, żeby ludzik "rosnął" od stóp w górę
        char.style.transformOrigin = "bottom center";

        // Pierwszy ruch zaczyna się po 2 sekundach spokoju
        setTimeout(wander, 2000);
    });
}
