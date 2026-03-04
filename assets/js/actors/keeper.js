export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');
    
    actors.forEach(char => {
        // KONFIGURACJA ZAKRESU PIONOWEGO:
        const startY = 50;  
        const endY = 75;    
        const offsetV = 20; 

        // KONFIGURACJA SKALI:
        const baseScale = 2.0; 
        const maxScale = 5.0;  

        // KONFIGURACJA MEANDROWANIA (POZIOM):
        const centerX = 50;   // Środek ekranu
        const drift = 15;     // Maksymalne wychylenie w lewo/prawo (w %)
        let currentX = 50;    // Zapamiętujemy obecną pozycję X do sterowania kierunkiem

        const wander = () => {
            const progress = Math.random(); 
            
            // 1. Obliczamy Y i Skalę (bez zmian)
            const targetY = startY + (progress * (endY - startY));
            const targetScale = baseScale + (progress * (maxScale - baseScale));
            
            // 2. Obliczamy X (meandrowanie)
            // Losujemy nową pozycję w zakresie (50 - 15) do (50 + 15)
            const targetX = (centerX - drift) + (Math.random() * drift * 2);
            
            // 3. Ustalamy kierunek patrzenia (scaleX)
            // Jeśli idzie w prawo (targetX > currentX), patrz w prawo, jeśli w lewo, patrz w lewo
            const direction = targetX > currentX ? 1 : -1;
            currentX = targetX;

            const duration = 4000 + Math.random() * 3000;
            
            // Dodajemy 'left' do przejścia, aby postać płynnie meandrowała
            char.style.transition = `top ${duration}ms ease-in-out, left ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`;
            
            // Aplikujemy ruch
            char.style.top = `${targetY}%`;
            char.style.left = `${targetX}%`;
            
            // Ważne: translateX(-50%) musi zostać, by postać była centrowana względem swojego punktu 'left'
            char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${targetScale}) scaleX(${direction})`;

            setTimeout(wander, duration + 1000);
        };

        // USTAWIENIA STARTOWE
        char.style.position = "absolute";
        char.style.left = "50%";
        char.style.top = `${startY}%`;
        char.style.width = "150px"; 
        char.style.transform = `translateX(-50%) translateY(${offsetV}%) scale(${baseScale}) scaleX(1)`;
        char.style.transformOrigin = "bottom center";
        char.style.marginTop = "0px";

        setTimeout(wander, 2000);
    });
}
