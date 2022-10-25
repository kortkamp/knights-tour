// drag 
const piece = document.querySelector('#knight');

let isMouseDown = false;
// const BODY_PADDING = 8;
const SQUARE_SIZE = 50;
const SQUARE_CENTER = 25;
let isInputActive = true;

let movePiece;

function onMousedown(event) {
  console.log(event);
  if(!isInputActive) return;
  piece.style.transition = 'transform 0s';

  console.log(piece);
  isMouseDown = true;
  console.log(event.target);
}
function onMouseover(event) {
  // console.log(event);

  if (!isMouseDown) return;
  const xPos = event.pageX - event.currentTarget.offsetLeft - ( SQUARE_SIZE +  SQUARE_CENTER);
  const yPos = event.pageY - event.currentTarget.offsetTop  - ( SQUARE_SIZE +  SQUARE_CENTER); 

  piece.style.transform=`translate(${xPos}px,${yPos}px)`;
}
function onMouseup(event) {
  // if (!isMouseDown) return;
  if(!isInputActive) return;

  isMouseDown = false;
  const xPos = event.pageX - event.currentTarget.offsetLeft - ( SQUARE_SIZE );
  const yPos = event.pageY - event.currentTarget.offsetTop  - ( SQUARE_SIZE  ); 

  let tableX = (xPos)/50;
  let tableY = (yPos)/50;
  if(tableX < 0) tableX = 0;
  if(tableX > 7) tableX = 7;

  if(tableY < 0) tableY = 0;
  if(tableY > 7) tableY = 7;
 
  const x = Math.floor(tableX);
  const y = Math.floor(tableY);

  movePiece([x,y]);
  // board.movePiece(initialPosition, [x,y]);
  
  // initialPosition = [x,y];

}



export function setInputActive(value) {
  isInputActive = value;
}


export function initialize(_movePiece){

  const container = document.querySelector('.table-container');
  movePiece = _movePiece;
  piece.addEventListener('mousedown', onMousedown);
  container.addEventListener('mouseup', onMouseup);
  container.addEventListener('mousemove', onMouseover);

}



