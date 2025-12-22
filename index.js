const MAINSCREEN = document.querySelector(".main");
const SECONDARYSCREEN = document.querySelector(".secondary");
const NUMBERS = document.querySelectorAll(".number");
const DECIMAL = document.querySelector(".decimal");
const CLEARBUTTON = document.querySelector("#c");
const ALLCLEARBUTTON = document.querySelector("#ac");
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
    mainScreenNumber = 0;
    updateMainScreen(mainScreenNumber);
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

NUMBERS.forEach((number) => {
  number.addEventListener("click", (e) => {
    mainScreenNumber += e.target.textContent;
    updateMainScreen(mainScreenNumber);
  });
});

DECIMAL.addEventListener("click", addDecimal);
CLEARBUTTON.addEventListener("click", removeLastNumber);

ALLCLEARBUTTON.addEventListener("click", clear);
