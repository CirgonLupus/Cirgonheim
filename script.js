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
                gateSound.play().catch(e => console.log("Audio play prevented"));
            }

            // 2. Animacja wrót
            gateLeft.classList.add('open');
            gateRight.classList.add('open');

            // 3. Delikatne wygaszanie treści
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // 4. Przejście (Overlay i zmiana strony)
            setTimeout(() => {
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = 'districts/market.html';
                }, 1000); // Czas na pełne zaciemnienie
            }, 2000); // Czas otwierania bramy
        });
    }
});
