// Automatyczne nakładanie obrazów na elementy .protected-image
document.querySelectorAll('.protected-image').forEach(el => {
    const url = el.dataset.img;
    if (url) {
        el.style.backgroundImage = `url('${url}')`;
    }
});

// Blokada prawego przycisku myszy tylko na chronionych obrazach
document.addEventListener('contextmenu', e => {
    if (e.target.closest('.protected-image')) {
        e.preventDefault();
    }
});
