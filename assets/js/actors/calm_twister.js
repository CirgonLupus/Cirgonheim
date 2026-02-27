export function initCalmTwisters() {
    // Szukamy wszystkich aktorów z klasą char-twister
    const twisters = document.querySelectorAll('.char-twister');
    
    twisters.forEach(char => {
        // Spokojne przejście pozycji (5s) i płynny obrót (0.6s)
        char.style.transition = "left 5s ease-in-out, transform 0.6s ease-in-out"; 

        const move = () => {
            // Szansa na podjęcie akcji (ok. 50%)
            if (Math.random() > 0.5) {
                const currentLeft = parseFloat(char.style.left) || 50;
                // Losowy punkt docelowy (bezpieczny zakres)
                const newLeft = Math.floor(Math.random() * 65) + 15;
                
                // --- LOGIKA OBROTU (TWIST) ---
                // Jeśli cel jest na prawo (newLeft > currentLeft), robimy lustrzane odbicie
                // Twoja grafika bazowo patrzy w lewo (scaleX: 1)
                if (newLeft > currentLeft) {
                    char.style.transform = "scaleX(-1)";
                } else {
                    char.style.transform = "scaleX(1)";
                }
                
                // Wykonanie powolnego ruchu po obróceniu się
                char.style.left = newLeft + "%";
            }
            
            // Długie pauzy między ruchami (6-10 sekund spokoju)
            setTimeout(move, Math.random() * 4000 + 6000);
        };
        
        // Start z losowym opóźnieniem
        setTimeout(move, Math.random() * 2000);
    });
}
