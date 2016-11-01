// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed

// this will hold the individual inputs
// to be operated on
var inputArr = [];
var smallDisplayArr = [];
var operationsArr = [];

var mainDisplay = document.getElementById('main-readout');

var readout = {
    mainArr: [],
    smallArr: [],

    // the following properties are set when the page finishes loading
    // mainDisplay : points to <div class="screen main-readout">
    // smallDisplay : points to <div class="screen small-readout" id="small-readout">




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

    updateMainDisplay: function(number) {
        this.mainArr.push(number);
        this.mainDisplay.innerHTML = this.getMainDisplay();
    },

    updateSmallDisplay: function(number) {
        this.smallArr.push(number);
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
            readout.updateMainDisplay(parseInt(item));
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
