const calculate = [];

function updateCalculate() {
    if (calculate.length === 0) {
        document.querySelector('#calculate').innerText = '0';
    } else {
        document.querySelector('#calculate').innerText = `${calculate.join(' ')}`
    }
}

function entryNum() {
    return document.querySelector('#entry-num');
}

// insert num to entrynumber
const nums = document.querySelectorAll('.nums');
for (let num of nums) {
    num.addEventListener('click', function() {
        if (entryNum().innerText === '0') {
            entryNum().innerText = num.innerText;
        } else if (entryNum().innerText === '-0') {
            entryNum().innerText = '-'+num.innerText;
        } else {
            entryNum().innerText += num.innerText;
        }
    })
}

// set entrynumber to positive or negative
document.querySelector('.negative').addEventListener('click', function() {
    if (entryNum().innerText[0] === '-') {
        entryNum().innerText = entryNum().innerText.replace('-', '');
    } else {
        entryNum().innerText = '-' + entryNum().innerText;
    }
})

// make entrynumber to float
document.querySelector('.float').addEventListener('click', function() {
    if (!entryNum().innerText.includes('.')) {
        entryNum().innerText += '.';
    }
})

// del last digit entrynumber (or operator if entrynum is 0)
document.querySelector('.del').addEventListener('click', function() {
    if (entryNum().innerText.length === 1 || /^-\w$/.test(entryNum().innerText)) {
        if (calculate.length > 1 && entryNum().innerText === '0') {
            entryNum().innerText = calculate[calculate.length-2]
            calculate.splice(calculate.length-2, 2);
            updateCalculate();
        } else {
            entryNum().innerText = '0';
        }
    } else {
        entryNum().innerText = entryNum().innerText.slice(0, entryNum().innerText.length-1)
    }
})

// clear entrynumber
document.querySelector('.clear-entry').addEventListener('click', function() {
    entryNum().innerText = '0';
})

//clear calculator
document.querySelector('.clear').addEventListener('click', function() {
    entryNum().innerText = '0';
    calculate.splice(0, calculate.length)
    updateCalculate()
})

// arithmetic operator (set +/- number if entrynum is 0)
const operators = document.querySelectorAll('.operators');
for (let operator of operators) {
    operator.addEventListener('click', function() {
        if (parseFloat(entryNum().innerText) === 0) {
            if ('+-/X'.includes(calculate[calculate.length-1])) {
                calculate[calculate.length-1] = operator.innerText;
                updateCalculate();
            }
        } else {
            calculate.push(entryNum().innerText, operator.innerText);
            entryNum().innerText = '0';
            updateCalculate();
        }
    })
}

// calculate
document.querySelector('.equal').addEventListener('click', function() {
    if (parseFloat(entryNum().innerText) === 0) {
        alert('Please insert number to entrynum :(')
    } else {
        calculate.push(entryNum().innerText);
        const toCalculate = calculate.join(' ').replace('X','*');
        const answer = eval(toCalculate)
        calculate.push('=', answer)
        updateCalculate();
        entryNum().innerText = `${answer}`;
        calculate.splice(0, calculate.length);
    }
})
