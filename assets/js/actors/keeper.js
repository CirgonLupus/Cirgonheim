export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // Parametry zgodne z Twoją instrukcją:
        // Punkt startowy Y: 50% (środek) + 20% (1/5 wysokości postaci)
        // Skala startowa: 1.0 (oryginalna wielkość)
        
        const startY = 50; 
        const offsetV = 20; // 1/5 wysokości jako procentowe obniżenie
        const endY = 90;    // Dolna krawędź tła

        // Funkcja wykonująca ruch
        const wander = () => {
            // Losujemy punkt docelowy (0 = góra/start, 1 = dół/krawędź)
            const targetPos = Math.random(); 
            
            // Obliczamy Y: startuje od 50% i schodzi niżej
            const targetY = startY + (targetPos * (endY - startY));
            
            // Skalowanie: 1.0 (oryginał w punkcie startowym) do 1.6 (powiększony przy krawędzi)
            const targetScale = 1.0 + (targetPos * 0.6);
            
            // Czas trwania ruchu
            const duration = 4000 + Math.random() * 3000;
            
            char.style.transition = `top ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Aplikujemy pozycję i skalę
            // translateY(20%) to Twoje obniżenie postaci o 1/5 jej wysokości
            char.style.top = `${targetY}%`;
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(var(--dir, 1))`;

            setTimeout(wander, duration + 1000);
        };

        // Ustawienia początkowe (zgodne z Twoją prośbą)
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(1.0) scaleX(1)`;
        char.style.transformOrigin = "bottom center";

        // Start losowego ruchu
        setTimeout(wander, 1000);
    });
}
