// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed

// this will hold the individual inputs
// to be operated on
var inputArr = [];
var smallDisplayArr = [];
var operationsArr = [];


var mainDisplay = document.getElementById('main-readout');

// IDEA: create a new branch that encapsulates this object
//       so that it functions like an API

var readout = {
    mainArr: [],
    smallArr: [],

    // the following properties are set when the page finishes loading
    mainDisplay:  {}, // points to <div class="screen main-readout" id="main-readout">
    smallDisplay: {}, // points to <div class="screen small-readout" id="small-readout">

    // returns the current value of the main display
    // in string format
    getMainDisplay: function() {
        return this.mainArr.join('');
    },
    // returns the current value of the small display
    // in string format
    getSmallDisplay: function() {
        return this.smallDisplay.join('');
    },
    processNumber: function(number) {
        var lastInput = inputArr[inputArr.length-1];
        console.log(lastInput);
        if (lastInput === '+') {
            this.mainDisplay.innerHTML = "";
        }
        inputArr.push(number);
        readout.updateDisplay();

    },
    processOperation: function(symbol) {
        inputArr.push(symbol);
    },
    updateMainDisplay: function(number) {
        this.mainArr.push(number);
        this.mainDisplay.innerHTML = this.getMainDisplay();
    },
    updateSmallDisplay: function(item) {
        this.smallArr = [].push(mainArr).push(item);
    },
    updateDisplay: function() {
        var lastInput = inputArr[inputArr.length-1];
        if (lastInput !== '+') {
            this.mainDisplay.innerHTML = inputArr.join('');
        } else if (lastInput === '+') {
            this.mainDisplay.innerHTML = inputArr.join('').slice(0, inputArr.length-1); // slices input up to operation symbol
            this.smallDisplay.innerHTML = inputArr.join('');
        }
    },
    clearDisplays: function() {
        this.mainDisplay.innerHTML = "";
        this.smallDisplay.innerHTML = "";
        inputArr = [];
    }

};

// takes button input from user
// updates readout display at end of function
function processInput(item) {

    switch(item) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            readout.processNumber(parseInt(item));
            break;
        case "+":
            readout.processOperation('+');
            break;
        case "clear":
            readout.clearDisplays();
            break;

    }

}
 /*
  // if parameter is a number character, add to readout.mainArr
  if (/\w/g.test(item)) {
    readout.updateMainDisplay(item);
    // update readout display
    // if statement clears display if +
    // was entered previously


    if (inputArr[inputArr.length-1] === "+") {
        mainReadout.innerHTML = "";
    }
    mainReadout.innerHTML = inputArr.join('');
  }


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
}
*/
window.onload = function() {


  var numberButtons = document.getElementsByClassName('number-button');
  var operatorButtons = document.getElementsByClassName('operator-button');
  var clearButton = document.getElementsByClassName('clear-button');

  readout.mainDisplay = document.getElementById('main-readout');
  readout.smallDisplay = document.getElementById('small-readout');

  // attach onclick event listeners to all number buttons
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
      // what heppens when you click on a number button
      processInput(e.target.value); // sends input to processInput()
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
