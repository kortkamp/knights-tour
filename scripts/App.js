import { Board, Pieces } from "./Board.js";
import { placeMark, removeMark } from "./graphics.js";
import { shuffle } from "./strategies.js"


let delay = 500;

let board;

let initialPosition;

let running = false;

function isRunning(){
  return running;
}

function setSpeed(speed){
  console.log(speed)
  console.log(1000 - speed*10)
  delay = 1000 - speed*10

  const piece = document.querySelector('.piece');
  piece.style.transition = `transform ${delay/1000}s`;
}

const wait = async (delay) =>
  new Promise((resolve, reject) =>
    setTimeout(
      running? resolve : reject,
      delay
    )
  );



function initialize() {
  initialPosition = [0,0]
  board = new Board([]);
  board.placePiece(initialPosition, Pieces.knight);
}


async function tryMove(from, node){
 

  console.log(`>> new node ${node} ${from[0]},${from[1]} running ${isRunning()}`)
  
  const validMoves = board.getValidMoves(from);

  if(validMoves.length === 0) {
    console.log('dead end found!')
    return;
  }

  const preferencialMoves = validMoves;
  shuffle(preferencialMoves);

  console.log(preferencialMoves)
  for(const move of preferencialMoves){
    placeMark(from);
    board.movePiece(from, move);
    initialPosition = move;
    board.setPositionInvalid(from);
    await wait(delay);
    console.log(`  running ${isRunning()}`)

   
    await tryMove(move, node + 1); // create new node
    
    
    board.movePiece(move, from);
    initialPosition = from

    await wait(delay);
    removeMark(from)
  }
}

function start(){
  if(running){
    return;
  }
  let startButton = document.querySelector('#start');
  startButton.disabled = true;
  let stopButton = document.querySelector('#stop');
  stopButton.disabled = false;
  running = true;
  tryMove(initialPosition, 0);
}

function stop(){
  running = false;
  console.log('stop')
  let startButton = document.querySelector('#start');
  startButton.disabled = false;
  let stopButton = document.querySelector('#stop');
  stopButton.disabled = true;
}

function test () {
  board.showTable();
}


function setupControls() {
  let startButton = document.querySelector('#start');
  startButton.addEventListener('click', start);

  let stopButton = document.querySelector('#stop');
  stopButton.addEventListener('click', stop);

  let clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', initialize);

  let testButton = document.querySelector('#test');
  testButton.addEventListener('click', test);
  
  let speedRange = document.querySelector('#speed');
  speedRange.addEventListener('mouseup', function (e) {
    setSpeed(e.target.value)
  });
}


initialize();
setupControls();
console.log('loaded!')