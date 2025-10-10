import Board from '../assets/js/board.js';
const board = new Board('board');
board.makeCanvas();
window.addEventListener('resize', board.resizeCanvas.bind(board));

/*'use strict';

const barTop = document.getElementById('bar-top');
const soundPly = document.getElementById('sound-ply');
const mainMenu = document.getElementById('main-menu');
const barBottom = document.getElementById('bar-bottom');
const soundBadge = document.getElementById('sound-badge');
const buttons = document.querySelectorAll('.parents button');

// General
function load() {
  const mode = location.hash.slice(1);
  if (!mode) return;

  mainMenu.classList.add('none');
  barTop.classList.remove('none');
  barBottom.classList.remove('none');

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
    }
    else if (name == 'moon') {
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

function getMessage(space, x, y, parent, state) {
  let message = '';

  if (space == 'yupana') {
    const val = [1, 2, 3, 5, 3, 2, 1][x];

    message = `${val}(X<sup>${6 - y}</sup>)`;
  }
  else if (space == 'andes') {
    const iconParent = parent == '+' ? 'S' : 'M';
    const iconSquare = '○▬●▬'[state];

    message = `${iconParent}<sup>${iconSquare}</sup>`;
  }
  return message;
}

function showMessage(x, y, parent, state) {
  const space = location.hash.slice(1);
  const scale = (space == 'yupana' || parent == '+') ? 6 - y : y;
  const mark = (space == 'yupana' || parent == '+') ? 'GFEDCBA' : 'ABCDEFG';
  const message = getMessage(space, x, y, parent, state);

  barBottom.innerHTML =
    `<sup>${parent + state + '.' + mark[x] + scale}</sup><h1>${message}</h1>`;
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
load();*/
