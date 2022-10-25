import { wait } from './utils.js';

const piece = document.querySelector('.piece');


export function movePiece(posX, posY){
  piece.style.transform=`translate(${posX*2}em,${posY*2}em)`;
}


function getChessCoordinates(position){
  const columns = ['a','b','c','d','e','f','g','h',];
  return `${columns[position[0]]}${8 - position[1]}`;

}

function getCellByPosition(position){
  
  const cellId = '#' + getChessCoordinates(position);
  return document.querySelector(cellId);
}

export function placeMark(position){
  const cell = getCellByPosition(position);
  cell.classList.add('marked');
}

export function removeMark(position){
  
  const cell = getCellByPosition(position);
  cell.classList.remove('marked');
}

export function clearAllMarks(){
  const cells = document.querySelectorAll('td');
  cells.forEach(cell=> cell.classList?.remove('marked'));
}

async function toggleCoordinates(show){ 
  const coordinates = document.querySelectorAll('th');
  if(show){
    for(const cell of coordinates){
      cell.classList.remove('cell-hide');
      await wait(150);
    }
  }else{
    for(const cell of coordinates){
      cell.classList.add('cell-hide');
      await wait(150);
    }
  }
}

function toggleButtons(show){
  let startButton = document.querySelector('#start');
  let stopButton = document.querySelector('#stop');
  let showSolutionButton = document.querySelector('#show-solution');

  if(show){
    startButton.classList.remove('hide');
    stopButton.classList.remove('hide');
    showSolutionButton.classList.add('hide');
  }else {
    startButton.classList.add('hide');
    stopButton.classList.add('hide');
    showSolutionButton.classList.remove('hide');
  }
}

async function toggleCells(show){
  
  clearAllMarks();
  const RATE = 4;
  if(show){

    for(let row = 0; row <=7 ; row++){
      for(let column = 0; column <=7 ; column++){
        let cell = getCellByPosition([row, column]);
        cell.style.transform='';     
        cell.style.opacity = '1';
        cell.classList.remove('cell-hide');
      }
    }
  }else{
    for(let row = 0; row <=7 ; row++){
      for(let column = 0; column <=7 ; column++){
        let cell = getCellByPosition([row, column]);
        cell.style.transform=`translate(${row*RATE - 4 * RATE}em,${column*RATE - 4 * RATE}em) scale(${RATE/2}) `;
        cell.style.opacity = '0';
        cell.classList.add('cell-hide');

      }
    }
  }
}

export async function showSolution(path){
  
  const lines = document.querySelectorAll('polyline');

  const solutionList = document.querySelector('.solution-list');

  toggleCoordinates(false);

  for(let row = 0; row <=7 ; row++){
    for(let column = 0; column <=7 ; column++){
      let cell = getCellByPosition([row, column]);
      cell.style.transform='';     
      cell.classList.remove('cell-hide');
    }
  }
 
  for(const line of lines){
    const coordinate = getChessCoordinates(path.shift());
    line.classList.add('line-hide');
    await wait(50);
    solutionList.innerHTML += `<span id="${coordinate}">${coordinate}</span>`;
  }
  
  await wait(150);
  solutionList.innerHTML += `<span>${getChessCoordinates(path.shift())}</span>`;
}


export function displaySolutionFound(found){
  const solution = document.querySelector('.solution');
  if(found){
    solution.classList.add('solution-found');
    toggleCells(false);
    // toggleCoordinates(false);
    toggleButtons(false);
  }else{
    solution.classList.remove('solution-found');
    toggleCells(true);
    toggleCoordinates(true);
    toggleButtons(true);

    const solutionList = document.querySelector('.solution-list');
    solutionList.innerHTML = '';
  }
}

