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

// Funkcja zmiany języka - używamy innerHTML, by czytało <br>
function updateLanguage(lang) {
    const welcomeText = document.getElementById('welcome-text');
    const enterBtn = document.getElementById('enter-btn');
    
    if (welcomeText) welcomeText.innerHTML = translations[lang].welcome;
    if (enterBtn) enterBtn.textContent = translations[lang].enterBtn;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// PRZYWRÓCONA TWOJA LOGIKA ANIMACJI
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.dataset.lang);
        });
    });

    // Tutaj wklej swoją oryginalną funkcję obsługi przycisku #enter-btn, 
    // którą miałeś wcześniej, żeby animacja bramy była identyczna.
    
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', () => {
        // Przywróć tutaj dokładnie te linijki, które miałeś wcześniej 
        // (z dźwiękiem, dodawaniem klasy 'open' i overlayem).
        
        const gateSound = document.getElementById('gate-sound');
        if (gateSound) gateSound.play();

        document.querySelector('.gate-left').classList.add('open');
        document.querySelector('.gate-right').classList.add('open');
        document.querySelector('.gate-content').style.opacity = '0';

        setTimeout(() => {
            document.getElementById('transition-overlay').classList.add('active');
            setTimeout(() => {
                window.location.href = 'district/dis1/dis1_gatesquare.html';
            }, 1000);
        }, 1500);
    });
});
