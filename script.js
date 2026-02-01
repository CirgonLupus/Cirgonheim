const btn = document.getElementById('enter-btn');
const audio = new Audio('sounds/open_gate.mp3'); // ścieżka do dźwięku

btn.addEventListener('click', () => {
    audio.play(); // dźwięk otwierania

    document.body.classList.add('open'); // animacja wrót

    // rozjaśnienie
    setTimeout(() => {
        document.querySelector('.flash').classList.add('active');
    }, 1500);

    // przejście do kolejnej strony
    setTimeout(() => {
        window.location.href = "district/dis1/dis1_gatesquare.html";
    }, 2600);
});
