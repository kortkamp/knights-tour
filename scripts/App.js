import { Board, Pieces } from "./Board.js";
import { placeMark, removeMark } from "./graphics.js";




const board = new Board([]);

let delay = 500;

function setSpeed(speed){
  console.log(speed)
  console.log(1000 - speed*10)
  
  delay = 1000 - speed*10
}

let pos = [0,0]

board.placePiece(pos, Pieces.knight)




export function tryMove(){

  const deadEnds = []
  
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

  console.log(delay)

  if(delay){
    setTimeout(tryMove, delay);
  }

}

let btn = document.querySelector('#test');
btn.addEventListener('click', function () {
  tryMove();
});

let speedRange = document.querySelector('#speed');
speedRange.addEventListener('mouseup', function (e) {
  setSpeed(e.target.value)
});

console.log('Game Loaded')