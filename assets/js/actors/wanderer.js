export function initWanderers() {
    const wanderers = document.querySelectorAll('.char-wanderer');
    
    wanderers.forEach(char => {
        const move = () => {
            // Decyzja o ruchu
            if (Math.random() > 0.3) {
                const currentLeft = parseFloat(char.style.left) || 50;
                const newLeft = Math.floor(Math.random() * 60) + 15;
                
                // Obrót: bazowo patrzy w lewo (scaleX: 1)
                char.style.transform = (newLeft > currentLeft) ? "scaleX(-1)" : "scaleX(1)";
                char.style.left = newLeft + "%";
            }
            // Losowy czas do następnej akcji (żwawe tempo)
            setTimeout(move, Math.random() * 2000 + 500);
        };
        move();
    });
}
