export function initPhasers() {
    const phasers = document.querySelectorAll('.char-phaser');
    
    phasers.forEach(char => {
        // Konfiguracja płynności: ruch (1.5s), obrót (0.4s) i znikanie (0.7s)
        char.style.transition = "left 1.5s ease-in-out, transform 0.4s ease-in-out, opacity 0.7s ease-in-out";

        const move = () => {
            // 1. Pobieramy obecną pozycję (jeśli nie ma, startujemy z 60%)
            const currentLeft = parseFloat(char.style.left) || 60;
            
            // 2. Losujemy cel podróży (zakres 10% - 70%)
            const newLeft = Math.floor(Math.random() * 60) + 10;

            // 3. LOGIKA OBROTU ZIMPORTOWANA Z WANDERERA:
            // Jeśli cel jest na większej wartości (czyli po prawej stronie od obecnej),
            // odbijamy grafikę lustrzanie, bo bazowo patrzy w lewo.
            if (newLeft > currentLeft) {
                char.style.transform = "scaleX(-1)"; // Obrót w prawo
            } else {
                char.style.transform = "scaleX(1)";  // Powrót do widoku w lewo
            }

            // 4. EFEKT PHASER (Zanikanie na starcie)
            char.style.opacity = "0.2";
            char.style.left = newLeft + "%";

            // 5. Powrót do pełnej widoczności w trakcie ruchu (po 800ms)
            setTimeout(() => {
                char.style.opacity = "1";
            }, 800);

            // 6. Planujemy kolejny ruch za 2.5 - 3 sekundy
            setTimeout(move, 2500 + Math.random() * 500);
        };
        
        // Pierwsze uruchomienie po załadowaniu strony
        setTimeout(move, 500);
    });
}
