const displayNumber = document.getElementById('display-number');
let calculate = ["0"];

function updateDisplayNumber() {
    displayNumber.innerText = '';
    for (item of calculate) {
        displayNumber.innerText += ' '+item;
    }
}

function updateCurrentNumber(N) {
    let number = calculate[calculate.length-1];
    if (number === '0') {
        number = N;
    } else {
        number += N;
    }
    calculate[calculate.length-1] = number;
    updateDisplayNumber();
}

function numberToFloat() {
    let number = calculate[calculate.length-1];
    if (!number.includes('.')){
        number += '.';
    }
    console.log(!number.includes('.'))
    calculate[calculate.length-1] = number;
    updateDisplayNumber();
}

const buttons = document.getElementsByClassName('btn');
for (button of buttons) {
    if (button.innerText === '.') {
        button.addEventListener('click', function() {
            numberToFloat();
        })
        continue;
    }
    button.addEventListener('click', function(event) {
        updateCurrentNumber(event.target.innerText);
    })
}

function pushOperator(operator) {
    const number = calculate[calculate.length-1];
    if (number === '0' && calculate.length > 1){
        calculate[calculate.length-2] = operator;
    } else if (number !== '0') {
        calculate.push(operator, '0');
    } 
    updateDisplayNumber()
}

function inverseNumber() {
    const invNumber = `-(${parseFloat(calculate[calculate.length-1])})`
    calculate[calculate.length-1] = `${eval(invNumber)}`;
    updateDisplayNumber();
}

function backspace() {
    const number = calculate[calculate.length-1];
    if (number === '0' && calculate.length > 1){
        calculate.pop();
        calculate.pop();
    } else if (number.length === 1 || (number.length === 2 && number[0] === '-')) {
        calculate[calculate.length-1] = '0';
    } else {
        calculate[calculate.length-1] = number.substr(0, number.length-1)
    }
    updateDisplayNumber();
}

function clear() {
    calculate = ['0'];
    updateDisplayNumber();
}

function performCalculation() {
    let toEval = calculate.join(' ').replace('X', '*');
    toEval = (eval(toEval)).toFixed(12)
    calculate = [`${parseFloat(toEval)}`]
    updateDisplayNumber();
}

const operators = document.getElementsByClassName('operators');
for (operator of operators) {
    if ('+-/X'.includes(operator.innerText)) {
        operator.addEventListener('click', function(event) {
            pushOperator(event.target.innerText);
        })
    } else if (operator.innerText === '+/-') {
        operator.addEventListener('click', function() {
            inverseNumber()
        });
    } else if (operator.innerText === 'Del') {
        operator.addEventListener('click', function() {
            backspace();
        })
    } else if (operator.innerText === 'C') {
        operator.addEventListener('click', function() {
            clear();
        })
    } else {
        operator.addEventListener('click', function() {
            performCalculation();
        })
    }
}