
const piece = document.querySelector(".piece");


function movePiece(posX, posY){
  piece.style.transform=`translate(${posX*2}em,${posY*2}em)`;
}

function placeMark(position){
  const columns = ['a','b','c','d','e','f','g','h',]
  const cellId = `#${position[0]}${columns[position[1]]}`
  const cell = document.querySelector(cellId);
  console.log(cell)
}