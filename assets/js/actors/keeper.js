document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    // PARAMETRY RUCHU
    const moveRangeX = 4;   // maksymalne odchylenie lewo-prawo (%)
    const moveRangeY = 3;   // maksymalne odchylenie góra-dół (%)
    const speed = 2500;     // czas jednego przejścia (ms)

    function parseTransform(transform) {
        // transform: translate(-50%, -40%) scale(1.3)
        const translateMatch = transform.match(/translate\(([-0-9.]+)%,\s*([-0-9.]+)%\)/);
        const scaleMatch = transform.match(/scale\(([-0-9.]+)\)/);

        return {
            baseX: translateMatch ? parseFloat(translateMatch[1]) : -50,
            baseY: translateMatch ? parseFloat(translateMatch[2]) : -40,
            baseScale: scaleMatch ? parseFloat(scaleMatch[1]) : 1
        };
    }

    function animateKeeper() {
        const style = window.getComputedStyle(keeper);
        const { baseX, baseY, baseScale } = parseTransform(style.transform);

        // losowe przesunięcia
        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX;
        const offsetY = (Math.random() * moveRangeY * 2) - moveRangeY;

        // skala zależna od Y
        const scaleOffset = offsetY / (moveRangeY * 10);
        const finalScale = baseScale + scaleOffset;

        keeper.style.transition = `transform ${speed}ms ease-in-out`;
        keeper.style.transform = `
            translate(${baseX + offsetX}%, ${baseY + offsetY}%)
            scale(${finalScale})
        `;

        setTimeout(animateKeeper, speed);
    }

    animateKeeper();
});
