document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Start dźwięku
            if (gateSound) {
                gateSound.play().catch(e => console.log("Audio play blocked"));
            }

            // Animacja CSS
            gateLeft.classList.add('open');
            gateRight.classList.add('open');
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // Przejście do kolejnej strony
            setTimeout(() => {
                overlay.classList.add('active');
                setTimeout(() => {
                    // Ścieżka do Twojej pierwszej dzielnicy
                    window.location.href = 'districts/market.html';
                }, 1000);
            }, 2000);
        });
    }
});
