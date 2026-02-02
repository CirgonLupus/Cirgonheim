// Otwieranie wrót + dźwięk
const btn = document.getElementById("enter-btn");
const sound = document.getElementById("gate-sound");

btn.addEventListener("click", () => {
    document.querySelector(".gate-container").classList.add("gate-open");
    sound.currentTime = 0;
    sound.play();

    // Po otwarciu wrót przechodzimy dalej
    setTimeout(() => {
        goToDistrict();
    }, 2000); // 2 sekundy po kliknięciu
});

// Animacja przejścia do dzielnicy
function goToDistrict() {
    const overlay = document.getElementById("transition-overlay");

    overlay.classList.add("flash");

    setTimeout(() => {
        overlay.classList.remove("flash");
        overlay.classList.add("fade-out");
    }, 250);

    setTimeout(() => {
        window.location.href = "district/dis1/dis1_gatesquare.html";
    }, 1100);
}
