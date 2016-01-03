

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

function btnListener(e){
	if (e.target !== e.currentTarget) {

		var clickedBtn = e.target.id,
			clickedBtnClass = e.target.classList;
		console.log("id: " + clickedBtn + ", class: " + clickedBtnClass);
	}

	e.stopPropagation();
};

function appendValue(value) {

}



var calcContainer = document.querySelector('#calc-container');
calcContainer.addEventListener('click', btnListener, false);