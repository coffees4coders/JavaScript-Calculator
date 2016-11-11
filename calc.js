/**
 * Notes and TODOs
 *
 * TODO: add keyboard keypress functionality
 * TODO: Round number when using decimal
 * TODO: Switch to monospace font (share tech mono or vt323?)
 */

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
        results.operation = null;
        results.resetOnNextNumber = true;
    }
};

var results = {
    result: null,
    inputs: [],
    operation: null,
    previousOperation: null,

    // this varialble takes a boolean and determines whether the main readout
    // is cleared when a number button is pressed. For instance, this would
    // occur after an operation button is pressed.
    resetOnNextNumber: true,

    // reset this object to default values
    resetResultsObj: function() {
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
      }
    },

    processInput: function(input) {
        // runs if input is 0-9 or decimal
        if (!isNaN(input)) {
            // clears initial zero when entering a number
            if (this.resetOnNextNumber === true) {
                readout.updateMainDisplay('');
            }


            readout.addToMainDisplay(input);

            // TODO: insert code to readout error if string is too long


            if (this.operation !== null) {
                this.previousOperation = this.operation;
            }

            this.operation = null;

            // makes sure that the next number press does not reset the
            // main display
            this.resetOnNextNumber = false;

        // runs if an operator button is selected
      } else if (input === '.') {
        // TODO: add code to handle decimal

        // allows for only one decimal in the number
        if (readout.mainDisplay.innerHTML.indexOf('.') < 0) {
          readout.addToMainDisplay('.');
        }

        // will run if operation button is selected
      } else {

            // handle clicking a different operation before clicking a number button
            // this will replace the previously selected operation
            var lastInputOnSmallDisplay =
                readout.smallDisplay.innerHTML[readout.smallDisplay.innerHTML.length-1],

                indexOfLastInput = readout.smallDisplay.innerHTML.length-1;

            // replaces operation from small display when apporpriate
            if (input !== lastInputOnSmallDisplay && lastInputOnSmallDisplay !== undefined && results.resetOnNextNumber === true) {
                readout.updateSmallDisplay(readout.smallDisplay.innerHTML.slice(0, indexOfLastInput) + input);
            }

            // if a previous operation is pending
            // repeated operation clicks will have no effect
            if (this.operation === null) {
                this.operation = input;

                // adds operation to small display for all operations
                // except 'equals'
                if (input !== '=') {
                    readout.addToSmallDisplay(readout.mainDisplay.innerHTML + ' ' + input);
                }

                this.inputs.push(parseFloat(readout.mainDisplay.innerHTML));
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
                    readout.updateMainDisplay(this.result);
                }

                // the next number press will reset the main display
                this.resetOnNextNumber = true;
            }
        }
    }
};


window.onload = function() {

  var numberButtons = document.getElementsByClassName('number-button'),
      operatorButtons = document.getElementsByClassName('operator-button'),
      clearButton = document.getElementsByClassName('clear-button'),
      equalsButton = document.getElementsByClassName('equals-button'),
      negativeButton = document.getElementsByClassName('negative-button'),
      allButtons = document.getElementsByClassName('btn');



  readout.mainDisplay = document.getElementById('main-readout');
  readout.smallDisplay = document.getElementById('small-readout');

  // initialize calculator screen to display zero
  readout.mainDisplay.innerHTML = '0';

  // attach onclick event listeners to all number buttons
  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) {
      results.processInput(e.target.value);
    });
  }

  // attach onclick event listeners to all operator buttons
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function(e) {
      results.processInput(e.target.value);

    });
  }

  clearButton[0].addEventListener('click', function() {
      readout.clearAll();

  });

  negativeButton[0].addEventListener('click', function() {
      results.toggleNegative();

  });

  equalsButton[0].addEventListener('click', function() {
    results.processInput('=');
    readout.clearSmallDisplay();
    results.resetResultsObj();
  });



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
