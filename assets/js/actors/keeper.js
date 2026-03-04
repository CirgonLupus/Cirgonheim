export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA:
        const startY = 50;  // Środek grafiki
        const endY = 75;    // Skrócona droga (połowa dystansu do dołu)
        const offsetV = 20; // Stałe obniżenie o 1/5 wysokości

        const wander = () => {
            // Losujemy postęp: 0 (start/50%) do 1 (koniec drogi/75%)
            const progress = Math.random(); 
            
            // Obliczamy aktualne Y w nowym, krótszym zakresie
            const targetY = startY + (progress * (endY - startY));
            
            // SKALA: 2.0 na starcie -> 3.0 w nowym punkcie końcowym
            const targetScale = 2.0 + (progress * 1.0);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Aplikujemy pozycję i skalę z zachowaniem obniżenia
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA STARTOWE (Środek, Skala 2.0, Obniżenie 1/5)
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.width = "150px"; 
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(2.0) scaleX(1)`;
        char.style.transformOrigin = "bottom center";
        char.style.marginTop = "0px";

        setTimeout(wander, 2000);
    });
}
