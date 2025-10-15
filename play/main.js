import App from '../assets/js/board.js';

const app = new App('board', true, true);
const dialog = document.getElementById('dialog');

/*const channel = pc.createDataChannel('moix');

channel.onopen = _=> channel.send('Hola!');
channel.onmessage = e => console.log(e.data);
pc.onicecandidate = e => {
  if (e.candidate) console.log(e.candidate);
};

async function create() {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return JSON.stringify(pc.localDescription);
}

async function set(value) {
  const answer = JSON.parse(value);
  await pc.setRemoteDescription(answer);
}
*/
function display() {
  app.resize();
}
function update() {
}

window.dlgOpen = _=>{
  dialog.showModal();
};
window.dlgClose = _=>{
  dialog.close();
};
window.addEventListener('resize', display);
display();
