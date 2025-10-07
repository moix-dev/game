'use strict';

const sunColor = '#FFF';
const moonColor = '#000';
const lineColor = '#222';
const boardColor = 'PERU';
const focusColor = '#FFF9';
const hoverColor = '#0009';
const squareColor = '#0003';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Config Canvas
var box = 0;
var mX = 0;
var mY = 0;
var boardImage = false;
var sunImages = [];
var moonImages = [];

// Config Board
var boardSquares = {};
var parentState = 0;
var sunState = 0;
var moonState = 0;


function draw() {
  box = parseInt(canvas.offsetWidth / 7);

  canvas.style.opacity = '0';
  drawParent(sunImages, sunColor);
  drawParent(moonImages, moonColor);
  drawBoard();
  canvas.style.opacity = '1';

  drawSquares();
}

// Parent
function drawParent(parent, color) {
  const pos = [
    [0.5, 0.2], // top
    [0.2, 0.5], // left
    [0.5, 0.8], // bottom
    [0.8, 0.5], // right
  ];
  canvas.width = box;
  canvas.height = box;

  for (var p of pos) {
    ctx.beginPath();
    ctx.arc(box / 2, box / 2, box / 2, 0, Math.PI * 2);
    ctx.arc(box * p[0], box * p[1], box / 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill('evenodd');

    const img = new Image();
    img.src = canvas.toDataURL();
    parent.push(img);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Board
function drawBoard() {
  const b = box;

  canvas.width = b * 7;
  canvas.height = b * 7;

  ctx.fillStyle = lineColor;

  for (var x = 1; x < 7; x++) {
    ctx.fillRect(x * b, 0, 0.01 * b, 7 * b);
    ctx.fillRect(0, x * b, 7 * b, 0.01 * b);
  }

  ctx.fillStyle = squareColor;
  // Islas
  ctx.fillRect(0, 0, b, b);
  ctx.fillRect(0, 6 * b, b, b);
  ctx.fillRect(6 * b, 0, b, b);
  ctx.fillRect(6 * b, 6 * b, b, b);
  // Continente
  ctx.fillRect(0, 3 * b, 7 * b, b);
  ctx.fillRect(3 * b, 0, b, 7 * b);
  ctx.fillRect(1 * b, 2 * b, 5 * b, 3 * b);
  ctx.fillRect(2 * b, 1 * b, 3 * b, 5 * b);

  boardImage = new Image();
  boardImage.src = canvas.toDataURL();
}

function boardClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(boardImage, 0, 0, canvas.width, canvas.height);
}

function addEventHover() {
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mX = Math.floor((event.clientX - rect.left) / box);
    mY = Math.floor((event.clientY - rect.top) / box);

    boardClear();
    ctx.fillStyle = hoverColor;
    ctx.fillRect(mX * box, mY * box, box, box);

    drawSquares();
  });
}

// Squares
function drawSquares() {
  for (const key in boardSquares) {
    const value = boardSquares[key];
    const x = parseInt(key[1]) * box;
    const y = parseInt(key[2]) * box;
    const pad = box * 0.1;
    const parent = value[0] == '+' ? 1 : -1;
    const state = parseInt(value[1]);
    const images = parent == 1 ? sunImages : moonImages;

    ctx.drawImage(images[state], x + pad, y + pad, box * 0.8, box * 0.8);
  }
}

// Text
function drawText(x, y, size, color, text) {
  ctx.font = parseInt(size * box) + 'px Arial';
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, x * box, y * box);
}

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * box, y * box, width * box, height * box);
}

function drawRectStroke(x, y, line, width, height, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = line * box;
  ctx.strokeRect(x * box, y * box, width * box, height * box);
}

function drawCircle(x, y, radio, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x * box, y * box, radio * box / 2, 0, Math.PI * 2);
  ctx.fill();
}

// Init
window.addEventListener('resize', draw);
draw();
