console.log("KEEPER.JS LOADED");
document.addEventListener("DOMContentLoaded", () => {
    const keeper = document.querySelector(".char-keeper");
    if (!keeper) return;

    const moveRangeX = 4;
    const moveRangeY = 3;
    const speed = 2500;

    function parseMatrix(matrix) {
        // matrix(a, b, c, d, tx, ty)
        const values = matrix.match(/matrix\((.+)\)/)[1].split(",").map(v => parseFloat(v.trim()));

        const a = values[0];
        const d = values[3];
        const tx = values[4];
        const ty = values[5];

        // scale = a (lub d)
        const scale = a;

        // przeliczamy px → %
        const baseX = (tx / window.innerWidth) * 100;
        const baseY = (ty / window.innerHeight) * 100;

        return { baseX, baseY, baseScale: scale };
    }

    function animateKeeper() {
        const style = window.getComputedStyle(keeper);
        const transform = style.transform;

        if (transform === "none") return;

        const { baseX, baseY, baseScale } = parseMatrix(transform);

        const offsetX = (Math.random() * moveRangeX * 2) - moveRangeX;
        const offsetY = (Math.random() * moveRangeY * 2) - moveRangeY;

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
