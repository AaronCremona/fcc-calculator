function Calc() {
	var display = "0",
		currentValue = 0,
		currentOperator = null,
		waitingForNewDisplay = false,
		waitingForOperator = false,
		blockOperatorAction = true;

	function consoleIt() {
		console.log("***************************************");
		console.log("Display Value: " + display);
		console.log("Current Value: " + currentValue);
		console.log("Current Operator: " + currentOperator);
		console.log("waitingForNewDisplay: " + waitingForNewDisplay);
		console.log("waitingForOperator: " + waitingForOperator);
		console.log("blockOperatorAction: " + blockOperatorAction);
	}

	function calculateIt() {
		var displayValue = parseFloat(display);

		var result = 0;

		switch(currentOperator) {
			case '/':
				result = currentValue / displayValue;
				break;
			case '*':
				result = currentValue * displayValue;
				break;
			case '-':
				result = currentValue - displayValue;
				break;
			case '+':
				result = currentValue + displayValue;
				break;
		}

		result = result.toPrecision(15);

		result = result.split(".");

		while (result[1].charAt(result[1].length -1) === '0') {
			result[1] = result[1].slice(0,-1);
		}

		if (result[1].length !== 0) {
			currentValue = result.join(".");
		}
		else {
			currentValue = result[0].toString();
		}

		consoleIt();
	}

	this.appendValue = function(value) {
		if (!waitingForOperator) {
			if (waitingForNewDisplay) {
				display = "";
				waitingForNewDisplay = false;
			}

			if (blockOperatorAction) {
				blockOperatorAction = false;
			}

			if (display.length < 15) {
				if (display === "0") {
					display = value;
				}
				else {
					display = display + value;
				}
			}
		}

		consoleIt();
		return display;
	};

	this.backSpace = function() {
		if (!waitingForOperator) {
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
		waitingForOperator = false;

		consoleIt();
		return display;
	};

	this.setOperator = function(operator) {
		if (!blockOperatorAction) {

			if (currentOperator !== null) {
				calculateIt();
			}
			else {
				currentValue = parseFloat(display);
			}

			currentOperator = operator;

			waitingForNewDisplay = true;
			waitingForOperator = false;
		}

		consoleIt();
	};

	this.totalIt = function() {
		if (!waitingForNewDisplay && currentOperator !== null) {
			calculateIt();

			display = currentValue;

			currentOperator = null;
			waitingForOperator = true;

			consoleIt();
		}

		return display;

	};

	this.togglePlusMin = function() {
		if (display !== '0') {
			if (display[0] === "-") {
				display = display.slice(1);
			}
			else {
				display = "-" + display;
			}
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
			case 'plusMin':
				newDisplay = c.togglePlusMin();
				displayEl.textContent = newDisplay;
			}
		}

	e.stopPropagation();
}


var calcContainer = document.querySelector('#calc-container'),
	displayEl = document.querySelector('#display');

calcContainer.addEventListener('click', btnListener, false);

var c = new Calc();