// store most resent result
// select operator
// operator click triggers display update

//clear function 
	// take stored value and reset to zero
	// set the display to zero


// add function

// subtract function

// multiply function

// divide function

// equals function

// display function

// calculator = function() {
// 	var currentValue = 0;

// 	this.updateDisplay = function() {

// 	}
// };

function Calc() {
	var display = "0",
		currentValue = 0,
		currentFunction = null;

	function consoleIt() {
		console.log("Display Value: " + display);
		console.log("Current Value: " + currentValue);
	}

	this.appendValue = function(value) {
		if (display.length <= 20) {
			if (display === "0") {
				display = value;
			}
			else {
				display = display + value;
			}
		}
		
		return display;
	};
}

function updateDisplay() {

}

function btnListener(e){
	if (e.target !== e.currentTarget) {

		var clickedBtnId = e.target.id,
			clickedBtnClass = e.target.classList;

		switch(clickedBtnId) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '.':
				var newDisplay = c.appendValue(clickedBtnId);
				displayEl.textContent = newDisplay;
				break;
			}	
		}

	e.stopPropagation();
}


var calcContainer = document.querySelector('#calc-container'),
	displayEl = document.querySelector('#display');

calcContainer.addEventListener('click', btnListener, false);

var c = new Calc();