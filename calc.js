// IDEA: create a new branch that encapsulates this object
// so that it functions like an API

// TOOO: add keypress functionality

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
        results.currentTerm = '';
    }
};

var results = {
    currentTerm: '',
    result: null,
    inputs: [],
    operation: null,
    previousOperation: null,



    processInput: function(input) {
        // runs if input is 0-9
        if (!isNaN(input)) {
            if (this.inputs.length === 1 &&
                this.currentTerm === '' ||
                this.currentTerm === '' &&
                readout.mainDisplay.innerHTML === '0') {
                readout.clearMainDisplay();
            }
            // clears initial zero
            if (this.currentTerm === '0' && readout.mainDisplay.length === 1) {
                this.currentTerm = '';
            }

                this.currentTerm += input;
                readout.addToMainDisplay(input);

                if (this.operation !== null) {
                    this.previousOperation = this.operation;
                }
                this.operation = null;

        // runs if an operator button is selected
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
            break;
    }

}

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

  // initialize calculator screen to display zero
  readout.mainDisplay.innerHTML = '0';


};
