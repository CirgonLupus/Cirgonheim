document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // 1. Dźwięk
            if (gateSound) {
                gateSound.play().catch(e => console.log("Audio play blocked"));
            }

            // 2. Animacja wrót i wygaszanie tekstu
            gateLeft.classList.add('open');
            gateRight.classList.add('open');
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // 3. Przejście do nowej lokalizacji
            setTimeout(() => {
                overlay.classList.add('active');
                setTimeout(() => {
                    // Kierunek: Plac Bramny w Dystrykcie 1
                    window.location.href = 'districts/dis1/dis1_gatesquare.html';
                }, 1000); // Czas trwania ściemniania (overlay)
            }, 2000); // Czas trwania otwierania bramy (zgodny z CSS)
        });
    }
});
