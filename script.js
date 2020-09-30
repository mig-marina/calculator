/*numeric elements:*/
const numbers = document.querySelectorAll('.number');
/*operation buttons:*/
const operations = document.querySelectorAll('.operator');
/*clear buttons:*/
const clearBtns = document.querySelectorAll('.clear-btn');
/*decimal point:*/
const decimalBtn = document.getElementById('decimal');
/*button result:*/
const result = document.getElementById('result');
/*display for result:*/
const display = document.getElementById('display');
/*button to change sign*/
const signChangeBtn = document.getElementById('sign-change');

/*what is the current number, default - 0*/
let MemoryCurrentNumber = 0;
/*is a new number set, default - none*/
let MemoryNewNumber = false;
/*expected operation*/
let MemoryPendingOperation = '';

/*click on numbers*/
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function(e) {
    numberPress(e.target.textContent);
  });
}
/*click on operations*/
for (var i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {
    operationPress(e.target.textContent);
  });
}
/*click on the clear buttons*/
for (var i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e) {
    clear(e.target.textContent);
  });
}
/*decimal button click*/
decimalBtn.addEventListener('click', decimal);
/*change sign*/
signChangeBtn.addEventListener('click', signChange);

function signChange() {
	let localNumber = +display.value;
	console.log(localNumber);
	if(localNumber != 0) {
		localNumber = localNumber*(-1);
		display.value = localNumber;
	}
}

/*number input function*/
function numberPress(number) {
  if (MemoryNewNumber) { /*если вводим новое число*/
    display.value = number; /*все стереть и начать заново*/
    MemoryNewNumber = false; /*маркер вернуть в состояние, что число не новое, а цифры накапливаем*/
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

/*arithmetic operations*/
function operationPress(op) {
		if (op == 'sqrt') {
			MemoryCurrentNumber = display.value;
			MemoryCurrentNumber = MemoryCurrentNumber*1;
			console.log(MemoryCurrentNumber);
			if(MemoryCurrentNumber >= 0) {
				display.value = Math.sqrt(MemoryCurrentNumber);
				MemoryCurrentNumber = display.value;
				MemoryCurrentNumber = MemoryCurrentNumber*1;
			} else {display.value = 'invalid input!'; MemoryNewNumber = true;};
			
		} else { 
			let localOperationMemory = display.value;
			localOperationMemory = localOperationMemory*1;
			if (MemoryNewNumber && MemoryPendingOperation !== '=') {
			display.value = MemoryCurrentNumber;
			} else {
				MemoryNewNumber = true;
				if (MemoryPendingOperation === '+') { /*сравниваем ту операцию, что в памяти*/
					MemoryCurrentNumber += localOperationMemory;
				} else if (MemoryPendingOperation === '-') {
					MemoryCurrentNumber -= localOperationMemory;
				} else if (MemoryPendingOperation === '*') {
					MemoryCurrentNumber *= localOperationMemory;
				} else if (MemoryPendingOperation === '/') {
					if(localOperationMemory == 0) {MemoryCurrentNumber = 'infinity!'; localOperationMemory = 0;
						} else MemoryCurrentNumber /= localOperationMemory;
				} else if (MemoryPendingOperation === 'pow') {
					MemoryCurrentNumber = Math.pow(MemoryCurrentNumber,localOperationMemory);
				} else {
					if(MemoryCurrentNumber != 'infinity!') {MemoryCurrentNumber = localOperationMemory;}
				} 
				if(MemoryCurrentNumber != 'infinity!') {
				MemoryCurrentNumber = MemoryCurrentNumber.toFixed(12)*1;
				display.value = MemoryCurrentNumber; /*выводим на табло новое значение из памяти функции*/
				MemoryPendingOperation = op; /*когда мы начинаем вводить новое число, то операцию, которую будем между этими числами делать сохраням в локальную op*/} else {
					display.value = MemoryCurrentNumber;
					MemoryCurrentNumber = 0;
					localOperationMemory = 0;
					MemoryNewNumber = true;
					MemoryPendingOperation = '';
				}
			}
		}/*end else !==sqrt*/
}/*end function operationPress*/

/*decimal number*/
function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

/*cleaning options:*/
function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
