const btn = document.getElementById('enter-btn');
const audio = new Audio('sound/open.mp3'); // ścieżka do dźwięku otwierania

btn.addEventListener('click', () => {
    audio.play(); // dźwięk otwierania

    document.body.classList.add('open'); // animacja wrót

    // rozjaśnienie po chwili
    setTimeout(() => {
        document.querySelector('.flash').classList.add('active');
    }, 1500);

    // przejście do kolejnej dzielnicy
    setTimeout(() => {
        window.location.href = "dzielnica.html";
    }, 2600);
});
