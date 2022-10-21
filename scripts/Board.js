const POSITION_FREE = 0;
const POSITION_USED = 1;

// interface IPiece = {
//   id: number
//   inGame: bool;
//   color: string;
//   moveSchema: {}
//   move: ()=> void;
// }

const Pieces = {
  knight :{
    id: 2,
    renderMove: (position) => {
      const piece = document.querySelector("#knight");
      piece.style.transform=`translate(${position[0]*2}em,${position[1]*2}em)`
    },
    moveSchema: [[1,-2],[2,-1],[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2]] 
  }
}

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
    ]
  }

  isValidPosition(position){
    if(position[0]>=0 && position[0]<=7 && position[1]>=0 && position[1]<=7){
      return true;
    }
    return false;
  }

  getPosition(position){
    return this.positions[position[0]][position[1]]
  }

  setPosition(position, pieceId){
    this.positions[position[0]][position[1]] = pieceId
  }

  isPositionFree(position){
    return this.getPosition(position) === POSITION_FREE;
  }

  placePiece(position, piece){
    this.pieces.push(piece)
    this.setPosition(position, piece.id);
    piece.renderMove(position)
  }

  clearPosition(){
    this.setPosition(position, POSITION_FREE);
  }

  movePiece(from, to){
    if(this.isPositionFree(from)){
      throw new Error(`There is no piece in position ${from}`);
    }
    const pieceId = this.getPosition(from)
    this.setPosition(to, pieceId)
    
    const piece = this.pieces.find((p)=> p.id === pieceId);
    if(piece){
      piece.renderMove(to)
    }
  }

  getValidMoves(from){

    const pieceId = this.getPosition(from)
    const piece = this.pieces.find((p)=> p.id === pieceId);
    if(!piece){
      throw new Error(`There is no piece in position ${from}`);
    }
    const pieceMoves =  piece.moveSchema.map((schema)=> [ schema[0] + from[0], schema[1] + from[1] ])
    const insideBoardMoves = pieceMoves.filter((position) => this.isValidPosition(position))
    const validMoves = insideBoardMoves.filter((position) => this.isPositionFree(position))

    return validMoves
  }

  showTable(){
    console.table(this.positions)
  }

}

export { Board , Pieces }