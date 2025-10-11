import App from '../assets/js/board.js';

const app = new App('board');

function display() {
  app.resize();
}

window.addEventListener('resize', display);
display();
