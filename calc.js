// TODO: add keyboard keypress functionality
// FIXME: pressing operation after getting result from equals should
//        use previous result
// TODO: Round number when using decimal

var readout = {
    // the following properties are set when the page finishes loading
     mainDisplay:  {}, // points to <div class="screen main-readout" id="main-readout">
     smallDisplay: {}, // points to <div class="screen small-readout" id="small-readout">

     // add___ methods will append the readout
     addToMainDisplay: function(item) {
         readout.mainDisplay.innerHTML += item;
     },
     addToSmallDisplay:function(item){
         readout.smallDisplay.innerHTML += item;
     },

     // update____Display methods will replace display contents
     updateMainDisplay: function(item) {
         readout.mainDisplay.innerHTML = item;
     },
     updateSmallDisplay:function(item){
         readout.smallDisplay.innerHTML = item;
     },

     clearMainDisplay: function() {
         this.mainDisplay.innerHTML = "";
     },

     clearSmallDisplay: function() {
         this.smallDisplay.innerHTML = "";
     },

    clearAll: function() {
        this.mainDisplay.innerHTML = "0";
        this.smallDisplay.innerHTML = "";
        results.inputs = [];
        results.currentTerm = '0';
        results.operation = null;
    }
};

var results = {
    currentTerm: '0',
    result: null,
    inputs: [],
    operation: null,
    previousOperation: null,

    // reset this object to default values
    resetResultsObj: function() {
      this.currentTerm = '0';
      this.result = null;
      this.inputs = [];
      this.operation = null;
      this.previousOperation = null;
    },

    // changes the sign of the number displayed in the main readout
    toggleNegative: function() {
      // only switches signs if an operator button has not
      // just been clicked
      if (this.operation === null) {
        var numberOnDisplay = parseFloat(readout.mainDisplay.innerHTML),
            num;

        if (readout.mainDisplay.innerHTML < 0) {
          num = Math.abs(numberOnDisplay);

        } else if (readout.mainDisplay.innerHTML > 0) {
          num = 0 - numberOnDisplay;
        }

        readout.updateMainDisplay(num);
        this.currentTerm = num;
      }
    },

    processInput: function(input) {
        // runs if input is 0-9 or decimal
        if (!isNaN(input)) {
            if (this.inputs.length === 1 &&
                this.currentTerm === '' ||
                this.currentTerm === '' &&
                readout.mainDisplay.innerHTML === '0') {
                readout.clearMainDisplay();
            }
            // clears initial zero when entering a number
            if (this.currentTerm === '0') {
                this.currentTerm = '';
                readout.updateMainDisplay('');
            }

            console.log('yo')

            this.currentTerm += input;
            readout.addToMainDisplay(input);

            // TODO: insert code to readout error if string is too long


            if (this.operation !== null) {
                this.previousOperation = this.operation;
            }

            this.operation = null;

        // runs if an operator button is selected
      } else if (input === '.') {
        // TODO: add code to handle decimal
        console.log('decimal pressed');

        if (readout.mainDisplay.innerHTML.indexOf('.') < 0) {
          this.currentTerm += '.';
          readout.addToMainDisplay('.');
        }

      } else {

            // handle clicking a different operation before clicking a number button
            // this will replace the previously selected operation
            var lastInputOnSmallDisplay =
                readout.smallDisplay.innerHTML[readout.smallDisplay.innerHTML.length-1],

                indexOfLastInput = readout.smallDisplay.innerHTML.length-1;
            // replaces operation from small display when apporpriate
            if (input !== lastInputOnSmallDisplay && lastInputOnSmallDisplay !== undefined && this.currentTerm === '') {
                readout.updateSmallDisplay(readout.smallDisplay.innerHTML.slice(0, indexOfLastInput) + input);
            }

            // if a previous operation is pending
            // repeated operation clicks will have no effect
            if (this.operation === null) {
                this.operation = input;

                // if (readout.smallDisplay.innerHTML = '0') {
                //   readout.addToSmallDisplay('0' + input);
                // }

                // adds operation to small display for all operations
                // except 'equals'
                if (input !== '=') {
                    readout.addToSmallDisplay(this.currentTerm + ' ' + input);
                }

                this.inputs.push(parseFloat(this.currentTerm));
                if (this.inputs.length === 2) {

                    // operation logic
                    switch(lastInputOnSmallDisplay) {
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

                        case '=':
                            this.result = this.inputs[0] * this.inputs[1];
                            break;

                    }

                    this.inputs = [];
                    this.inputs.push(this.result);
                    console.log('result = ' + this.result);
                    readout.updateMainDisplay(this.result);
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
        case "0":
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
        case "decimal":
            results.processInput('.');
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
            results.processInput('=');
            readout.clearSmallDisplay();
            results.resetResultsObj();
            break;
        case "negative":
            results.toggleNegative();
            break;
    }

}

window.onload = function() {

  var numberButtons = document.getElementsByClassName('number-button'),
      operatorButtons = document.getElementsByClassName('operator-button'),
      clearButton = document.getElementsByClassName('clear-button'),
      equalsButton = document.getElementsByClassName('equals-button'),
      negativeButton = document.getElementsByClassName('negative-button'),
      allButtons = document.getElementsByClassName('btn');



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

  // initialize calculator screen to display zero
  readout.mainDisplay.innerHTML = '0';

  // adds event listeners for mousedown event
  // appends .press class to the element's class attribute
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('mousedown', function(e) {
        var elemClassList = e.target.className;
        e.target.className += ' press';
    });

  }

  // add event listeners for mouseup event
  // removes .press class from the element's class attribute
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('mouseup', function(e) {
        var elemClassList = e.target.className;
        // remove the .press class from the class attribute
        var startIndex = elemClassList.indexOf(' press');
        var revertedClassList = elemClassList.slice(0, startIndex);
        e.target.className = revertedClassList;
    });

  }

};
