import App from '../assets/js/board.js';

const storage = sessionStorage;
const dialog = document.getElementById('dialog');
const app = new App('board', true);

if (app.getLang() != 'es') {
  const clone = document.getElementById('tpl-en-form').content.cloneNode(true);
  dialog.innerHTML = '';
  dialog.appendChild(clone);
}

function display() {
  app.resize();
}

app.canvas.addEventListener('click', event => {
  let [x,y] = app.getPosition(event);
  if (x==8&&y==8) {
    app.global.player = 1;
    app.showStates();
  }
  else if (x==0&&y==0) {
    app.global.player = 2;
    app.showStates();
  }
  else if ((x>0 && x<8) && (y>0 && y<8)) {
    x = x-1;
    y = y-1;
    if (!app.pieces[x*7+y]) {
      const player = app.global.player;
      if (player == 1)
        app.setCell(x,y,0,0,player,app.global.sun.state);
      else if (player == 2)
        app.setCell(x,y,0,0,player,app.global.moon.state);
    } 
    else {
      const piece = app.getCell(x,y);
      const selected = app.global.selected;
      if (piece[2] != app.global.player) {
        app.delCell(x,y);
      }
      else {
        if (selected.x!=x||selected.y!=y) {
          app.global.selected = {x,y,z:0};
        }
        if (app.global.selected.z == 1)
          app.setCell(x,y,0,1,piece[2],piece[3]);
        else if (app.global.selected.z == 2)
          app.setCell(x,y,1,2,piece[2],piece[3]);
        else {
          app.global.selected.z=0;
          app.setCell(x,y,0,0,piece[2],piece[3]);
        }
        app.global.selected.z +=1;
      }
    }
    app.showPieces();
  }
});
app.canvas.addEventListener('dblclick', event => {
  const [x,y] = app.getPosition(event);
  if (x==8&&y==8) {
    app.global.sun.state = (app.global.sun.state + 1) % 4;
    app.showStates();
  }
  else if (x==0&&y==0) {
    app.global.moon.state = (app.global.moon.state + 1) % 4;
    app.showStates();
  }
});
window.onSubmit = (event) => {
  event.preventDefault();
  const logs = event.target.log.value.split(';');
  if (logs.length > 0) app.newPieces();
  logs.forEach(log=>{
    if (log.length < 5) return;
    const [x,y,player,position] = app.logToCell(log);
    if (player) app.setCell(x,y,0,0,player,position);
  });
  if (logs.length > 0) app.showPieces();
};
window.copy = _=>{
  const form = dialog.querySelector('form');
  navigator.clipboard.writeText(form.log.value);
};
window.dlgOpen = _=>{
  const form = dialog.querySelector('form');
  form.log.value = '';
  for (let y=6;y>-1;y--) {
    for (let x=6;x>-1;x--) {
      if (!app.pieces[x*7+y]) continue;
      const piece = app.getCell(x,y);
      const log = app.cellToLog(x,y,piece);
      form.log.value += log ?? '';
    }
  }
  dialog.showModal();
};
window.dlgClose = _=>{
  dialog.close();
};
window.addEventListener('resize', display);
display();
