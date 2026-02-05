document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // KROK 1: Natychmiastowe zniknięcie tekstu
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // KROK 2: Opóźnienie przed otwarciem bramy i dźwiękiem
            // Zmieniając 800 na inną wartość (milisekundy), regulujesz czas pauzy
            setTimeout(() => {
                
                // Start dźwięku
                if (gateSound) {
                    gateSound.play().catch(e => console.log("Audio zablokowane"));
                }

                // Start animacji wrót
                gateLeft.classList.add('open');
                gateRight.classList.add('open');

                // KROK 3: Przejście do nowej strony po zakończeniu animacji bramy
                // 2000ms (otwieranie) + 500ms (zapas na overlay)
                setTimeout(() => {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        window.location.href = 'district/dis1/dis1_gatesquare.html';
                    }, 1000);
                }, 2000);

            }, 800); // <-- TUTAJ ustawiasz czas pauzy (800ms = 0.8 sekundy)
        });
    }
});
