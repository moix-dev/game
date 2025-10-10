import Board from '../assets/js/board.js';
const board = new Board('board');
board.makeCanvas();
window.addEventListener('resize', board.resizeCanvas.bind(board));
