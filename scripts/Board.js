const POSITION_FREE = 0;
const POSITION_INVALID = 1;



class Board {
  
  constructor(pieces){
    this.pieces = pieces; 
    this.positions = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ];
  }

  isValidPosition(position){
    if(position[0]>=0 && position[0]<=7 && position[1]>=0 && position[1]<=7){
      return true;
    }
    return false;
  }

  getPosition(position){
    return this.positions[position[0]][position[1]];
  }

  setPosition(position, pieceId){
    this.positions[position[0]][position[1]] = pieceId;
  }

  isPositionFree(position){
    return this.getPosition(position) === POSITION_FREE;
  }

  placePiece(position, piece){
    this.pieces.push(piece);
    this.setPosition(position, piece.id);
    piece.renderMove(position);
  }

  clearPosition(position){
    this.setPosition(position, POSITION_FREE);
  }

  setPositionInvalid(position){
    this.setPosition(position, POSITION_INVALID);
  }

  movePiece(from, to){
    // console.log(`Board: ${from[0]},${from[1]} to: ${to[0]},${to[1]}`);
    
    if(this.isPositionFree(from)){
      throw new Error(`There is no piece in position ${from}`);
    }
    const pieceId = this.getPosition(from);
    this.setPosition(to, pieceId);

    this.clearPosition(from);
    
    const piece = this.pieces.find((p)=> p.id === pieceId);
    if(piece){
      piece.renderMove(to);
    }
  }

  getPieceMovesFrom(from, piece){
    const pieceMoves =  piece.moveSchema.map((schema)=> [ schema[0] + from[0], schema[1] + from[1] ]);
    const insideBoardMoves = pieceMoves.filter((position) => this.isValidPosition(position));
    return insideBoardMoves;
  }

  getValidPieceMoves(from, piece){
    const pieceMoves = this.getPieceMovesFrom(from, piece);
    const freeMoves = pieceMoves.filter((position) => this.isPositionFree(position));
    return freeMoves;
  }

  getValidMovesFrom(from){
    const pieceId = this.getPosition(from);
    const piece = this.pieces.find((p)=> p.id === pieceId);
    if(!piece){
      throw new Error(`There is no piece in position ${from}`);
    }
    return this.getValidPieceMoves(from, piece);
  }

  getWarnsdorffMoves(from, piece){
    const moves = this.getValidPieceMoves(from, piece);
  
    const warnsdorffMoves = moves.sort((a,b)=> {
      const aMoves = this.getValidPieceMoves(a, piece).length;
      const bMoves = this.getValidPieceMoves(b, piece).length;
      return aMoves - bMoves;
    });
    return warnsdorffMoves;
  }

  showTable(){
    console.table(this.positions);
  }

  isBoardFull(){
    for(const row of this.positions){
      for(const cell of row){
        if(cell === POSITION_FREE)
        {
          return false;
        }
      }
    }
    return true;
  }

}

export { Board  };