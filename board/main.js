import App from '../assets/js/board.js';

const storage = sessionStorage;
const dialog = document.getElementById('dialog');
const app = new App('board', true);

function display() {
  app.resize();
}

window.addEventListener('resize', display);
display();
