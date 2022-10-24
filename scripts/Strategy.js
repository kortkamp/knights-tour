const centerDistance = [
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 3, 3, 3, 3, 3, 3, 4],
  [4, 3, 2, 2, 2, 2, 3, 4],
  [4, 3, 2, 1, 1, 2, 3, 4],
  [4, 3, 2, 1, 1, 2, 3, 4],
  [4, 3, 2, 2, 2, 2, 3, 4],
  [4, 3, 3, 3, 3, 3, 3, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
];

function getDistanceFromCenter(position) {
  return centerDistance[position[0]][position[1]];
}



export const Rules = {
  nearBorder : {
    id: 1,
    name: 'border',
    action: (a,b)=> getDistanceFromCenter(b)-getDistanceFromCenter(a),
  },
  nearCenter : {
    id: 2,
    name: 'center',
    action: (a,b)=> getDistanceFromCenter(a)-getDistanceFromCenter(b),
  },
  upperFirst : {
    id: 3,
    name: 'top',
    action: (a,b)=> a[1]-b[1],
  },
  lowerFirst : {
    id: 4,
    name: 'bottom',
    action: (a,b)=> b[1]-a[1],
  },
  leftFirst : {
    id: 5,
    name: 'left',
    action:  (a,b)=> a[0]-b[0],
  },
  rightFirst : {
    id: 6,
    name: 'right',
    action: (a,b)=> b[0]-a[0],
  },
  random: {
    id: 7,
    name: 'random',
    action: ()=> Math.random() - 0.5,
  }
};


export class Strategy {
  rules = [];

  constructor(){

  }

  randomShuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  
  addRule(rule){
    this.rules.push(rule);
  }

  removeRule(rule){
    this.rules = this.rules.filter(r=> r.id !== rule.id); 
  }

  applyRules(positions){
    const WEIGHT_MODIFICATION = 10;
   
    return positions.sort((a,b)=> {
      const result = this.rules.reduce((total, rule, index)=>{
        const weight = this.rules.length - index;
        // console.log(total, rule , rule.action(a,b) );
        return total += rule.action(a,b) * weight * WEIGHT_MODIFICATION;
      },0);
      // console.log('result', result);
      return result;
    }
    );
  }

}




