const regex = /^[0-9]+[+-/*//]+[0-9]+$/;
const onlyNumbers = /^[0-9]+$/;
const operatorAtEnd = /^[0-9]+[+-/*//]+$/;
const ops = '+-*/';

let previousCharEqual = false;
let operation = {};

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        if(a === 0) return 'Undefined';
        return 'Error';
    }
    return Math.floor(a / b);
}

function operate(op){
    switch(op.operator){
        case '+':
            return add(op.number1, op.number2);
        case '-':
            return subtract(op.number1, op.number2);
        case '*':
            return multiply(op.number1, op.number2);
        case '/':
            return divide(op.number1, op.number2);
        default:
            console.log('unexpected error');
    }
}

function displayResult(chars){
    const screenElement = document.querySelector('.screen');
    let resultString = '';

    if (operatorAtEnd.test(chars)){
        resultString = chars.split('');
        resultString.pop();
        resultString = resultString.join('');
    } else if(regex.test(chars)){
        let charShifted;
        resultString = chars.split('');
        do {
            charShifted = resultString.shift();
        } while(!Number.isNaN(parseInt(charShifted)));
        resultString = resultString.join('');
    } else {
        resultString = chars;
    }

    screenElement.textContent = resultString;
}

function modifyOperation(operationString, newChar){
    if(newChar === 'C') {
        previousCharEqual = false;
        operation = {};
        displayResult('0');
        return '0';
    }

    if(previousCharEqual){
        if(!Number.isNaN(parseInt(newChar))){
            operationString = '';
        } else if(newChar === '='){
            operation.number1 = parseInt(operationString);
            operationString = operate(operation).toString();
            previousCharEqual = true;
            displayResult(operationString);
            //console.log(operationString);
            return operationString;
        }
    } 
    previousCharEqual = false;

    if(newChar === '='){
        if(onlyNumbers.test(operationString)){
            return operationString;
        } else if(operatorAtEnd.test(operationString)){
            const arr = operationString.split('');
            operation.operator = arr.pop();
            operationString = arr.join('');
            operation.number1 = parseInt(operationString);
            operation.number2 = parseInt(operationString);

            operationString = operate(operation).toString();

            previousCharEqual = true;
            displayResult(operationString);
            return operationString;
        }
    }

    if(operatorAtEnd.test(operationString) && ops.includes(newChar)){
        operationString = operationString.slice(0, operationString.length - 1) + newChar;
        return operationString;
    }

    if(regex.test(operationString) && (ops.includes(newChar) || newChar === '=')){
        const op = operationString.split('').filter((x) => Number.isNaN(parseInt(x))).join();
        const chars = operationString.split(op);

        operation.number1 = parseInt(chars[0]);
        operation.operator = op;
        operation.number2 = parseInt(chars[1]);

        //console.log(operation);

        operationString = operate(operation).toString();
        
        if(newChar === '='){
            previousCharEqual = true;
            displayResult(operationString);
            //console.log(operationString);
            return operationString;
        } 
    }
    if(operationString !== '0'){
        operationString += newChar;
    } else {
        if(Number.isNaN(parseInt(newChar))){
            operationString += newChar;
        } else {
            operationString = newChar;
        }
    }
    displayResult(operationString);
    //console.log(operationString);
    return operationString;
}

let operationString = '0';
const buttons = document.getElementsByClassName('btn');
for(let button of buttons) button.onclick = () => {
    operationString = modifyOperation(operationString, button.textContent);
};

