export default class Board {
  constructor(id, global) {
    this.global = global ? {sun:{state:0},moon:{state:0},player:0} : null;
    this.pieces = new Uint8Array(7*7);
    this.colors = null;
    this.chakana = '1001001001010001010101010101010101000101001001001'.split('').map(Number);
    this.factions = '6554556553335553222354321234532223555333556554556'.split('').map(Number);
    this.paths = [
      '0 0,-1 -1,-1 0,-1 1,0 -1,0 1,1 -1,1 0,1 1',
      '0 0,-2 -2,-2 2,-1 -1,-1 1,1 -1,1 1,2 -2,2 2',
      '0 0,-2 0,-1 0,0 -2,0 -1,0 1,0 2,1 0,2 0',
      '0 0,-2 -2,-2 2,-1 -1,-1 1,1 -1,1 1,2 -2,2 2'
    ].map(x=>x.split(',').map(y=>y.split(' ').map(Number)));
    document.getElementById(id).appendChild(this.makeCanvas());
  }
  // BITS
  newPieces() {
    this.pieces = new Uint8Array(7*7);
  }
  delCell(x,y) {
    this.pieces[x*7+y] = 0;
  }
  setCell(x, y, border, square, player, position) {
    this.pieces[x * 7 + y] =
      (border&1) | ((square&3)<<1) | ((player&3)<<3) | ((position&3)<<5);
  }
  getCell(x, y) {
    const byte = this.pieces[x * 7 + y];
    return [byte>>0&1, byte>>1&3, byte>>3&3, byte>>5&3];
  }
  bitsToBase64(bits) {
    let binary = '';
    for (let i = 0; i < bits.length; i++) {
      binary += String.fromCharCode(bits[i]);
    }
    return btoa(binary);
  }
  base64ToBits(base64) {
    const binary = atob(base64);
    const bits = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bits[i] = binary.charCodeAt(i);
    }
    return bits;
  }
  // CANVAS
  makeCanvas() {
    this.makeColors(30,59,53);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.backgroundColor = this.getColor(0);
    if (this.global) {
      this.canvas.addEventListener('click', this.onClick.bind(this));
      this.canvas.addEventListener('dblclick', this.onDblClick.bind(this));
    }
    return this.canvas;
  }
  resize() {
    this.box = Math.min(window.innerWidth, window.innerHeight) * 0.9 / 9;
    this.canvas.width = this.box * 9;
    this.canvas.height = this.box * 9;
    this.showPieces();
    if (this.global) this.showStates();
  }
  // COLORS
  makeColors(h,s,l) {
    this.colors = new Uint8Array(12*2);
    this.setColor(0,h,s,l); // background
    this.setColor(1,h,95,95); // sun
    this.setColor(2,h,5,5); // moon
    this.setColor(3,h,s,l*0.7); // square
    this.setColor(4,(h+180)%360,s,70); // select
    this.setColor(5,h,s,l); // shadow
    this.setColor(6,160,s,l); // 1.cyan
    this.setColor(7,320,s,l); // 2.magenta
    this.setColor(8,120,s,l); // 3.green
    this.setColor(9,50,s,l); // 4.yellow
    this.setColor(10,220,s,l); // 5.blue
    this.setColor(11,0,s,l); // 6.red
  }
  setColor(index, h, s, l) {
    const H = Math.round(h/360*63);
    const S = Math.round(s/100*31);
    const L = Math.round(l/100*31);
    const value = (H<<10)|(S<<5)|L;
    this.colors[index*2] = value>>8;
    this.colors[index*2+1] = value&0xFF;
  }
  getColor(index) {
    const value = (this.colors[index*2]<<8)|this.colors[index*2+1];
    const H = (value>>10&0x3F)/63*360;
    const S = ((value>>5)&0x1F)/31*100;
    const L = (value&0x1F)/31*100;
    return `hsl(${H},${S}%,${L}%)`;
  }
  // CONTEXT
  clearRect(x, y, w, h) {
    this.ctx.clearRect(x * this.box, y * this.box, w * this.box, h * this.box);
  }
  drawRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.box, y * this.box, w * this.box, h * this.box);
  } 
  drawCircle(x,y,r,color) {
    this.ctx.beginPath();
    this.ctx.arc(x*this.box, y*this.box, r*this.box/2, 0, Math.PI*2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  drawPiece(x,y,player,position) {
    const pos = [[0,-0.2],[-0.2,0],[0,0.2],[0.2,0]][position];
    this.ctx.beginPath();
    this.ctx.arc((x+0.525)*this.box, (y+0.525)*this.box, this.box*0.8/2, 0, Math.PI*2);
    this.ctx.arc((x+0.525+pos[0])*this.box, (y+0.525+pos[1])*this.box, this.box*0.8/6, 0, Math.PI*2);
    this.ctx.fillStyle = this.getColor(player + 1);
    this.ctx.fill('evenodd');
  }
  drawText(x, y, size, color, text, family, align, baseLine) {
    this.ctx.font = parseInt(size * this.box) + 'px ' + (family ?? 'monospace');
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align ?? 'left';
    this.ctx.textBaseline = baseLine ?? 'top';
    this.ctx.fillText(text, x * this.box, y * this.box);
  }
  drawBox(x,y,w,h,line,color){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = line*this.box;
    this.ctx.strokeRect(x*this.box,y*this.box,w*this.box,h*this.box);
  }
  // BOARD
  showPiece(x, y, [selected, square, player, position]) {
    if (selected) this.showPath(x,y,position);
    if (square) {
      const color = square == 1 ? this.getColor(4) : 
        this.getColor(this.factions[(x-1)*7+(y-1)] + 5);
      this.drawRect(x+0.04,y+0.04,0.99,0.97,color);
    }
    if (player) this.drawPiece(x,y,player-1,position);
  }
  showStates() {
    this.clearRect(8.05,8.05,0.95,0.95);
    this.clearRect(0.05,0.05,0.95,0.95);
    if (this.global.player == 1)
      this.drawCircle(8.525,8.525,0.8,this.getColor(4));
    else if (this.global.player == 2)
      this.drawCircle(0.525,0.525,0.8,this.getColor(4));
    this.drawPiece(8,8,0,this.global.sun.state);
    this.drawPiece(0,0,1,this.global.moon.state);
  }
  showPieces() {
    const color = this.getColor(3);
    this.clearRect(1,1,7.05,7.05);
    for(let x=0;x<8;x++) {
      this.drawRect(1,x+1,7.05,0.05,color);
      this.drawRect(x+1,1,0.05,7.05,color);
      for(let y=0;y<7;y++) {
        if (this.chakana[x*7+y])
          this.drawRect(x+1.04,y+1.04,0.99,0.97,color);
      }
    }
    for(let x=0;x<7;x++) {
      for(let y=0;y<7;y++) {
        this.showPiece(x+1,y+1, this.getCell(x,y));
      }
    }
  }
  showPath(x,y,position) {
    const color = this.getColor(4);
    const path = this.paths[position];
    for (let i of path) {
      const xi = x+i[0];
      const yi = y+i[1];
      if ((xi>0&&xi<8)&&(yi>0&&yi<8))
        this.drawBox(xi+0.025,yi+0.025,1,1,0.05,color);
    }
  }
  // EVENTS
  getPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.box);
    const y = Math.floor((event.clientY - rect.top) / this.box);
    return [x,y];
  }
  onClick(event) {
    const [x,y] = this.getPosition(event);
    if (x==8&&y==8) {
      this.global.player = 1;
      this.showStates();
    }
    else if (x==0&&y==0) {
      this.global.player = 2;
      this.showStates();
    }
    else if ((x>0 && x<8) && (y>0 && y<8)) {
      if (this.pieces[(x-1)*7+(y-1)])
        this.delCell(x-1,y-1);
      else {
        const player = this.global.player;
        if (player == 1)
          this.setCell(x-1,y-1,1,1,player,this.global.sun.state);
        else if (player == 2)
          this.setCell(x-1,y-1,1,1,player,this.global.moon.state);
      }
      this.showPieces();
    }
  }
  onDblClick(event) {
    const [x,y] = this.getPosition(event);
    if (x==8&&y==8) {
      this.global.sun.state = (this.global.sun.state + 1) % 4;
      this.showStates();
    }
    else if (x==0&&y==0) {
      this.global.moon.state = (this.global.moon.state + 1) % 4;
      this.showStates();
    }
  }
}
