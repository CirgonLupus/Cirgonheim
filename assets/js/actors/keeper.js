export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {

        // --- POZYCJE W PIKSELACH ---
        const startY = (window.innerHeight * 0.50) + 15; 

        // wysokość PRZED skalowaniem (kluczowa poprawka!)
        const rawHeight = char.offsetHeight;

        // koniec ruchu 25px od dołu
        const endY = window.innerHeight - 25 - rawHeight;

        // --- SKALOWANIE (ORYGINALNE) ---
        const baseScale = 2.0; 
        const maxScale = 5.0;

        // --- PRZESUNIĘCIE W DÓŁ (TAK JAK MIAŁEŚ) ---
        const offsetV = 20;

        const move = () => {
            const progress = Math.random();

            // pion: interpolacja między startY a endY
            const targetY = startY + (progress * (endY - startY));

            // poziom: bez zmian
            const targetX = 35 + (Math.random() * 30);

            // skala: bez zmian
            const targetScale = baseScale + (progress * (maxScale - baseScale));

            const duration = 4000 + Math.random() * 3000;

            char.style.transition = `all ${duration}ms ease-in-out`;
            char.style.top = `${targetY}px`;      // <-- PIKSELE
            char.style.left = `${targetX}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale})`;

            setTimeout(move, duration + 500);
        };

        // --- USTAWIENIA STARTOWE ---
        char.style.top = `${startY}px`;          // <-- PIKSELE
        char.style.left = `50%`;
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${baseScale})`;
        char.style.transformOrigin = "bottom center";

        setTimeout(move, 100);
    });
}
