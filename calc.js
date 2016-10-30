// this will hold the numbers selected by
// the calculator number buttons before
// an operator button is pressed
var numsArr = [];

// this will hold the
var inputArr = [];

window.onload = function() {
  var numberButtons = document.getElementsByClassName('number-button');
  var operatorButtons = document.getElementsByClassName('operator-button');

  for (var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
      // what heppens when you click on a number button
      console.log('number button clicked!');

    });
  }
  for (var i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
      // what heppens when you click on an operator button
      console.log('operator button clicked!');

    });
  }


};
