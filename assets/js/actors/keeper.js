<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Wnętrze – Infohouse</title>
    <style>
        :root { --gold: #c5a059; }
        body, html { 
            margin: 0; padding: 0; width: 100%; height: 100%; 
            background: #000 url('../../assets/img/indoor.png') no-repeat center center / cover;
            overflow: hidden; position: relative;
        }
        .character-container {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 10; pointer-events: none;
        }
        .character { 
            position: absolute;
            left: 50%;
            top: 50%; 
            width: 150px; 
            /* Start: Środek, Obniżenie 1/5, Skala 2.0 */
            transform: translateX(-50%) translateY(20%) scale(2.0);
            filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
        }
        .exit-btn { 
            position: fixed; top: 30px; left: 30px; padding: 12px 35px; 
            background: rgba(0,0,0,0.85); border: 1px solid var(--gold); 
            color: var(--gold); text-decoration: none; text-transform: uppercase; 
            letter-spacing: 3px; font-size: 0.85rem; z-index: 1000;
        }
    </style>
</head>
<body>
    <a href="../../District/dis1/dis1_gatesquare.html" class="exit-btn">‹ Powrót na plac</a>
    <div class="character-container">
        <img src="../../assets/img/001_winered.png" class="character char-keeper">
    </div>
    <script type="module">
        import { initKeepers } from '../../assets/js/actors/keeper.js';
        window.onload = () => { initKeepers(); };
    </script>
</body>
</html>
                
