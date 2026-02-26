document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const welcomeText = document.getElementById('welcome-text');
    const gateLeft = document.querySelector('.gate-left');
    const gateRight = document.querySelector('.gate-right');
    const content = document.querySelector('.gate-content');
    const overlay = document.getElementById('transition-overlay');
    const gateSound = document.getElementById('gate-sound');
    const langBtns = document.querySelectorAll('.lang-btn');

    const translations = {
        pl: {
            welcome: "Znajdujesz się u wrót Cirgonheimu – strony/miasta będącej wizytówką Cirgona Tyberiusa Marcusa Lupusa.<br><br>Jeśli to Twoja pierwsza wizyta, skieruj się do punktu informacyjnego.",
            button: "Wejdź"
        },
        en: {
            welcome: "You stand at the gates of Cirgonheim – a city representing Cirgon Tyberius Marcus Lupus.<br><br>If this is your first visit, head to the info point.",
            button: "Enter"
        }
    };

    // Logika zmiany języka
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('selectedLang', lang);
            welcomeText.innerHTML = translations[lang].welcome;
            enterBtn.innerText = translations[lang].button;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Logika otwierania bramy
    enterBtn.addEventListener('click', () => {
        content.style.opacity = '0';
        content.style.pointerEvents = 'none';

        setTimeout(() => {
            if(gateSound) gateSound.play().catch(e => {});
            gateLeft.classList.add('open');
            gateRight.classList.add('open');

            setTimeout(() => {
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = 'district/dis1/dis1_gatesquare.html';
                }, 1000);
            }, 2000);
        }, 500);
    });

    // Przywrócenie zapisanego języka
    const savedLang = localStorage.getItem('selectedLang');
    if(savedLang) {
        const btn = document.querySelector(`[data-lang="${savedLang}"]`);
        if(btn) btn.click();
    }

    // --- MECHANIZMY OCHRONY ---

    // Blokada prawego przycisku myszy
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Blokada skrótów klawiszowych (F12, Ctrl+S, Ctrl+U, Ctrl+Shift+I)
    document.addEventListener('keydown', (e) => {
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 73)) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 73)
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Blokada przeciągania grafiki bramy
    document.addEventListener('dragstart', (e) => {
        if (e.target.nodeName === 'IMG' || e.target.classList.contains('gate')) {
            e.preventDefault();
        }
    });
});
