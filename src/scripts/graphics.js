
const piece = document.querySelector('.piece');


export function movePiece(posX, posY){
  piece.style.transform=`translate(${posX*2}em,${posY*2}em)`;
}

export function placeMark(position){
  const columns = ['a','b','c','d','e','f','g','h',];
  const cellId = `#${columns[position[0]]}${8 - position[1]}`;
  const cell = document.querySelector(cellId);
  cell.classList.add('marked');
}

export function removeMark(position){
  const columns = ['a','b','c','d','e','f','g','h',];
  const cellId = `#${columns[position[0]]}${8 - position[1]}`;
  const cell = document.querySelector(cellId);
  cell.classList.remove('marked');
}

export function clearAllMarks(){
  const cells = document.querySelectorAll('td');
  cells.forEach(cell=> cell.classList?.remove('marked'));
}