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
      const piece = document.querySelector('#knight');
      piece.style.transform=`translate(${position[0]*2}em,${position[1]*2}em)`;
    },
    moveSchema: [[1,-2],[2,-1],[2,1],[1,2],[-1,2],[-2,1],[-2,-1],[-1,-2]] 
  }
};

export { Pieces };