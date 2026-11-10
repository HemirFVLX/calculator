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

function modifyOperation(operationString, newChar){
    operationString += newChar;
    if(operationString.length === 3){
        const chars = operationString.split('');
        const operation = {
            number1: parseInt(chars[0]),
            operator: chars[1],
            number2: parseInt(chars[2]),
        };
        console.log(operation);
    }
    return operationString;
}

let operationString = '';
const buttons = document.getElementsByClassName('btn');
for(let button of buttons) button.onclick = () => operationString = modifyOperation(operationString, button.textContent);

