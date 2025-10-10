export default class Board {
  constructor(id) {
    this.board = new Uint8Array(Math.ceil(7*7*7+1 / 8));
    this.view = document.getElementById(id);
    this.color = {
      board: 'hsl(30, 59%, 53%)',
      square: 'hsl(30, 59%, 38%)',
      shadow: 'hsl(30, 59%, 68%)',
      sun: 'hsl(30, 30%, 96%)',
      moon: 'hsl(30, 20%, 10%)',
      faction: [
        'hsl(30, 59%, 68%)',
        'hsl(190, 59%, 50%)', // 1.cyan
        'hsl(320, 59%, 53%)', // 2.magenta
        'hsl(110, 59%, 40%)', // 3.green
        'hsl(55, 59%, 53%)', // 4.yellow
        'hsl(220, 59%, 40%)', // 5.blue
        'hsl(0, 59%, 53%)' // 6.red
      ]
    };
    this.factions = [
      [24], [16,17,18,23,25,30,31,32], [9,10,11,15,19,22,26,29,33,37,38,39],
      [3,21,27,45], [1,2,4,5,7,8,12,13,14,20,28,34,35,36,40,41,43,44,46,47],
      [0,6,42,48]
    ];
  }
  // Game
  getFaction(x, y) {
    const pos = x * 7 + y;
    switch (true) {
      case this.factions[0].includes(pos): return 1; break;
      case this.factions[1].includes(pos): return 2; break;
      case this.factions[2].includes(pos): return 3; break;
      case this.factions[3].includes(pos): return 4; break;
      case this.factions[4].includes(pos): return 5; break;
      case this.factions[5].includes(pos): return 6; break;
      default: return 0;
    }
  }
  // Bits Board
  get(){
    return this.board; 
  }
  set(board){ 
    this.board = board;
    this.showBoard(this.board);
  }
  setBitMode(bits, state){
    bits[0] = state;
  }
  getBitMode(bits, index) {
    return bits[0];
  }
  setBitPiece(bits, player, person, x, y, shadow, faction) {
    const pos = 1 + (x * 7 + y) * 7;
    if (person > -1) bits[pos + person] = 1;
    if (person > -1) bits[pos + 4] = player;
    bits[pos + 5] = shadow || 0;
    bits[pos + 6] = faction || 0;
  }
  bitsToBase64(bits) {
    let binary = '';
    for (let i = 0; i < bits.length; i++) {
      binary += String.fromCharCode(bits[i]);
    }
    return btoa(binary); // convierte a base64
  }
  base64ToBits(base64) {
    const binary = atob(base64);
    const bits = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bits[i] = binary.charCodeAt(i);
    }
    return bits;
  }
  // Canvas
  makeCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.view.appendChild(this.canvas);
    this.resizeCanvas();
  }
  resizeCanvas() {
    this.box = Math.min(window.innerWidth, window.innerHeight) * 0.9 / 9;
    this.canvas.width = this.box * 9;
    this.canvas.height = this.box * 9;
    this.canvas.style.backgroundColor = this.color.board;
    this.canvas.style.borderRadius = (this.box * 0.05) + 'px';
    this.drawBoard();
  }
  // Context
  clearBoard() {console.log('clear')
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawBoard() {
    this.ctx.fillStyle = this.color.square;
    for (let i = 1; i<9; i++) {
      this.ctx.fillRect(0.975 * this.box, (i - 0.025) * this.box, 7.05 * this.box, 0.05 * this.box);
      this.ctx.fillRect((i - 0.025) * this.box, 0.975 * this.box, 0.05 * this.box, 7.05 * this.box);
    }
    const chakana = [
      [1,1], [1,4], [1,7], [2,3], [2,5], [3,2], [3, 4], [3,6],
      [4,1], [4,3], [4,5], [4,7], 
      [5,2], [5,4], [5,6], [6,3], [6,5], [7,1], [7,4], [7,7]
    ];
    chakana.forEach(x =>this.drawSquare(x[0], x[1], 1, 1, this.color.square));
    this.drawCircle(0.5, 0.5, 0.4, this.color.square);
    this.drawCircle(8.5, 8.5, 0.4, this.color.square);
  }
  drawSquare(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.box, y * this.box, w * this.box, h * this.box);
  }
  drawCircle(x, y, r, color) {
    this.ctx.beginPath();
    this.ctx.arc(x * this.box, y * this.box, r * this.box / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  drawPiece(player, person, x, y) {
    const position = [
      [0.5, 0.3], [0.3, 0.5], [0.5, 0.7], [0.7, 0.5]
    ][person] || [0.5, 0.3];
    this.ctx.beginPath();
    this.ctx.arc(
      (x + 1.5) * this.box, (y + 1.5) * this.box, 
      this.box * 0.8 / 2, 0, Math.PI * 2
    );
    this.ctx.arc(
      (x + position[0] + 1) * this.box, (y + position[1] + 1) * this.box, 
      this.box * 0.8 / 6, 0, Math.PI * 2
    );
    this.ctx.fillStyle = player ? this.color.moon : this.color.sun;
    this.ctx.fill('evenodd');
  }
  drawText(x, y, size, color, text, family, align, baseLine) {
    this.ctx.font = parseInt(size * this.box) + 'px ' + (family ?? 'monospace');
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align ?? 'left';
    this.ctx.textBaseline = baseLine ?? 'top';
    this.ctx.fillText(text, x * this.box, y * this.box);
  }
  // Show
  showBoard(board) {
    const mode = this.getBitMode(board); // 0.yupana, 1.andes;
    for(let x = 0; x<7; x++) {
      for (let y = 0; y<7; y++) {
        const pos = 1 + (x * 7 + y) * 7;
        const person = board.slice(pos, pos + 4).indexOf(1);
        const player = board[pos + 4];
        const shadow = board[pos + 5];
        const faction = board[pos + 6];
        if (shadow) this.drawSquare(x + 1.015, y + 1.015, 0.975, 0.975, this.color.shadow);
        else if (faction) {
            const index = this.getFaction(x, y);
            this.drawSquare(x + 1.015, y + 1.015, 0.975, 0.975, this.color.faction[index]);
        }
        if (person > -1) this.drawPiece(player, person, x, y);
      }
    }
  }
  showStep(step) {
    if (!step || step.length < 5) return;
    const player = step[0] == '-' ? 1 : 0;
    const person = parseInt(step[1]);
    const marks = step[0] == '-' ? 'ABCDEFG' : 'GFEDCBA';
    const x = marks.indexOf(step[3]);
    const y = step[0] == '-' ? parseInt(step[4]) : 6 - parseInt(step[4]);
    this.drawPiece(player, person, x, y);
  }
}

/*
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
*/
