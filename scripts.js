let previousCharEqual = false;

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
    return a / b;
}

function makeOperation(op){
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

function modifyOperation(operationString, newChar){
    if(newChar === 'C') return '';

    if(previousCharEqual && !Number.isNaN(parseInt(newChar))) operationString = '';
    previousCharEqual = false;

    const regex = /^[0-9]+[+-/*//]+[0-9]+$/;
    const ops = '+-*/=';

    if(regex.test(operationString) && ops.includes(newChar)){
        const op = operationString.split('').filter((x) => Number.isNaN(parseInt(x))).join();
        const chars = operationString.split(`${op}`);
        const operation = {
            number1: parseInt(chars[0]),
            operator: op,
            number2: parseInt(chars[1]),
        };
        console.log(operation);

        const result = makeOperation(operation);
        operationString = result.toString();
        
        if(newChar === '='){
            previousCharEqual = true;
            console.log(operationString);
            return operationString;
        } 
    }
    operationString += newChar;
    console.log(operationString);
    return operationString;
}

let operationString = '';
const buttons = document.getElementsByClassName('btn');
for(let button of buttons) button.onclick = () => operationString = modifyOperation(operationString, button.textContent);

