his.color = {
      board: 'hsl(30, 59%, 53%)',
      square: 'hsl(30, 59%, 38%)',
      shadow: 'hsl(30, 59%, 68%)',
      selected: 'hsl(210, 59%, 53%)',
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
      [3,21,27,45], [1,2,4,5,7,8,12,13,14,20,28,34,35,36,40,41,43,44,46,47], [0,6,42,48]
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
 
  // Context
    drawTools() { 
    this.showState();
    this.drawText(5.5, 0.15, 0.8, this.color.square, '00:00');
    this.drawText(0.25, 1.15, 0.8, this.color.square, '0');
    this.drawText(1, 0.15, 0.8, this.color.square, '00');
    
    
    this.drawText(1, 8.15, 0.8, this.color.square, '00:00');
    this.drawText(8.25, 7.25, 0.8, this.color.square, '0');
    this.drawText(7, 8.15, 0.8, this.color.square, '00');
  }
  // Show
  showBoard(board) {
    this.clearRect(0.975, 0.975, 7.06, 7.06);
    this.drawBoard();
    //const mode = this.getBitMode(board); // 0.yupana, 1.andes;
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

