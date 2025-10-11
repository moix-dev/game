import App from '../assets/js/board.js';

const dialog = document.getElementById('dialog');
const tpl = document.getElementById('tpl-dialog');
const app = new App('board');
const color1 = app.getColor(1);
const color2 = app.getColor(2);
const tutorial = {
  'board/0': _=>{
    for (let x = 0; x<7;x++) {
      app.drawText(7.4 - x, 8.07, 0.5, color1, 'ABCDEFG'[x]);
      app.drawText(8.07, 7.4 - x, 0.5, color1, x.toString());
    }
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
      dialog.style.right = '20%';
    }
    return {
      title: 'Sol',
      desc: 'Marcas: G, F, E, D, C, B, A<br>Escalas: 0, 1, 2, 3, 4, 5, 6'
    }
  },
  'board/1': _=>{
    for (let x = 0; x<7;x++) {
      app.drawText(x + 1.4, 0.5, 0.5, color2, 'ABCDEFG'[x]);
      app.drawText(0.6, 7.4 - x, 0.5, color2, (6 - x).toString());
    }
    return {
      title: 'Luna',
      desc: 'Marcas: A, B, C, D, E, F, G<br>Escalas: 0, 1, 2, 3, 4, 5, 6'
    }
  },
  'board/2': _=>{
    for (let x = 0; x<7;x++) {
      app.drawText(7.4 - x, 8.07, 0.5, color1, '1235321'[x]);
      app.drawText(8.07, 7.4 - x, 0.5, color2, x.toString());
    }
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
      dialog.style.right = '20%';
    }
    return {
      title: 'Yupana',
      desc: 'Pesos: 1, 2, 3, 5, 3, 2, 1<br>Escalas: 0, 1, 2, 3, 4, 5, 6'
    }
  },
  'board/3': _=> {
    app.drawText(6, 6.6,1, color1, 'I', null, 'center', 'middle');
    app.drawText(2.5, 6.1,1, color1, 'II', null, 'center', 'middle');
    app.drawText(3, 2.6,1, color1, 'III', null, 'center', 'middle');
    app.drawText(6.5, 3.1,1, color1, 'IV', null, 'center', 'middle');
    app.drawText(4.525,4.6,1, color1, 'X', 'Arial', 'center', 'middle');
    app.drawRect(4, 5, 4.05, 0.05, color2);
    app.drawRect(4, 4, 0.05, 4.05, color2);
    app.drawRect(1, 4, 4.05, 0.05, color2);
    app.drawRect(5, 1, 0.05, 4.05, color2);
    if (window.innerWidth > window.innerHeight) {
      dialog.style.right = '50%';
    }
    return {
      title: 'Sectores',
      desc: ''
    }
  },
  'pieces/0': _=>{
    app.newPieces();
    app.setCell(3,3,1,2,1,0);
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.right = '40%';
    }
    return {
      title: 'Persona',
      desc: ''
    }
  },
  'pieces/1': _=>{
    app.newPieces();
    app.setCell(3,3,1,2,1,2);
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.right = '40%';
    }
    return {
      title: 'Militar',
      desc: ''
    }
  },
  'pieces/2': _=>{ 
    app.newPieces();
    app.setCell(3,3,1,2,1,1);
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '20%';
      dialog.style.right = '50%';
    }
    return {
      title: 'Estatal',
      desc: '(*) Puede ser hacia <br>la derecha o la izquierda.'
    }
  },
  'pieces/3': _=>{
    app.newPieces();
    app.setCell(1,2,0,0,1,0);
    app.setCell(5,2,0,0,1,2);
    app.setCell(3,0,1,2,2,3);
    app.showPieces();
    return {
      title: 'Ataque',
      desc: 'Luna ataca reemplazando la posición de Sol.'
    }
  },
  'pieces/4': _=>{
    app.newPieces();
    app.setCell(3,3,0,0,2,2);
    app.setCell(0,1,0,0,1,3);
    app.setCell(1,1,0,1,2,0);
    app.setCell(2,1,0,2,1,1);
    app.setCell(5,0,0,0,1,2);
    app.setCell(5,1,0,1,2,3);
    app.setCell(5,2,0,2,1,0);
    app.showPieces();
    return {
      title: 'Derribo',
      desc: 'Mientras se ocupa el centro, solo se permiten derribos a las piezas en medio del rival.'
    }
  },
  'squares/0': _=> {
    app.newPieces();
    for(let x=0;x<7;x++) {
      app.setCell(0,x,0,1,0,0);
      app.setCell(x,0,0,1,0,0);
      app.setCell(6,x,0,1,0,0);
      app.setCell(x,6,0,1,0,0);
    }
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
    }
    return {
      title: 'Frontera',
      desc: ''
    }
  },
  'squares/1': _=> { 
    app.newPieces();
    for(let x=0;x<7;x++){
      app.setCell(3,x,0,1,0,0);
      app.setCell(x,3,0,1,0,0);
      if (x<5) {
        app.setCell(x+1,2,0,1,0,0);
        app.setCell(x+1,4,0,1,0,0);
        app.setCell(2,x+1,0,1,0,0);
        app.setCell(4,x+1,0,1,0,0);
      }
    }
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.right = '40%';
    }
    return {
      title: 'Continente',
      desc: ''
    }
  },
  'squares/2': _=> {
    app.newPieces();
    app.setCell(3,3,0,2,0,0);
    app.showPieces();
    return {
      title: 'Centro',
      desc: ''
    }
  },
  'squares/3': _=> {
    app.newPieces();
    app.factions.forEach((f,i)=> {
      if (f==2) app.setCell(Math.floor(i/7),i%7,0,2,0,0) 
    });
    app.showPieces();
    return {
      title: 'Sierra',
      desc: ''
    }
  },
  'squares/4': _=> {
    app.newPieces();
    app.factions.forEach((f,i)=> {
      if (f==3) app.setCell(Math.floor(i/7),i%7,0,2,0,0) 
    });
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.right = '40%';
    }
    return {
      title: 'Selva',
      desc: ''
    }
  },
  'squares/5': _=> {
    app.newPieces();
    app.factions.forEach((f,i)=> {
      if (f==4) app.setCell(Math.floor(i/7),i%7,0,2,0,0) 
    });
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
    }
    return {
      title: 'Costa',
      desc: ''
    }
  },
  'squares/6': _=> {
    app.newPieces();
    app.factions.forEach((f,i)=> {
      if (f==5) app.setCell(Math.floor(i/7),i%7,0,2,0,0) 
    });
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
    }
    return {
      title: 'Océano',
      desc: ''
    }
  },
  'squares/7': _=> {
    app.newPieces();
    app.factions.forEach((f,i)=> {
      if (f==6) app.setCell(Math.floor(i/7),i%7,0,2,0,0) 
    });
    app.showPieces();
    if (window.innerWidth > window.innerHeight) {
      dialog.style.top = '10%';
    }
    return {
      title: 'Islas',
      desc: ''
    }
  }
};
const display = function display() {
  const hash = location.hash.slice(1);
  const tuto = tutorial[hash];
  app.resize();
  dialog.close();
  dialog.style = {top: '', bottom: '', left: '', right: ''};
  if (tuto) {
    const clone = tpl.content.cloneNode(true);
    const data = tuto();
    clone.querySelector('h2').innerHTML = data.title;
    clone.querySelector('p').innerHTML = data.desc;
    dialog.innerHTML = '';
    dialog.appendChild(clone);
    dialog.show();
  }
  else dialog.showModal();
};
window.toNext = _=>{
  const hash = location.hash.slice(1).split('/');
  const key = hash[0] + '/' + (parseInt(hash[1]) + 1);
  location.hash = '#' + (tutorial.hasOwnProperty(key) ? key : (hash[0] + '/0'));
};
window.toPrev = _=> {
  const hash = location.hash.slice(1).split('/');
  const prev = parseInt(hash[1]) - 1;
  location.hash = '#' + hash[0] + '/' + (prev < 0 ? 0 : prev);
};
window.addEventListener('keydown', event=> {
  if (event.key === 'ArrowLeft') toPrev();
  else if (event.key === 'ArrowRight') toNext();
});
window.addEventListener('hashchange', display);
window.addEventListener('resize', display);
display();
