export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA:
        const startY = 50; // Środek grafiki
        const endY = 100;  // Dół grafiki
        const offsetV = 20; // 1/5 wysokości (20%)

        const wander = () => {
            const progress = Math.random(); 
            const targetY = startY + (progress * (endY - startY));
            
            // SKALA: 2.0 na starcie -> 3.0 na dole
            const targetScale = 2.0 + (progress * 1.0);
            
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Łączymy: Centrowanie X, Obniżenie o 1/5 (translateY), Skala
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA STARTOWE
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.width = "150px"; 
        // Start: Skala 2.0 i obniżenie o 1/5 wysokości
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(2.0) scaleX(1)`;
        char.style.transformOrigin = "bottom center";
        char.style.marginTop = "0px";

        setTimeout(wander, 2000);
    });
}
