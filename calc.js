// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed

// this will hold the individual inputs
// to be operated on
var inputArr = [];
var smallDisplayArr = [];
var operationsArr = [];

// takes button input from user
// updates readout display at end of function
function processInput(item) {

  var mainReadout = document.getElementById('main-readout');
  var smallReadout = document.getElementById('small-readout');

  // if parameter is a number character, add to numsArr
  if (/\w/g.test(item)) {
    inputArr.push(item);
    // update readout display
    // if statement clears display if +
    // was entered previously

    // FIXME: this doesn't work!
    if (inputArr[inputArr.length-1] === "+") {
        mainReadout.innerHTML = "";
    }
    mainReadout.innerHTML = inputArr.join('');
  }
  // IDEA: make else into switch

  if (item === '+') {
    inputArr.push(inputArr)
    inputArr.push(' + ');
    smallDisplayArr.push(inputArr);
    mainReadout.innerHTML = "";
    smallReadout.innerHTML = smallDisplayArr;
  }

  // if function receives 'clear' string from
  // clear button click, clear the numsArr
  if (item === 'clear') {
    numsArr = [];
    readout.innerHTML = "";
  }
};

window.onload = function() {
  var numberButtons = document.getElementsByClassName('number-button');
  var operatorButtons = document.getElementsByClassName('operator-button');
  var clearButton = document.getElementsByClassName('clear-button');

  // attach onclick event listeners to all number buttons
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
      // what heppens when you click on a number button
      processInput(e.target.innerHTML); // sends input to processInput()
    });
  }
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function(e) {
        // attach onclick event listeners to all operator buttons
      // what heppens when you click on an operator button
      processInput(e.target.innerHTML);
    });
  }

  clearButton[0].addEventListener('click', function() {
    processInput('clear');
  });

};
