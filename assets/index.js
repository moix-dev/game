export default class {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.color = [
      'hsl(30,59%,53%)','hsl(30,50%,70%)','hsl(30,59%,35%)', // Board
      'hsl(210,59%,53%)', // selected
      'hsl(0,100%,100%)', 'hsl(0,0%,0%)', // sun & moon
    ];
    // Mouse
    this.canvas.addEventListener('mousedown', this.startDrag.bind(this));
    this.canvas.addEventListener('mousemove', this.moveDrag.bind(this));
    this.canvas.addEventListener('mouseup', this.endDrag.bind(this));
    this.canvas.addEventListener('mouseleave', this.endDrag.bind(this));
    // Touch
    this.canvas.addEventListener('touchstart', this.startDrag.bind(this));
    this.canvas.addEventListener('touchmove', this.moveDrag.bind(this));
    this.canvas.addEventListener('touchend', this.endDrag.bind(this));
    this.canvas.addEventListener('touchcancel', this.endDrag.bind(this));
    // Init
    this.global = {};
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }
  resize() {
    this.box = Math.min(window.innerWidth,window.innerHeight) / 9;
    const size = this.box * 9;
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.parentNode.style.position = 'absolute';
    this.canvas.parentNode.style.top = ((window.innerHeight - size)*0.5) + 'px';
    this.canvas.parentNode.style.left = ((window.innerWidth - size)*0.5) + 'px';
    this.drawBoard();
  }
  drawRect(x,y,w,h,color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.box * x, this.box * y, this.box * w, this.box * h);
  }
  drawRectStroke(x,y,w,h,line,color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = this.box * line;
    this.ctx.strokeRect(this.box * x,this.box * y,this.box * w,this.box * h); 
  }
  drawText(x,y,size,color,text) {
    this.ctx.fillStyle = color;
    this.ctx.font = (this.box * size) + 'px monospace';
    this.ctx.fillText(text,this.box * x,this.box * y);
  }
  drawCircle(x,y,r,color) {
    this.ctx.beginPath();
    this.ctx.fillStyle=color;
    this.ctx.arc(this.box*x,this.box*y,this.box*0.5*r,0,Math.PI*2);
    this.ctx.fill();
  }
  drawPiece(x,y,t,color) {
    const typ = [[0.5,0.3],[0.3,0.5],[0.5,0.7],[0.7,0.5]][t];
    this.ctx.beginPath();
    this.ctx.fillStyle=color;
    this.ctx.arc(this.box*(x+0.5),this.box*(y+0.5),this.box*0.5*0.8,0,Math.PI*2);
    this.ctx.arc(this.box*(x+typ[0]),this.box*(y+typ[1]),this.box*0.5*0.25,0,Math.PI*2);
    this.ctx.fill('evenodd');
  }
  drawNotation(notation) {
    notation
      .split('/')
      .forEach((row,i)=>{
        let y = 0;
        row.split('').forEach(data=>{
          if(data=='o') {
            this.drawRect(1+y,1+i,0.98,0.98,this.color[2]);
            y += 1;
          }
          else {
            const j = parseInt(data);
            for (let x=0;x<j;x++) {
              this.drawRect(1+y+x,1+i,0.98,0.98,this.color[1]);
            }
            y += j;
          }
        });
      });
  }
  drawMarks() {
    const marks = this.global.player==1 ? 'ABCDEFG' : 'abcdefg';
    marks.split('').forEach((data,i)=>{
      this.drawText(7.05-i,8-0.1,0.2, this.color[0],data);
      this.drawText(8-0.2,7.2-i,0.2, this.color[0],i.toString());
    });
  }
  drawBoard() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.drawRect(0,0,9,9,this.color[0]);
    this.drawNotation('o2o2o/2o1o2/1o1o1o1/o1o1o1o/1o1o1o1/2o1o2/o2o2o');
    this.drawMarks();
    // Players
    this.drawPiece(0,0,this.global.moon??0,this.color[5]);
    this.drawPiece(8,8,this.global.sun??0,this.color[4]);
    if (this.global.player==1) {
      this.drawRectStroke(0,0,0.98,0.98,0.05,this.color[3]);
    }
    else if (this.global.player==0){
      this.drawRectStroke(8,8,0.98,0.98,0.05,this.color[3]);
    }
    const color = this.color[2];
    // Timer
    this.drawText(6.25,0.75,0.5,color,this.getTimer(1));
    this.drawText(1.25,8.75,0.5,color,this.getTimer(0));
    // Kills
    this.drawText(0.35,1.75,0.5,color,
      (this.global.moonKills??0).toString());
    this.drawText(8.35,7.75,0.5,color,
      (this.global.sunKills??0).toString());
    // Pieces
    this.drawText(1.2,0.75,0.5,color,
      (this.global.moonPieces??0).toString().padStart(2,'0'));
    this.drawText(7.2,8.75,0.5,color,
      (this.global.sunPieces??0).toString().padStart(2,'0'));
    // selected
    const selected = this.global.selected;
    if (selected) {
      this.drawRectStroke(selected.x,selected.y,selected.w,selected.h,0.05,this.color[3]);
    }
  }
  drawArrow(X1,Y1,X2,Y2,line,head,color) {
    const box = this.box,
      x1=box*(X1+0.5), y1=box*(Y1+0.5),
      x2=box*(X2+0.5), y2=box*(Y2+0.5),
      angle = Math.atan2(y2 - y1, x2 - x1),
      headLength = box * head;
    this.ctx.lineWidth = box * line;
    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(
      x2-headLength*Math.cos(angle)*0.5,
      y2-headLength*Math.sin(angle)*0.5
    );
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6),
      y2 - headLength * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6),
      y2 - headLength * Math.sin(angle + Math.PI / 6));
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
  getTimer(player) {
    const timer = player == 1 ? this.global.moonTimer : this.global.sunTimer;
    if (!timer) return '00:00';
  }
  getPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.box);
    const y = Math.floor((event.clientY - rect.top) / this.box);
    return [x,y];
  }
  startDrag(event) {
    const [x,y] = this.getPosition(event);
    // Player
    const player = this.global.player;
    if (x==8&&y==8&&player==0) {
      this.global.sun = ((this.global.sun??0)+1) % 4;
    }
    else if (x==0&&y==0&&player==1) {
      this.global.moon = ((this.global.moon??0)+1) % 4;
    } 
    // Selected
    let w = 0.98, h = 0.98;
    switch (true) {
      case (x==8&&y==8)||(x==0&&y==0)||
        (x==0&&y==1)||(x==1&&y==0)||(x==7&&y==8)||(x==8&&y==7):
        this.global.selected = {x,y,w,h};
        break;
      case (x>0&&x<8)&&(y>0&&y<8):
        this.global.selected = {x,y,w,h};
        break;
      case (x==6||x==7)&&y==0:
        this.global.selected = {x:6,y:0,w:w+1,h};
        break;
      case (x==1||x==2)&&y==8:
        this.global.selected = {x:1,y:8,w:w+1,h};
        break;
      default:
        this.global.selected = false;
    }
    // Global
    this.dragging = true;
    this.global.x = x;
    this.global.y = y;
    this.drawBoard();
  }
  moveDrag(event) {
    if (!this.dragging) return;
    const [x,y] = this.getPosition(event);
    this.drawBoard();
    this.drawArrow(this.global.x,this.global.y,x,y,0.5,1,this.color[3]);
  }
  endDrag(event) {
    this.dragging = false;
    this.drawBoard();
  }
}
