const MAINSCREEN = document.querySelector(".main");
const SECONDARYSCREEN = document.querySelector(".secondary");
const NUMBERS = document.querySelectorAll(".number");
const ZERO = document.querySelector(".zero");
const DECIMAL = document.querySelector(".decimal");
const CLEARBUTTON = document.querySelector("#c");
const ALLCLEARBUTTON = document.querySelector("#ac");
const OPERATORS = document.querySelectorAll(".operator");
const EQUAL = document.querySelector(".equal");

let mainScreenNumber = "";
let firstNumber = "";
let operator = "";
let answer = "";

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      answer = add(firstNumber, secondNumber);
      break;
    case "-":
      answer = subtract(firstNumber, secondNumber);
      break;
    case "x":
      answer = multiply(firstNumber, secondNumber);
      break;
    case "÷":
      answer = divide(firstNumber, secondNumber);
      break;
  }
}

function updateMainScreen(number) {
  MAINSCREEN.textContent = number;
}

function addDecimal() {
  if (mainScreenNumber == "0" || mainScreenNumber == "") {
    mainScreenNumber = "0.";
    updateMainScreen(mainScreenNumber);
  } else if (MAINSCREEN.textContent.includes(".")) {
    return;
  } else {
    mainScreenNumber += ".";
    updateMainScreen(mainScreenNumber);
  }
}

function removeLastNumber() {
  mainScreenNumber = mainScreenNumber.slice(0, -1);
  updateMainScreen(mainScreenNumber);

  if (mainScreenNumber == "") {
    mainScreenNumber = "";
    updateMainScreen(0);
    return;
  }
}

function clear() {
  SECONDARYSCREEN.textContent = "";
  MAINSCREEN.textContent = "0";
  firstNumber = "";
  operator = "";
  mainScreenNumber = "";
  answer = "";
}

function addZero() {
  if (MAINSCREEN.textContent.includes(".")) {
    mainScreenNumber += 0;
    updateMainScreen(mainScreenNumber);
  } else if (MAINSCREEN.textContent == 0) {
    return;
  } else if (MAINSCREEN.textContent == "You cannot divide by zero") {
    SECONDARYSCREEN.textContent = "";
    MAINSCREEN.textContent = "0";
  } else {
    mainScreenNumber += 0;
    updateMainScreen(mainScreenNumber);
  }
}

function roundTo3rdDecimal(number) {
  return number.toFixed(3);
}

function hasDecimal(number) {
  return number % 1 !== 0;
}

function addNumberToMainScreen(number) {
  if (firstNumber == "" && answer == "") {
    SECONDARYSCREEN.textContent = "";
  }
  mainScreenNumber += number;
  updateMainScreen(mainScreenNumber);
}

NUMBERS.forEach((number) => {
  number.addEventListener("click", (e) => {
    //resets the secondary screen if the user hits equal sign
    //to start a new operation
    let number = e.target.textContent;
    addNumberToMainScreen(number);
  });
});

function displayErrorOnZeroDivisionAndReset() {
  MAINSCREEN.textContent = "You cannot divide by zero";
  firstNumber = "";
  answer = "";
  mainScreenNumber = "";
}

function evaluate(firstNumber, secondNumber, operator) {
  if (secondNumber == 0 && operator == "÷") {
    displayErrorOnZeroDivisionAndReset();
  } else {
    operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);

    if (hasDecimal(answer)) {
      answer = roundTo3rdDecimal(answer);
    }
    //display answer in main screen
    MAINSCREEN.textContent = answer;

    //update secondary screen
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator} ${mainScreenNumber} = `;

    //reset mainScreenNumber so that we can store the next value the user enters
    //when they click on the operator / equal sign
    mainScreenNumber = "";
  }
}

//runs when equal sign is called
function evaluateOnEqual() {
  if (mainScreenNumber == "") {
    return;
  } else {
    evaluate(firstNumber, mainScreenNumber, operator);

    //reset values so that the user can start a new operation from
    //scratch when pressing equal sign
    firstNumber = "";
    answer = "";
  }
}

function performOperation(op) {
  //this if statement runs if an operator is clicked and both first number value
  // and second number value (in this case mainScreenNumber) is present
  //It allows the user to evaluate the first 2 values of the numbers right away after pressing
  //another operator
  if (mainScreenNumber == "0" && operator == "÷") {
    displayErrorOnZeroDivisionAndReset();
  } else if (firstNumber !== "" && mainScreenNumber !== "") {
    evaluate(firstNumber, mainScreenNumber, operator);

    //get new operator
    operator = op;

    //transfer the answer to first number
    firstNumber = answer;

    //update secondary screen
    SECONDARYSCREEN.textContent = `${answer} ${operator}`;
  }
  //this else statement fires in the initial calculation
  else {
    //get current operator
    operator = op;

    //set firstnumber
    firstNumber = MAINSCREEN.textContent;

    //update secondary screen
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator}`;

    //reset mainScreen number
    mainScreenNumber = "";
  }
}

OPERATORS.forEach((op) => {
  op.addEventListener("click", (e) => {
    let op = e.target.textContent;
    performOperation(op);
  });
});

EQUAL.addEventListener("click", evaluateOnEqual);

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    removeLastNumber();
  } else if (e.key >= "1" && e.key <= "9") {
    addNumberToMainScreen(e.key);
  } else if (e.key == "0") {
    addZero();
  } else if (e.key == ".") {
    addDecimal();
  } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    let op = e.key == "/" ? "÷" : e.key;
    performOperation(op);
  } else if (e.key == "Enter" || e.key == "=") {
    evaluateOnEqual();
  }
});

ZERO.addEventListener("click", addZero);
DECIMAL.addEventListener("click", addDecimal);
CLEARBUTTON.addEventListener("click", removeLastNumber);
ALLCLEARBUTTON.addEventListener("click", clear);
