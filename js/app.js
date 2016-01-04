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
		currentOperator = null,
		waitingForNewDisplay = false;

	function consoleIt() {
		console.log("Display Value: " + display);
		console.log("Current Value: " + currentValue);
		console.log("Current Operator: " + currentOperator);
		console.log("waitingForNewDisplay: " + waitingForNewDisplay);
	}

	function calculateIt() {
		var displayValue = parseFloat(display);

		switch(currentOperator) {
			case '/':
				currentValue = currentValue / displayValue;
				break;
			case '*':
				currentValue = currentValue * displayValue;
				break;
			case '-':
				currentValue = currentValue - displayValue;
				break;
			case '+':
				currentValue = currentValue + displayValue;
				break;
		}

		consoleIt();
	}

	this.appendValue = function(value) {
		if (waitingForNewDisplay) {
			display = "";
			waitingForNewDisplay = false;
		}

		if (display.length <= 20) {
			if (display === "0") {
				display = value;
			}
			else {
				display = display + value;
			}
		}
		
		consoleIt();
		return display;
	};

	this.backSpace = function() {
		if (typeof display === 'string') {
			display = display.slice(0, -1);
		}
		
		if (display.length === 0) {
			display = "0";
		}

		consoleIt();
		return display;
	};

	this.clearCalc = function() {
		display = "0";
		currentValue = 0;
		currentOperator = null;

		consoleIt();
		return display;
	};

	this.setOperator = function(operator) {
		if (currentOperator !== null) {
			calculateIt();
		}
		else {
			currentValue = parseFloat(display);
		}

		currentOperator = operator;

		waitingForNewDisplay = true;

		consoleIt();
	};

	this.totalIt = function() {
		if (!waitingForNewDisplay && currentOperator !== null) {
			calculateIt();

			display = currentValue;

			currentOperator = null;

			consoleIt();
		}

		return display;

	};
}

function btnListener(e){
	if (e.target !== e.currentTarget) {

		var clickedBtnId = e.target.id,
			clickedBtnClass = e.target.classList,
			newDisplay = '';

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
				newDisplay = c.appendValue(clickedBtnId);
				displayEl.textContent = newDisplay;
				break;
			case 'backspace':
				newDisplay = c.backSpace();
				displayEl.textContent = newDisplay;
				break;
			case 'clear':
				newDisplay = c.clearCalc();
				displayEl.textContent = newDisplay;
				break;
			case '/':
			case '*':
			case '-':
			case '+':
				c.setOperator(clickedBtnId);
				break;
			case '=':
				newDisplay = c.totalIt();
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