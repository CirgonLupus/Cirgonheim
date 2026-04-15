document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    const moveRangeX = 4;   // % przesunięcia względem pozycji bazowej
    const moveRangeY = 3;   // % przesunięcia względem pozycji bazowej
    const speed = 2500;

    // Twoja baza z CSS
    const baseTranslateX = -50;
    const baseTranslateY = -40;
    const baseScale = 1.3;

    function animateKeeper() {

        // losowe przesunięcia
        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX; // -4% .. +4%
        const offsetY = (Math.random() * moveRangeY * 2) - moveRangeY; // -3% .. +3%

        // skala zależna od Y
        const t = offsetY / moveRangeY; // -1 .. 1
        const scaleFactor = 1 + t * 0.08; // 8% różnicy między górą a dołem
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
