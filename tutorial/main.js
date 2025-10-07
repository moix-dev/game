'use strict';

const barTop = document.getElementById('bar-top');
const mainMenu = document.getElementById('main-menu');
const barBottom = document.getElementById('bar-bottom');

// Config
var pos;
var mode;

const tutorial = {
  'board/0': () => {
    const fontSize = 0.7;
    const color = sunColor;
    const marks = 'GFEDCBA';

    barBottom.innerHTML = '<b>Sun Player</b><br>Marks: G,F,E,D,C,B,A<br>Scales: 0,1,2,3,4,5,6';
    drawText(2.5, 3.15, 0.8, color, 'SUN');
    
    for (var i = 0; i < 7; i++) {
        drawText(6.55, 6 - i, fontSize, color, i.toString());
        drawText(i + 0.1, 6.4, fontSize, color, marks[i]);
    }
  },
  'board/1': () => {
    const fontSize = 0.7;
    const color = moonColor;
    const marks = 'ABCDEFG';

    barBottom.innerHTML = '<b>Moon Player</b><br>Marks: A,B,C,D,E,F,G<br>Scales: 0,1,2,3,4,5,6';
    drawText(2, 3.15, 0.8, color, 'MOON');

    for (var i = 0; i < 7; i++) {
      drawText(0, 6.4 - i, fontSize, color, (6 - i).toString());
      drawText(i + 0.45, 0, fontSize, color, marks[i]);
    }
  },
  'board/2': () => {
    const marks = '1235321';

    barBottom.innerHTML = '<b>Yupana</b><br>Weights: 1,2,3,5,3,2,1<br>Scales: 0,1,2,3,4,5,6';

    for (var i = 0; i < 7; i++) {
      drawText(6.8, 6.1 - i, 0.3, sunColor, i.toString());
      drawText(i + 0.05, 0.75, 0.2, moonColor, marks[i]);
    }

    // one
    drawCircle(0.5, 0.5, 0.4, moonColor);
    drawCircle(6.5, 0.5, 0.4, moonColor);

    drawCircle(0.5, 6.5, 0.4, moonColor);
    drawCircle(6.5, 6.5, 0.4, moonColor);

    // two
    drawCircle(5.5, 6.3, 0.3, moonColor);
    drawCircle(5.5, 6.7, 0.3, moonColor);

    drawCircle(1.5, 6.3, 0.3, moonColor);
    drawCircle(1.5, 6.7, 0.3, moonColor);

    // three
    drawCircle(4.3, 6.3, 0.3, moonColor);
    drawCircle(4.3, 6.7, 0.3, moonColor);
    drawCircle(4.7, 6.5, 0.3, moonColor);

    drawCircle(2.3, 6.3, 0.3, moonColor);
    drawCircle(2.3, 6.7, 0.3, moonColor);
    drawCircle(2.7, 6.5, 0.3, moonColor);

    // five
    drawCircle(3.4, 6.2, 0.2, moonColor);
    drawCircle(3.4, 6.5, 0.2, moonColor);
    drawCircle(3.4, 6.8, 0.2, moonColor);

    drawCircle(3.6, 6.35, 0.2, moonColor);
    drawCircle(3.6, 6.65, 0.2, moonColor);
  },
  'pieces/0': () => {
    barBottom.innerHTML = '<b>Person</b><br>Move a position to any location.';

    drawRect(2, 2, 3, 3, hoverColor);

    ctx.drawImage(sunImages[0], 3.1 * box, 3.1 * box, box * 0.8, box * 0.8);
  },
  'pieces/1': () => {
    barBottom.innerHTML = '<b>Military</b><br>Moves two positions horizontally or vertically.';

    drawRect(1, 3, 5, 1, hoverColor);
    drawRect(3, 1, 1, 5, hoverColor);

    ctx.drawImage(sunImages[2], 3.1 * box, 3.1 * box, box * 0.8, box * 0.8);
  },
  'pieces/2': () => {
    barBottom.innerHTML = '<b>Ruler</b><br>Moves two positions diagonally.<br>Right and left mean the same thing.';

    drawRect(1, 1, 1, 1, hoverColor);
    drawRect(2, 2, 1, 1, hoverColor);
    drawRect(5, 1, 1, 1, hoverColor);
    drawRect(4, 2, 1, 1, hoverColor);

    drawRect(4, 4, 1, 1, hoverColor);
    drawRect(5, 5, 1, 1, hoverColor);
    drawRect(2, 4, 1, 1, hoverColor);
    drawRect(1, 5, 1, 1, hoverColor);

    ctx.drawImage(sunImages[1], 3.1 * box, 3.1 * box, box * 0.8, box * 0.8);

    ctx.drawImage(moonImages[1], 0.1 * box, 0.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(moonImages[3], 6.1 * box, 0.1 * box, box * 0.8, box * 0.8);
  },
  'pieces/3': () => {
    barBottom.innerHTML = '<b>Attack</b><br>Sun Player "attacks" Moon Player and replaces his position.';

    drawRectStroke(3.025, 2.025, 0.05, 0.95, 4.95, hoverColor);
    drawRectStroke(1.025, 4.025, 0.05, 4.95, 0.95, hoverColor);

    ctx.drawImage(moonImages[0], 3.1 * box, 2.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(sunImages[2], 3.1 * box, 4.1 * box, box * 0.8, box * 0.8);
  },
  'pieces/4': () => {
    barBottom.innerHTML = '<b>K.O.</b><br>The middle piece is removed from the board.';

    drawRectStroke(0.025, 1.025, 0.05, 2.95, 0.95, hoverColor);

    ctx.drawImage(moonImages[0], 0.1 * box, 1.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(sunImages[2], 1.1 * box, 1.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(moonImages[2], 2.1 * box, 1.1 * box, box * 0.8, box * 0.8);

    drawRectStroke(5.025, 4.025, 0.05, 0.95, 2.95, hoverColor);

    ctx.drawImage(sunImages[3], 5.1 * box, 4.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(moonImages[3], 5.1 * box, 5.1 * box, box * 0.8, box * 0.8);
    ctx.drawImage(sunImages[1], 5.1 * box, 6.1 * box, box * 0.8, box * 0.8);
  },
  'squares/0': () => {
    barBottom.innerHTML = '<b>Edge</b><br>Squares on the edge of the board.';

    drawRect(0, 0, 3, 1, hoverColor);
    drawRect(4, 0, 3, 1, hoverColor);

    drawRect(0, 1, 1, 2, hoverColor);
    drawRect(0, 4, 1, 2, hoverColor);

    drawRect(6, 1, 1, 2, hoverColor);
    drawRect(6, 4, 1, 2, hoverColor);

    drawRect(0, 6, 3, 1, hoverColor);
    drawRect(4, 6, 3, 1, hoverColor);
  },
  'squares/1': () => {
    barBottom.innerHTML = '<b>Continent</b><br>Squares on the continental part of the board.';

    drawRect(0, 3, 7, 1, focusColor);
    drawRect(3, 0, 1, 7, focusColor);

    drawRect(1, 2, 5, 3, focusColor);
    drawRect(2, 1, 3, 5, focusColor);
  },
  'squares/2': () => {
    barBottom.innerHTML = '<b>Center & Peak</b><br>Square in the center of the board, also known as the peak of the continent.';

    drawRect(3, 3, 1, 1, '#0FFA');
  },
  'squares/3': () => {
    barBottom.innerHTML = '<b>Mountain</b><br>';

    drawRect(2, 2, 3, 1, '#F0FA');
    drawRect(2, 3, 1, 1, '#F0FA');
    drawRect(4, 3, 1, 1, '#F0FA');
    drawRect(2, 4, 3, 1, '#F0FA');
  },
  'squares/4': () => {
    barBottom.innerHTML = '<b>Jungle</b><br>';

    drawRect(2, 1, 3, 1, '#0F0A');
    drawRect(1, 2, 1, 3, '#0F0A');
    drawRect(5, 2, 1, 3, '#0F0A');
    drawRect(2, 5, 3, 1, '#0F0A');
  },
  'squares/5': () => {
    barBottom.innerHTML = '<b>Coast</b><br>';

    drawRect(3, 0, 1, 1, '#FF0A');
    drawRect(0, 3, 1, 1, '#FF0A');
    drawRect(6, 3, 1, 1, '#FF0A');
    drawRect(3, 6, 1, 1, '#FF0A');
  },
  'squares/6': () => {
    barBottom.innerHTML = '<b>Ocean</b><br>';

    drawRect(1, 0, 2, 1, '#00FA');
    drawRect(4, 0, 2, 1, '#00FA');

    drawRect(0, 1, 2, 1, '#00FA');
    drawRect(5, 1, 2, 1, '#00FA');

    drawRect(0, 2, 1, 1, '#00FA');
    drawRect(6, 2, 1, 1, '#00FA');

    drawRect(0, 4, 1, 1, '#00FA');
    drawRect(6, 4, 1, 1, '#00FA');

    drawRect(0, 5, 2, 1, '#00FA');
    drawRect(5, 5, 2, 1, '#00FA');

    drawRect(1, 6, 2, 1, '#00FA');
    drawRect(4, 6, 2, 1, '#00FA');
  },
  'squares/7': () => {
    barBottom.innerHTML = '<b>Island</b><br>';

    drawRect(0, 0, 1, 1, '#F00A');
    drawRect(0, 6, 1, 1, '#F00A');
    drawRect(6, 0, 1, 1, '#F00A');
    drawRect(6, 6, 1, 1, '#F00A');
  }
};

// General
function load() {
  const hash = location.hash.slice(1);
  if (!hash) return;

  const path = hash.split('/');
  mode = path[0];
  pos = parseInt(path[1]) || 0;

  mainMenu.classList.add('none');
  barTop.classList.remove('none');
  barBottom.classList.remove('none');

  barTop.querySelector('h4 span').innerHTML = mode.toUpperCase();
  barBottom.innerHTML = '';

  // Tutorial
  const tuto = tutorial[hash];
  if (tuto) {
    if (boardImage.complete) boardClear();
    tuto();
  }
}

function toNext() {
  const key = mode + '/' + (pos + 1);

  location.hash = '#' + (tutorial.hasOwnProperty(key) ? key : (mode + '/0'));
}

function toPrev() {
  const prev = pos - 1;

  location.hash = '#' + mode + '/' + (prev < 0 ? 0 : prev);
}

window.addEventListener('hashchange', load);
load();
