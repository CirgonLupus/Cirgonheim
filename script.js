const gateSound = new Audio("sounds/open_gate.mp3");

function enterCity() {
    gateSound.play();

    document.querySelector('.left').style.transform = "translateX(-100%)";
    document.querySelector('.right').style.transform = "translateX(100%)";

    // Efekt oślepienia po otwarciu bramy
    setTimeout(() => {
        document.querySelector('.flash').style.opacity = "1";
    }, 1500);

    // Przejście do kolejnej dzielnicy
    setTimeout(() => {
        window.location.href = "district/dis1/dis1_gatesquare.html";
    }, 2500);
}
