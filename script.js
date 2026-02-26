/**
 * Cirgonheim - Core Security Script
 */

// Blokada menu kontekstowego (prawy przycisk myszy)
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Blokada skrótów klawiszowych używanych do kradzieży treści
document.addEventListener('keydown', (event) => {
    // F12
    if (event.keyCode === 123) {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+S (Zapisz), Ctrl+U (Kod źródłowy), Ctrl+Shift+I (Inspektor)
    if (event.ctrlKey && (
        event.keyCode === 83 || 
        event.keyCode === 85 || 
        event.keyCode === 73 || 
        (event.shiftKey && event.keyCode === 73)
    )) {
        event.preventDefault();
        return false;
    }
});

// Blokada przeciągania czegokolwiek (obrazków, tekstów)
document.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

console.log("Cirgonheim: Niewidzialna tarcza aktywna.");
