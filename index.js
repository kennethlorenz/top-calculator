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
  if (MAINSCREEN.textContent == 0) {
    return;
  } else {
    mainScreenNumber += 0;
    updateMainScreen(mainScreenNumber);
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
    //get clicked operator
    operator = e.target.textContent;
    firstNumber = MAINSCREEN.textContent;
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator}`;
    mainScreenNumber = "";
  });
});

ZERO.addEventListener("click", addZero);
DECIMAL.addEventListener("click", addDecimal);
CLEARBUTTON.addEventListener("click", removeLastNumber);
ALLCLEARBUTTON.addEventListener("click", clear);
EQUAL.addEventListener("click", () => {
  if (mainScreenNumber == "") {
    return;
  } else {
    operate(parseFloat(firstNumber), parseFloat(mainScreenNumber), operator);
    //display answer in main screen
    MAINSCREEN.textContent = answer;
    //update secondary screen
    SECONDARYSCREEN.textContent = `${firstNumber} ${operator} ${mainScreenNumber} = `;

    //transfer the answer to first number
    firstNumber = answer;

    //reset mainScreenNumber
    mainScreenNumber = "";
    console.log(answer);
  }
});
