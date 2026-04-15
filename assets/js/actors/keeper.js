document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    // ZAKRES RUCHU
    const moveRangeX = 8;   // szerzej na boki
    const moveRangeY = 25;   // tylko w dół od bazy
    const speed = 4000;     // wolniejszy ruch

    // BAZA z CSS
    const baseTranslateX = -50;
    const baseTranslateY = -40;
    const baseScale = 1.3;

    function animateKeeper() {
        // X: symetrycznie w lewo/prawo
        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX; // -8 .. +8

        // Y: TYLKO W DÓŁ od bazy
        const offsetY = Math.random() * moveRangeY; // 0 .. +6

        // skala zależna od Y: 0 → baza, maxY → największy
        const t = offsetY / moveRangeY; // 0 .. 1
        const scaleFactor = 1 + t * 0.2; // 12% różnicy między bazą a dołem
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
