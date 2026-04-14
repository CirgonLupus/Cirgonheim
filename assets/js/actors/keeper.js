export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Zakres ruchu w % ekranu
       const realH = () => window.innerHeight;
const realW = () => window.innerWidth;

// --- FUNKCJA RUCHU GÓRA/DÓŁ + SKALA ---
const moveVertical = () => {

    const goingDown = Math.random() > 0.5;
    const targetY = goingDown ? maxY : minY;

    const t = (targetY - minY) / (maxY - minY);
    const targetScale = scaleAtMinY + t * (scaleAtMaxY - scaleAtMinY);

    const duration = 2000 + Math.random() * 2000;

    char.style.transition = `
        top ${duration}ms ease-in-out,
        transform ${duration}ms ease-in-out
    `;

    char.style.top = `${(targetY/100) * realH()}px`;
    char.style.transform = `translate(-50%, -50%) scale(${targetScale})`;

    setTimeout(moveVertical, duration + 500 + Math.random() * 1000);
};

// --- FUNKCJA RUCHU LEWO/PRAWO ---
const moveHorizontal = () => {

    const goingRight = Math.random() > 0.5;
    const targetX = goingRight ? maxX : minX;

    const duration = 1500 + Math.random() * 2000;

    char.style.transition = `
        left ${duration}ms ease-in-out
    `;

    char.style.left = `${(targetX/100) * realW()}px`;

    setTimeout(moveHorizontal, duration + 500 + Math.random() * 1000);
};

            char.style.left = `${targetX}vw`;

            setTimeout(moveHorizontal, duration + 500 + Math.random() * 1000);
        };

        // start ruchów
        setTimeout(moveVertical, 500);
        setTimeout(moveHorizontal, 800);
    });
}
