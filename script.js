document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // 1. Tekst znika pierwszy
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // 2. Pauza 800ms przed ruszeniem bramy
            setTimeout(() => {
                
                // Start dźwięku (ścieżka: assets/sound/)
                if (gateSound) {
                    gateSound.play().catch(e => console.log("Audio zablokowane lub zła ścieżka"));
                }

                // Brama rusza
                gateLeft.classList.add('open');
                gateRight.classList.add('open');

                // 3. Przejście do nowej strony po animacji
                setTimeout(() => {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        // Ścieżka: district/dis1/...
                        window.location.href = 'district/dis1/dis1_gatesquare.html';
                    }, 1000);
                }, 2000);

            }, 800); 
        });
    }
});
