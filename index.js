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

function roundTo3rdDecimal(number) {
  return number.toFixed(3);
}

function hasDecimal(number) {
  return number % 1 !== 0;
}

NUMBERS.forEach((number) => {
  number.addEventListener("click", (e) => {
    //resets the secondary screen if the user hits equal sign
    //to start a new operation
    if (firstNumber == "" && answer == "") {
      SECONDARYSCREEN.textContent = "";
    }
    mainScreenNumber += e.target.textContent;
    updateMainScreen(mainScreenNumber);
  });
});

function performOperation(firstNumber, secondNumber, operator) {
  if (secondNumber == 0 && operator == "÷") {
    window.alert("You can't divide by 0, Please use a different number.");
    clear();
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

OPERATORS.forEach((op) => {
  op.addEventListener("click", (e) => {
    //this if statement runs if an operator is clicked and both first number value
    // and second number value (in this case mainScreenNumber) is present
    //It allows the user to evaluate the first 2 values of the numbers right away after pressing
    //another operator
    if (firstNumber !== "" && mainScreenNumber !== "") {
      performOperation(firstNumber, mainScreenNumber, operator);

      //get new operator
      operator = e.target.textContent;

      //transfer the answer to first number
      firstNumber = answer;

      //update secondary screen
      SECONDARYSCREEN.textContent = `${answer} ${operator}`;
    }
    //this else statement fires in the initial calculation
    else {
      //get current operator
      operator = e.target.textContent;

      //set firstnumber
      firstNumber = MAINSCREEN.textContent;

      //update secondary screen
      SECONDARYSCREEN.textContent = `${firstNumber} ${operator}`;

      //reset mainScreen number
      mainScreenNumber = "";
    }
  });
});

EQUAL.addEventListener("click", () => {
  if (mainScreenNumber == "") {
    return;
  } else {
    performOperation(firstNumber, mainScreenNumber, operator);

    //reset values so that the user can start a new operation from
    //scratch when pressing equal sign
    firstNumber = "";
    answer = "";
  }
});

ZERO.addEventListener("click", addZero);
DECIMAL.addEventListener("click", addDecimal);
CLEARBUTTON.addEventListener("click", removeLastNumber);
ALLCLEARBUTTON.addEventListener("click", clear);
