export function initKeepers() {
    const actors = document.querySelectorAll('.char-keeper');

    actors.forEach(char => {

        // Skala ludzika
        const scale = 3.0;

        // Ustawienia pozycji w pikselach — możesz zmieniać jak chcesz
        const posX = 1000;  // <-- tu ustawiasz pozycję poziomą
        const posY = 625;  // <-- tu ustawiasz pozycję pionową (podnieś/opuść)

        char.style.position = "absolute";
        char.style.left = `${posX}px`;
        char.style.top = `${posY}px`;
        char.style.transformOrigin = "bottom center";
        char.style.transform = `translateX(-50%) scale(${scale})`;
    });
}
