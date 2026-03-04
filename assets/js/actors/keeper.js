export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // Parametry zgodne z Twoją instrukcją:
        const startY = 50;  // Środek
        const endY = 75;    // Skrócona droga (75%)
        const baseScale = 2.0; 
        const maxScale = 5.0;  // Rośnie do 5x
        const offsetV = 20; // Obniżenie o 1/5 wysokości

        // Funkcja ruchu
        const move = () => {
            const progress = Math.random(); 
            
            // Obliczenia
            const targetY = startY + (progress * (endY - startY));
            const targetX = 35 + (Math.random() * 30); // Meandrowanie 35% - 65%
            const targetScale = baseScale + (progress * (maxScale - baseScale));
            
            const duration = 4000 + Math.random() * 3000;
            
            // Aplikacja stylów
            char.style.transition = `all ${duration}ms ease-in-out`;
            char.style.top = `${targetY}%`;
            char.style.left = `${targetX}%`;
            // translateX(-50%) centruje postać, translateY(20%) to Twoje obniżenie o 1/5
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale})`;

            // Kolejny ruch po zakończeniu obecnego
            setTimeout(move, duration + 500);
        };

        // USTAWIENIA STARTOWE (WYMAGANE DLA PŁYNNOŚCI)
        char.style.top = `${startY}%`;
        char.style.left = `50%`;
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${baseScale})`;
        char.style.transformOrigin = "bottom center";

        // Odpalamy ruch po krótkiej chwili
        setTimeout(move, 100);
    });
}
