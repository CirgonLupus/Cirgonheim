/* ============================================
   CIRGONHEIM — ACTOR: KEEPER (STABLE VERSION)
   ============================================ */

export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        /* -----------------------------------------
           ZAKRES RUCHU W JEDNOSTKACH VIEWPORTU
           ----------------------------------------- */

        const minY = 45;   // 45vh
        const maxY = 70;   // 70vh

        const minX = 42;   // 42vw
        const maxX = 58;   // 58vw

        /* -----------------------------------------
           SKALA W ZALEŻNOŚCI OD WYSOKOŚCI
           ----------------------------------------- */

        const scaleAtMinY = 0.85;
        const scaleAtMaxY = 1.15;

        /* -----------------------------------------
           RUCH GÓRA/DÓŁ + SKALA
           ----------------------------------------- */

        const moveVertical = () => {

            const goingDown = Math.random() > 0.5;
            const targetY = goingDown ? maxY : minY;

            // interpolacja skali
            const t = (targetY - minY) / (maxY - minY);
            const targetScale = scaleAtMinY + t * (scaleAtMaxY - scaleAtMinY);

            const duration = 2000 + Math.random() * 2000;

            char.style.transition = `
                top ${duration}ms ease-in-out,
                transform ${duration}ms ease-in-out
            `;

            // *** POPRAWIONE: stabilna pozycja bez teleportów ***
            char.style.top = `${targetY}vh`;
            char.style.transform = `translate(-50%, -50%) scale(${targetScale})`;

            setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
        };

        /* -----------------------------------------
           RUCH LEWO/PRAWO
           ----------------------------------------- */

        const moveHorizontal = () => {

            const goingRight = Math.random() > 0.5;
            const targetX = goingRight ? maxX : minX;

            const duration = 1500 + Math.random() * 2000;

            char.style.transition = `
                left ${duration}ms ease-in-out
            `;

            // *** POPRAWIONE: stabilna pozycja bez teleportów ***
            char.style.left = `${targetX}vw`;

            setTimeout(moveHorizontal, duration + 500 + Math.random() * 1000);
        };

        /* -----------------------------------------
           START RUCHÓW
           ----------------------------------------- */

        setTimeout(moveVertical, 500);
        setTimeout(moveHorizontal, 800);
    });
}
