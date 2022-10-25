export function setupControls(start, stop, initialize, setSpeed, getStrategy, showSolution) {

  let startButton = document.querySelector('#start');
  startButton.addEventListener('click', start);

  let stopButton = document.querySelector('#stop');
  stopButton.addEventListener('click', stop);

  let clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', () => {stop() ; initialize(); });


  const showSolutionButton = document.querySelector('#show-solution');
  showSolutionButton.addEventListener('click', showSolution);

  // let testButton = document.querySelector('#test');
  // testButton.addEventListener('click', test);
  
  let speedRange = document.querySelector('#speed');
  speedRange.addEventListener('mouseup', function (e) {
    setSpeed(e.target.value);
  });
  speedRange.addEventListener('touchend', function (e) {
    setSpeed(e.target.value);
  });

  const randomSelector = document.getElementById('random-selector');
  randomSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.random);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.random);
    }
  });

  const innerSelector = document.getElementById('inner-selector');
  innerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.nearCenter);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.nearCenter);
    }
  });

  const outerSelector = document.getElementById('outer-selector');
  outerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.nearBorder);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.nearBorder);
    }
  });

  const leftSelector = document.getElementById('left-selector');
  leftSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.leftFirst);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.leftFirst);
    }
  });

  const rightSelector = document.getElementById('right-selector');
  rightSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.rightFirst);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.rightFirst);
    }
  });

  const upperSelector = document.getElementById('upper-selector');
  upperSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.upperFirst);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.upperFirst);
    }
  });

  const lowerSelector = document.getElementById('lower-selector');
  lowerSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.lowerFirst);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.lowerFirst);
    }
  });

  const warnsdorffSelector = document.getElementById('warnsdorff-selector');
  warnsdorffSelector.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      getStrategy().addRule(getStrategy().modelRules.warnsdorff);
    } else {
      getStrategy().removeRule(getStrategy().modelRules.warnsdorff);
    }
  });
}