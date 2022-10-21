import { Board, Pieces } from "./Board.js";
import { placeMark, removeMark } from "./graphics.js";




const board = new Board([]);

let pos = [0,0]

board.placePiece(pos, Pieces.knight)




export function tryMove(){
  
  const validMoves = board.getValidMoves(pos);

  if(validMoves.length === 0) {
    console.log('No valid moves!')
    return;
  }

  const preferencialMoves = validMoves;
  const randomMoveIndex = Math.floor(Math.random() * preferencialMoves.length)
  const newMove = preferencialMoves[randomMoveIndex];
  placeMark(pos)
  board.movePiece(pos, newMove);
  pos = newMove;
}

let btn = document.querySelector('#test');
btn.addEventListener('click', function () {
  tryMove();
});

console.log('Game Loaded')