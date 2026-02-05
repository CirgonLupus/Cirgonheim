document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');

    enterBtn.addEventListener('click', () => {
        // 1. Odtwórz dźwięk
        if (gateSound) {
            gateSound.play().catch(e => console.error("Błąd audio:", e));
        }

        // 2. Rozsuń wrota
        gateLeft.classList.add('open');
        gateRight.classList.add('open');

        // 3. Wygaś napisy
        content.classList.add('fade-out');

        // 4. Przekieruj po zakończeniu animacji
        setTimeout(() => {
            // Przenosimy do rynku (Dystrykt)
            window.location.href = 'districts/market.html';
        }, 2000); // 2000ms = 2s (zgodnie z CSS)
    });
});
