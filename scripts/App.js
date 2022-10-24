import { Board } from './Board.js';
import { clearAllMarks, placeMark, removeMark } from './graphics.js';
import { Strategy } from './Strategy.js';
import { Pieces } from './Pieces.js';


let delay = 500;

let board;

let initialPosition;

let draggedPosition;

let running = false;

let strategy;

//the path's knight
let path = [];

// total number of moves;
let movesNumber = 0;

// total number of dead-ends
let deadEndsNumber = 0;


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

function initialize() {
  initialPosition = [0,0];
  board = new Board([]);
  strategy = new Strategy(board, Pieces.knight);
  board.placePiece(initialPosition, Pieces.knight);
  resetCounter();
  clearAllMarks();

  const path = document.querySelector('.path');
  path.innerHTML = '';

  const checkboxes = document.querySelectorAll('input[type=\'checkbox\']');
  checkboxes.forEach(checkbox=> checkbox.checked = false);
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
  let startButton = document.querySelector('#start');
  startButton.disabled = true;
  let stopButton = document.querySelector('#stop');
  stopButton.disabled = false;
  running = true;
  piece.style.transition = `transform ${delay/1000}s`;
  tryMove(initialPosition, 0);
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

// drawLine([2,2], [0,0]);
// drawLine([2,2], [4,0]);
function test () {

  // const tt = [[3,3], [1,1], [2,2]];
  // const testStrategy = new Strategy();
  // testStrategy.addRule(Rules.random);
  // console.log(testStrategy.applyRules([...tt]));
  console.log(strategy.rules);
}


function setupControls() {
  let startButton = document.querySelector('#start');
  startButton.addEventListener('click', start);

  let stopButton = document.querySelector('#stop');
  stopButton.addEventListener('click', stop);

  let clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', () => {stop() ; initialize(); });

  // let testButton = document.querySelector('#test');
  // testButton.addEventListener('click', test);
  
  let speedRange = document.querySelector('#speed');
  speedRange.addEventListener('mouseup', function (e) {
    setSpeed(e.target.value);
  });

  const randomSelector = document.getElementById('random-selector');
  randomSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.random);
    } else {
      strategy.removeRule(strategy.modelRules.random);
    }
  });

  const innerSelector = document.getElementById('inner-selector');
  innerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.nearCenter);
    } else {
      strategy.removeRule(strategy.modelRules.nearCenter);
    }
  });

  const outerSelector = document.getElementById('outer-selector');
  outerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.nearBorder);
    } else {
      strategy.removeRule(strategy.modelRules.nearBorder);
    }
  });

  const leftSelector = document.getElementById('left-selector');
  leftSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.leftFirst);
    } else {
      strategy.removeRule(strategy.modelRules.leftFirst);
    }
  });

  const rightSelector = document.getElementById('right-selector');
  rightSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.rightFirst);
    } else {
      strategy.removeRule(strategy.modelRules.rightFirst);
    }
  });

  const upperSelector = document.getElementById('upper-selector');
  upperSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.upperFirst);
    } else {
      strategy.removeRule(strategy.modelRules.upperFirst);
    }
  });

  const lowerSelector = document.getElementById('lower-selector');
  lowerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.lowerFirst);
    } else {
      strategy.removeRule(strategy.modelRules.lowerFirst);
    }
  });

  const warnsdorffSelector = document.getElementById('warnsdorff-selector');
  warnsdorffSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      strategy.addRule(strategy.modelRules.warnsdorff);
    } else {
      strategy.removeRule(strategy.modelRules.warnsdorff);
    }
  });
}

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


// drag 
const piece = document.querySelector('#knight');
const container = document.querySelector('.container');
let isMouseDown;
const BODY_PADDING = 8;
const SQUARE_SIZE = 50;
const SQUARE_CENTER = 25;

function onMousedown(event) {
  if(running) return;
  piece.style.transition = 'transform 0s';
  isMouseDown = true;
}
function onMouseover(event) {
  if (!isMouseDown) return;
  piece.style.transform=`translate(${event.x- (BODY_PADDING + SQUARE_SIZE +  SQUARE_CENTER)}px,${event.y  - (BODY_PADDING + SQUARE_SIZE +  SQUARE_CENTER) }px)`;
}
function onMouseup(event) {
  isMouseDown = false;
  const x = Math.floor((event.x - 58)/50);
  const y = Math.floor((event.y - 58)/50);
  board.movePiece(initialPosition, [x,y]);
  
  initialPosition = [x,y];

}
piece.addEventListener('mousedown', onMousedown);
piece.addEventListener('mouseup', onMouseup);
container.addEventListener('mousemove', onMouseover);


initialize();
setupControls();
startSpeedCalculator();
displayStatsUpdates();
console.log('loaded!');