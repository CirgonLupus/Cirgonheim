document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    // ZAKRES RUCHU — ZWIĘKSZONY
    const moveRangeX = 8;   // było 4 — teraz dwa razy większy zakres
    const moveRangeY = 6;   // było 3 — teraz schodzi niżej i wyżej

    // PRĘDKOŚĆ — WOLNIEJSZA
    const speed = 4000;     // było 2500 — teraz płynniejszy, spokojniejszy

    // Twoja baza z CSS
    const baseTranslateX = -50;
    const baseTranslateY = -40;
    const baseScale = 1.3;

    function animateKeeper() {

        // losowe przesunięcia
        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX;
        const offsetY = (Math.random() * moveRangeY * 2) - moveRangeY;

        // skala zależna od Y
        const t = offsetY / moveRangeY; 
        const scaleFactor = 1 + t * 0.10; // było 0.08 — teraz wyraźniejsza zmiana
        const finalScale = baseScale * scaleFactor;

        keeper.style.transition = `transform ${speed}ms ease-in-out`;

        keeper.style.transform = `
            translate(${baseTranslateX}%, ${baseTranslateY}%)
            translate(${offsetX}%, ${offsetY}%)
            scale(${finalScale})
        `;

        setTimeout(animateKeeper, speed);
    }

    animateKeeper();
});
