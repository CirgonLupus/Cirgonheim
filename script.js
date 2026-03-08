const translations = {
    pl: {
        welcome: "Znajdujesz się u wrót Cirgonheimu.<br><br>Jeśli to Twoja pierwsza wizyta, skieruj się do Domu Informacyjnego.<br><br>Jeśli to Twoja kolejna wizyta, miło Cię znów gościć w moich progach!",
        enterBtn: "Wejdź"
    },
    en: {
        welcome: "You stand before the gates of Cirgonheim.<br><br>If this is your first visit, please head to the Information House.<br><br>If you are returning, it is a pleasure to have you back within my walls!",
        enterBtn: "Enter"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const welcomeText = document.getElementById('welcome-text');
    const enterBtn = document.getElementById('enter-btn');
    const langBtns = document.querySelectorAll('.lang-btn');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const transitionOverlay = document.getElementById('transition-overlay');

    // Funkcja zmiany języka
    function changeLanguage(lang) {
        welcomeText.innerHTML = translations[lang].welcome;
        enterBtn.textContent = translations[lang].enterBtn;

        // Aktywacja odpowiedniej flagi
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Obsługa kliknięć w flagi
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });

    // Obsługa wejścia (Otwieranie bramy)
    enterBtn.addEventListener('click', () => {
        // 1. Dźwięk
        if (gateSound) gateSound.play();

        // 2. Animacja bramy
        gateLeft.classList.add('open');
        gateRight.classList.add('open');

        // 3. Ukrycie panelu tekstowego
        document.querySelector('.gate-content').style.opacity = '0';
        document.querySelector('.gate-content').style.pointerEvents = 'none';

        // 4. Przejście do następnej strony
        setTimeout(() => {
            transitionOverlay.classList.add('active');
            setTimeout(() => {
                window.location.href = 'district/dis1/dis1_gatesquare.html';
            }, 1000);
        }, 1500);
    });
});
