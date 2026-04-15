document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    const isMobile = window.innerWidth <= 768;

    // ============================
    // PARAMETRY DESKTOP
    // ============================
    const desktop = {
        moveRangeX: 20,     // szeroki ruch na boki
        moveRangeY: 30,     // tylko w dół
        speed: 4000,       // wolniejszy
        baseTranslateX: -50,
        baseTranslateY: -40,
        baseScale: 1.3,
        scalePower: 0.95   // jak mocno rośnie
    };

    // ============================
    // PARAMETRY MOBILE
    // ============================
    const mobile = {
        moveRangeX: 12,    // większy zakres, bo ekran mały
        moveRangeY: 10,    // schodzi wyraźnie niżej
        speed: 4500,       // jeszcze wolniejszy
        baseTranslateX: -50,
        baseTranslateY: -55, // z Twojego CSS
        baseScale: 0.7,      // z Twojego CSS
        scalePower: 0.35     // mocniejszy efekt, bo inaczej prawie niewidoczny
    };

    // wybór zestawu
    const cfg = isMobile ? mobile : desktop;

    function animateKeeper() {

        // X: symetrycznie
        const offsetX = (Math.random() * cfg.moveRangeX * 2) - cfg.moveRangeX;

        // Y: tylko w dół
        const offsetY = Math.random() * cfg.moveRangeY;

        // skala zależna od Y
        const t = offsetY / cfg.moveRangeY; // 0..1
        const scaleFactor = 1 + t * cfg.scalePower;
        const finalScale = cfg.baseScale * scaleFactor;

        keeper.style.transition = `transform ${cfg.speed}ms ease-in-out`;

        keeper.style.transform = `
            translate(${cfg.baseTranslateX}%, ${cfg.baseTranslateY}%)
            translate(${offsetX}%, ${offsetY}%)
            scale(${finalScale})
        `;

        setTimeout(animateKeeper, cfg.speed);
    }

    animateKeeper();
});
