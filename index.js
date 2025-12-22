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
let secondNumber = "";
let operator = "";
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
      add(firstNumber, secondNumber);
      break;
    case "-":
      subtract(firstNumber, secondNumber);
      break;
    case "x":
      multiply(firstNumber, secondNumber);
      break;
    case "÷":
      divide(firstNumber, secondNumber);
      break;
  }
}

function updateMainScreen(number) {
  MAINSCREEN.textContent = number;
}

function addDecimal() {
  if (MAINSCREEN.textContent.includes(".")) {
    return;
  } else if (mainScreenNumber == "0" || mainScreenNumber == "") {
    mainScreenNumber = "0.";
    updateMainScreen(mainScreenNumber);
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
  secondNumber = "";
  operator = "";
  mainScreenNumber = "";
}

function addZero() {
  if (MAINSCREEN.textContent == 0) {
    return;
  } else {
    mainScreenNumber += 0;
    updateMainScreen(mainScreenNumber);
  }
}

function updateSecondaryScreen(firstNumber, operator) {
  if (operator == "=" && firstNumber == "") {
    return;
  } else if (firstNumber !== "" && operator !== "") {
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator}`;
  } else if (firstNumber.length >= 1 && secondNumber.length >= 1) {
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator} ${secondNumber} = `;
  }
}

NUMBERS.forEach((number) => {
  number.addEventListener("click", (e) => {
    mainScreenNumber += e.target.textContent;
    updateMainScreen(mainScreenNumber);
  });
});

OPERATORS.forEach((op) => {
  op.addEventListener("click", (e) => {
    operator = e.target.textContent;
    updateSecondaryScreen(mainScreenNumber, operator);
    mainScreenNumber = "";
  });
});

ZERO.addEventListener("click", addZero);
DECIMAL.addEventListener("click", addDecimal);
CLEARBUTTON.addEventListener("click", removeLastNumber);
ALLCLEARBUTTON.addEventListener("click", clear);
