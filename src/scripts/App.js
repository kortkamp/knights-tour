import { Board } from './Board.js';
import { clearAllMarks, placeMark, removeMark, displaySolutionFound, showSolution } from './graphics.js';
import { Strategy } from './Strategy.js';
import { Pieces } from './Pieces.js';
import { setupControls } from './controls.js';
import * as input from './Input.js';


let delay = 500;

let board;

let initialPosition;

let running = false;

let strategy;

//the path's knight
let path = [];

// total number of moves;
let movesNumber = 0;

// total number of dead-ends
let deadEndsNumber = 0;

let piece = document.querySelector('#knight');

function isGameRunning(){
  return running;
}

function setSpeed(speed){
  delay = 1000 - speed*10;

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

// const movesIndicator = document.querySelector('#moves-number');
function increaseMoveNumber(){
  movesNumber++;
  // movesIndicator.innerText = movesNumber;
}

// const deadEndsIndicator = document.querySelector('#dead-ends-number');
function increaseDeadEndsNumber(){
  deadEndsNumber++;
  // deadEndsIndicator.innerText = deadEndsNumber;
}

function resetCounter(){
  movesNumber = 0;
  deadEndsNumber = 0;
}

function initializeApp() {
  initialPosition = [0,0];
  board = new Board([]);
  strategy = new Strategy(board, Pieces.knight);
  board.placePiece(initialPosition, Pieces.knight);
  resetCounter();
  clearAllMarks();
  input.setInputActive(true);


  const path = document.querySelector('.path');
  path.innerHTML = '';

  const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');
  checkboxes.forEach(checkbox=> checkbox.checked = false);

  displaySolutionFound(false);
}

function drawLine(from, to){
  const path = document.querySelector('.path');
  const newLine = document.createElement('polyline');
  newLine.setAttribute('points', `${50*from[0]},${50*from[1]} ${50*to[0]},${50*to[1]}`);
  const id = `${from[0]}.${from[1]}.${to[0]}.${to[1]}`;
  newLine.setAttribute('id', id);
  path.appendChild(newLine);
  // have somo bug that do not show path until we use path.innerHTML += '';
  path.innerHTML += '';
  return id;
}


async function tryMove(from, node){
  const validMoves = board.getValidMovesFrom(from);
  // const validMoves = board.getWarnsdorffMoves(from, Pieces.knight);
  if(validMoves.length === 0) {
    increaseDeadEndsNumber();
    return;
  }
  // Apply strategies
  strategy.randomShuffle(validMoves);
  const preferencialMoves = strategy.applyRules(validMoves);
  // shuffle(preferencialMoves);
  let lineId;

  for(const move of preferencialMoves){
    placeMark(from);
    board.movePiece(from, move);
    increaseMoveNumber();
    path.push(move);
    initialPosition = move;
    board.setPositionInvalid(from);
    
    lineId = drawLine(from, move);
    await wait(delay);

    await tryMove(move, node + 1); // create new node
    if(board.isBoardFull()){
      console.log('=============== Solution Found =================');
      displaySolutionFound(true);

      console.log(path);
      return;
    }
    
    board.movePiece(move, from);
    const el = document.getElementById(lineId);
    // console.log(el);
    el.remove();
    path.pop();
    increaseMoveNumber();
    initialPosition = from;

    await wait(delay);
    removeMark(from);
  }
}

function start(){
  if(running){
    return;
  }
  path = [initialPosition];
  let startButton = document.querySelector('#start');
  startButton.disabled = true;
  let stopButton = document.querySelector('#stop');
  stopButton.disabled = false;
  running = true;
  piece.style.transition = `transform ${delay/1000}s`;
  tryMove(initialPosition, 0);
  input.setInputActive(false);
}

function stop(){
  running = false;
  let startButton = document.querySelector('#start');
  startButton.disabled = false;
  let stopButton = document.querySelector('#stop');
  stopButton.disabled = true;
  lastSpeed = 0;
  speed = 0;
}



// TODO split to another file
let lastMovesNumber = movesNumber;
let lastSpeed = 0;
let speed = 0;
function startSpeedCalculator(){
  const UPDATE_INTERVAL = 1000;
  
  setInterval((()=> {
    const currentSpeed = (1000/UPDATE_INTERVAL)*(movesNumber - lastMovesNumber);
    const meanSpeed = (currentSpeed + lastSpeed )/2;
    lastSpeed = speed;
    speed = meanSpeed;
    lastMovesNumber = movesNumber;
  }),UPDATE_INTERVAL);
}


function displayStatsUpdates(){
  const UPDATE_INTERVAL = 100;
  const speedIndicator = document.getElementById('speed-indicator');
  const movesIndicator = document.querySelector('#moves-number');
  const deadEndsIndicator = document.querySelector('#dead-ends-number');
  const selectedStrategiesIndicator = document.querySelector('.strategy-indicator');
  setInterval((()=> {
    movesIndicator.innerText = movesNumber;
    deadEndsIndicator.innerText = deadEndsNumber;

    if(delay > 10){
      speedIndicator.innerText = (1000/delay).toFixed(2); 
    }else {

      speedIndicator.innerText = speed.toFixed(2);   
    }

    let ruleList = '';
    strategy.rules.forEach((rule, index)=> {
      ruleList += `${index + 1} - ` + rule.name + '\n';
    });
    if(selectedStrategiesIndicator.innerText !== ruleList){
      selectedStrategiesIndicator.innerText = ruleList;

    }
    
  }),UPDATE_INTERVAL);
}

function movePiece(newPosition){
  board.movePiece(initialPosition, newPosition);
  initialPosition = newPosition;
}

function getStrategy(){
  return strategy;
}


initializeApp();
setupControls(start, stop, initializeApp, setSpeed, getStrategy, () => showSolution(path));
startSpeedCalculator();
displayStatsUpdates();
input.initialize(movePiece);
console.log('loaded!');