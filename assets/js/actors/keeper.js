document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    // PARAMETRY RUCHU
    const moveRangeX = 4;   // odchylenie lewo-prawo w %
    const moveRangeY = 3;   // odchylenie góra-dół w %
    const speed = 2500;     // czas jednego przejścia (ms)

    // BAZA – zgodna z Twoim CSS
    function getBaseTransform() {
        const isMobile = window.innerWidth <= 768;

        return {
            baseX: -50,                 // zawsze -50%
            baseY: isMobile ? -60 : -40, // jak w media query
            baseScale: isMobile ? 0.7 : 1.3
        };
    }

    function animateKeeper() {
        const { baseX, baseY, baseScale } = getBaseTransform();

        // losowe przesunięcia wokół pozycji bazowej
        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX; // [-moveRangeX, +moveRangeX]
        const offsetY = (Math.random() * moveRangeY * 2) - moveRangeY; // [-moveRangeY, +moveRangeY]

        // skala zależna od Y:
        // offsetY = 0  → skala bazowa
        // offsetY > 0  → niżej → większy
        // offsetY < 0  → wyżej → mniejszy
        const scaleStrength = 0.06; // jak mocno reaguje na Y
        const t = offsetY / moveRangeY; // -1 .. 1
        const scaleFactor = 1 + t * scaleStrength;
        const finalScale = baseScale * scaleFactor;

        keeper.style.transition = `transform ${speed}ms ease-in-out`;
        keeper.style.transform = `
            translate(${baseX + offsetX}%, ${baseY + offsetY}%)
            scale(${finalScale})
        `;

        setTimeout(animateKeeper, speed);
    }

    animateKeeper();

    // opcjonalnie: reaguj na zmianę rozmiaru okna, żeby po resize nie zostać w złej bazie
    window.addEventListener("resize", () => {
        // reset do bazy po resize
        const { baseX, baseY, baseScale } = getBaseTransform();
        keeper.style.transform = `
            translate(${baseX}%, ${baseY}%)
            scale(${baseScale})
        `;
    });
});
