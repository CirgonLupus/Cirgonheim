export function initCarousel(startIndex = 0) {
    const cards = document.querySelectorAll('.house-card');
    let currentIndex = startIndex;

    function update() {
        cards.forEach((card, index) => {
            card.style.visibility = "visible";
            card.classList.remove('active');
            let offset = index - currentIndex;
            
            let rotateY = offset * 45; 
            let translateX = offset * 550; 
            let translateZ = Math.abs(offset) * -500;

            card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
            card.style.opacity = (Math.abs(offset) > 1) ? "0" : "1";
            card.style.filter = offset === 0 ? "none" : "brightness(0.3) blur(2px)";
            card.style.zIndex = 100 - Math.abs(offset);
            
            if (offset === 0) card.classList.add('active');
        });
    }

    // Metody sterowania
    const moveNext = () => { if (currentIndex < cards.length - 1) { currentIndex++; update(); } };
    const movePrev = () => { if (currentIndex > 0) { currentIndex--; update(); } };

    // Obsługa kliknięć w karty
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index === currentIndex) {
                const url = card.getAttribute('data-url');
                if (url) window.location.href = url;
            } else {
                currentIndex = index;
                update();
            }
        });
    });

    // Inicjalizacja pozycji
    update();

    return { moveNext, movePrev };
}
