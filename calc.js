// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed
var numsArr = [];

// this will hold the
var inputArr = [];

function updateDisplay(item) {
  console.log(item);



  var readout = document.getElementById('calc-screen');

  // if parameter is a number character, add to numsArr
  if (/\w/g.test(item)) {
    numsArr.push(item);
  }


  // if function receives 'clear' string from
  // clear button click, clear the numsArr
  if (item === 'clear') {
    numsArr = [];
    readout.innerHTML = "";
  }

  // update readout display
  readout.innerHTML = numsArr;
};

window.onload = function() {
  var numberButtons = document.getElementsByClassName('number-button');
  var operatorButtons = document.getElementsByClassName('operator-button');
  var clearButton = document.getElementsByClassName('clear-button');

  // attach onclick event listeners to all number buttons
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
      // what heppens when you click on a number button
      updateDisplay(e.target.innerHTML); // sends input to updateDisplay
    });
  }
  // attach onclick event listeners to all operator buttons
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function(e) {
      // what heppens when you click on an operator button
      console.log('operator button clicked!');
    });
  }

  clearButton[0].addEventListener('click', function() {
    updateDisplay('clear');
  });

};
