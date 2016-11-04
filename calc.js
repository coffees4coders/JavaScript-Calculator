// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed

// this will hold the individual inputs
// to be operated on
var inputArr = [];
var smallDisplayArr = [];
var operationsArr = [];



// IDEA: create a new branch that encapsulates this object
//       so that it functions like an API

var readout = {
    mainArr: [],
    smallArr: [],

    // the following properties are set when the page finishes loading
     mainDisplay:  {}, // points to <div class="screen main-readout" id="main-readout">
     smallDisplay: {}, // points to <div class="screen small-readout" id="small-readout">

     clearMainDisplay: function() {
         this.mainDisplay.innerHTML = "";
     },

    clearAll: function() {
        this.mainDisplay.innerHTML = "";
        this.smallDisplay.innerHTML = "";
        inputArr = [];
    }
};

var results = {
    currentTerm: '',
    result: null,
    inputs: [],
    operation: null,
    addToMainDisplay: function(item) {
        readout.mainDisplay.innerHTML += item;
    },
    addToSmallDisplay:function(item){
        readout.smallDisplay.innerHTML += item;
    },
    updateMainDisplay: function(item) {
        readout.mainDisplay.innerHTML = item;
    },
    updateSmallDisplay:function(item){
        readout.smallDisplay.innerHTML = item;
    },
    processInput: function(input) {
        // runs if input is 1-9
        if (!isNaN(input)) {
            if (this.inputs.length === 1 && this.currentTerm === '') {
                readout.clearMainDisplay();
            }
            this.currentTerm += input;
            this.addToMainDisplay(input);
            this.operation = null;
        } else {
            // if a previous operation is pending
            // repeated operation clicks will have no effect
            if (this.operation === null) {
                this.operation = input;
                this.addToSmallDisplay(this.currentTerm + ' ' + input);
                this.inputs.push(parseFloat(this.currentTerm));
                if (this.inputs.length === 2) {
                    switch(this.operation) {
                        case '+':
                            this.result = this.inputs[0] + this.inputs[1];
                            break;

                        case '-':
                            this.result = this.inputs[0] - this.inputs[1];
                            break;

                        case '/':
                            this.result = this.inputs[0] / this.inputs[1];
                            break;

                        case '*':
                            this.result = this.inputs[0] * this.inputs[1];
                            break;
                    }

                    this.inputs = [];
                    this.inputs.push(this.result);
                    console.log('result = ' + this.result);
                    this.updateMainDisplay(this.result);
                }
                this.currentTerm = '';
            }
        }
    }
};

// takes button input from user
// updates readout display at end of function
function processClick(item) {

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
            results.processInput(item);
            break;
        case "plus":
            results.processInput('+');
            break;
        case "minus":
            results.processInput('-');
            break;
        case "divide":
            results.processInput('/');
            break;
        case "multiply":
            results.processInput('*');
            break;
        case "clear":
            readout.clearAll();
            break;
        case "equals":
            // TODO: add equals functionality
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
  var equalsButton = document.getElementsByClassName('equals-button');


  readout.mainDisplay = document.getElementById('main-readout');
  readout.smallDisplay = document.getElementById('small-readout');

  // attach onclick event listeners to all number buttons
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
      // what heppens when you click on a number button
      processClick(e.target.value); // sends input to processInput()
    });
  }
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function(e) {
        // attach onclick event listeners to all operator buttons
      // what heppens when you click on an operator button
      processClick(e.target.value);
    });
  }

  clearButton[0].addEventListener('click', function() {
    processClick('clear');
  });

  equalsButton[0].addEventListener('click', function() {
    processClick('equals');
  });

};
