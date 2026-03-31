/* Globalne utrudnienia kopiowania */
.protected-image, 
.protected-image * {
    -webkit-user-drag: none;
    user-select: none;
}

/* Kontener chronionego obrazka */
.protected-image {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* Niewidzialna folia blokująca interakcje */
.protected-image::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: transparent;
    z-index: 10;
    pointer-events: all;
}
