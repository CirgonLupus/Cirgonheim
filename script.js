document.addEventListener('DOMContentLoaded', () => {
    // Pobranie elementów
    const enterBtn = document.getElementById('enter-btn');
    const welcomeText = document.getElementById('welcome-text');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const gateSound = document.getElementById('gate-sound');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Słownik tłumaczeń
    const translations = {
        pl: {
            welcome: "Znajdujesz się u wrót Cirgonheimu – strony/miasta będącej wizytówką Cirgona Tyberiusa Marcusa Lupusa.<br><br>Jeśli to Twoja pierwsza wizyta, po przekroczeniu wrót skieruj się do punktu informacyjnego. Jeśli wracasz, dobrze Cię znowu gościć.",
            button: "Wejdź do miasta"
        },
        en: {
            welcome: "You stand at the gates of Cirgonheim – a website/city representing Cirgon Tyberius Marcus Lupus.<br><br>If this is your first visit, head to the information point after passing the gates. If you are returning, it is good to have you back.",
            button: "Enter the city"
        }
    };

    // MECHANIZM ZMIANY JĘZYKA
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            
            // Zmiana treści
            if (translations[lang]) {
                welcomeText.innerHTML = translations[lang].welcome;
                enterBtn.innerText = translations[lang].button;
                
                // Aktualizacja wyglądu flag (aktywna/nieaktywna)
                langButtons.forEach(f => f.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    });

    // MECHANIZM OTWIERANIA BRAMY
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // 1. Panel znika natychmiast
            content.style.opacity = '0';
            content.style.pointerEvents = 'none';

            // 2. Pauza 0.8s przed akcją
            setTimeout(() => {
                // Dźwięk
                if (gateSound) {
                    gateSound.play().catch(e => console.log("Audio play blocked by browser"));
                }
                
                // Start animacji wrót
                gateLeft.classList.add('open');
                gateRight.classList.add('open');

                // 3. Przejście do nowej lokalizacji po otwarciu (district - liczba poj.)
                setTimeout(() => {
                    overlay.classList.add('active');
                    setTimeout(() => {
                        window.location.href = 'district/dis1/dis1_gatesquare.html';
                    }, 1000);
                }, 2000); // Czas trwania animacji wrót z CSS
            }, 800);
        });
    }
});
