'use strict';

const mainMenu = document.getElementById('main-menu');
const barTop = document.getElementById('bar-top');
const barBottom = document.getElementById('bar-bottom');
const buttons = document.querySelectorAll('.parents button');
const soundPly = document.getElementById('sound-ply');
const soundBadge = document.getElementById('sound-badge');

// General
function load() {
    const mode = location.hash.slice(1);
    if (!mode) return;

    mainMenu.classList.add('none');
    barTop.classList.remove('none');

    barTop.querySelector('h4 span').innerHTML = mode.toUpperCase();

    // board hover
    addEventHover();
}

// UI
barBottom.addEventListener('click', event => {
    barBottom.classList.toggle('none');
});

buttons.forEach(btn => {
    btn.addEventListener('dblclick', event => {
        const name = event.target.getAttribute('data-name');
        const max = 3;
        let state = 0;

        if (name == 'sun') {
            sunState = (sunState + 1) % (max + 1);
            state = sunState;
        } else if (name == 'moon') {
            moonState = (moonState + 1) % (max + 1);
            state = moonState;
        }
        const angle = state * -90;

        btn.style.transform = `rotate(${angle}deg)`;
    });

    btn.addEventListener('click', event => {
        const name = event.target.getAttribute('data-name');

        buttons.forEach(e => e.classList.remove('active'));
        event.target.classList.add('active');

        if (name == 'sun') parentState = 1;
        else if (name == 'moon') parentState = -1;
    });
});

function getMessage(x, y, parent, state) {
    let message = '';
    const space = location.hash.slice(1);

    if (space == 'yupana') {
        const val = [1, 2, 3, 5, 3, 2, 1][x];
        message = `${val}(X<sup>${6 - y}</sup>)`;
    }
    else if (space == 'andes') {
        const iconParent = parent == '+' ? '🌞' : '🌜';
        const iconSquare = '○▬●▬'[state];
        message = `${iconParent}<sup>${iconSquare}</sup>`;
    }
    return message;
}

function showMessage(x, y, parent, state) {
    const mark = 'GFEDCBA'[x];
    const scale = 6 - y;
    const message = getMessage(x, y, parent, state);

    barBottom.innerHTML =
        `<sup>${parent + state + '.' + mark + scale}</sup><h1>${message}</h1>`;
    barBottom.classList.remove('none');
}

function soundPlyPlay() {
    soundPly.volume = 0.5;
    soundPly.play();
}

function soundBadgePlay() {
    soundBadge.volume = 0.5;
    soundBadge.play();
}

canvas.addEventListener('click', event => {
    if (parentState) {
        const key = 'k' + mX + mY;

        if (!boardSquares.hasOwnProperty(key)) {
            const parent = parentState == 1 ? '+' : '-';
            const state = parentState == 1 ? sunState : moonState;

            boardSquares[key] = parent + state;

            showMessage(mX, mY, parent, state);

            soundPlyPlay();
        }
        else {
            delete boardSquares[key];
        }

        draw();
    }
});

window.addEventListener('hashchange', load);
load();
