const MAINSCREEN = document.querySelector(".main");
const NUMBERS = document.querySelectorAll(".number");
const DECIMAL = document.querySelector(".decimal");
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

NUMBERS.forEach((number) => {
  number.addEventListener("click", (e) => {
    mainScreenNumber += e.target.textContent;
    updateMainScreen(mainScreenNumber);
  });
});

DECIMAL.addEventListener("click", addDecimal);
