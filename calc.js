var readout = {
    // the following properties are set when the page finishes loading
     mainDisplay:  {}, // points to <div class="screen main-readout" id="main-readout">
     smallDisplay: {}, // points to <div class="screen small-readout" id="small-readout">

     fontSize: 3,

     // add___ methods will append the readout
     addToMainDisplay: function(item) {
         readout.mainDisplay.innerHTML += item;
     },

     addToSmallDisplay:function(item) {
        readout.smallDisplay.innerHTML += item;

        if (readout.smallDisplay.innerHTML.length > 20) {
          readout.smallDisplay.style = 'font-size: 1.25em';
        }
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
        this.sizeResults()
    },

    sizeResults: function() {
      // for small screens
      if ('ontouchstart' in window) {

      }

      if (readout.mainDisplay.innerHTML.length < 11) {
        document.getElementById('main-readout').style.fontSize = '2.5em';
      } else if (readout.mainDisplay.innerHTML.length < 14) {
        document.getElementById('main-readout').style.fontSize = '2em';
      } else {
        document.getElementById('main-readout').style.fontSize = '1.5em';
      }
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
            newNum;

        if (readout.mainDisplay.innerHTML < 0) {
          newNum = Math.abs(numberOnDisplay);

        } else if (readout.mainDisplay.innerHTML > 0) {
          newNum = 0 - numberOnDisplay;
        }

        readout.updateMainDisplay(newNum);
        readout.sizeResults();
      }
    },

    makePercentage: function() {
      var numberOnDisplay = parseFloat(readout.mainDisplay.innerHTML),
          newNum;

      newNum = numberOnDisplay / 100;
      readout.updateMainDisplay(newNum);
      readout.sizeResults();

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
        if (this.resetOnNextNumber) {
          readout.clearMainDisplay();
          readout.addToMainDisplay('0');
          this.resetOnNextNumber = false;
        }

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
                // except 'equals'. Limits number of digits in small readout
                if (input !== '=' /*&& document.getElementById('smallResult').innerHTML.length +
                    readout.mainDisplay.innerHTML.length < 25*/) {
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
        // shrinks font-size of mainDisplay if number of digits on mainDisplay
        // grow too large
        readout.sizeResults();
    }
};


window.onload = function() {

  var numberButtons = document.getElementsByClassName('number-button'),
      operatorButtons = document.getElementsByClassName('operator-button'),
      clearButton = document.getElementsByClassName('clear-button'),
      equalsButton = document.getElementsByClassName('equals-button'),
      negativeButton = document.getElementsByClassName('negative-button'),
      percentButton = document.getElementById('percent-button'),
      allButtons = document.getElementsByTagName('button');



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

  percentButton.addEventListener('click', function() {
      results.makePercentage();
  });

  equalsButton[0].addEventListener('click', function() {
    results.processInput('=');
    readout.clearSmallDisplay();
    results.resetResultsObj();
  });



  // button press effects

  // detects if user is using a touch screen device
  if ('ontouchstart' in window) {
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('touchstart', function(e) {
          var elemClassList = e.target.className;
          e.target.className += ' press';
      });

    }

    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('touchend', function(e) {
          var elemClassList = e.target.className;
          // remove the .press class from the class attribute
          var startIndex = elemClassList.indexOf(' press');
          var revertedClassList = elemClassList.slice(0, startIndex);
          e.target.className = revertedClassList;
      });

    }

    // for non-touch screens
  } else {
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
  }
};
