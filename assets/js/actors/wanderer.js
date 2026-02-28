export function initWanderers() {
    const wanderers = document.querySelectorAll('.char-wanderer');
    
    wanderers.forEach(char => {
        // Definiujemy płynność ruchu bezpośrednio w JS dla pewności
        char.style.transition = "left 1.2s ease-in-out, transform 0.3s ease-in-out";

        const move = () => {
            if (Math.random() > 0.3) {
                const currentLeft = parseFloat(char.style.left) || 50;
                const newLeft = Math.floor(Math.random() * 60) + 15;
                
                // Obrót i marsz
                char.style.transform = (newLeft > currentLeft) ? "scaleX(-1)" : "scaleX(1)";
                char.style.left = newLeft + "%";
            }
            // Nowa decyzja co 1.5 - 3 sekundy
            setTimeout(move, Math.random() * 1500 + 1500);
        };
        
        // Start z lekkim opóźnieniem
        setTimeout(move, 200);
    });
}
