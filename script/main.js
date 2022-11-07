/* buttons reference */
const CLEAR = document.querySelector("#btn-all-clear");
const DEL = document.querySelector("#btn-delete");
const EQUAL = document.querySelector("#btn-equals");
const DOT = document.querySelector("#btn-dot");
const OPERATORS = document.querySelectorAll(".operator");
const NUMBERS = document.querySelectorAll(".number");

/* display fields references */
const EQUATION = document.querySelector("#dis-equation");
const ANS = document.querySelector("#dis-ans");

/* main variables */
let currentValue = "";
let previousValue = "";
let operator = "";

/* this function always run */
setInterval(() => {
  if (ANS.textContent.length <= 0) {
    ANS.textContent = "0";
    currentValue = "";
    previousValue = "";
  }
}, 1000);

/* Collection Of Functions */
// clears the input fields
function clearTheFields() {
  ANS.textContent = "0";
  EQUATION.textContent = "0";

  // setting the variables value back to blank
  currentValue = "";
  previousValue = "";
  operator = "";
}
// deletes the value one by one
function eraseAns() {
  if (ANS.textContent.length > 0) {
    ANS.textContent = ANS.textContent.slice(0, [ANS.textContent.length - 1]);
    currentValue = ANS.textContent;
    // console.log(ANS.textContent);
    // console.log(ANS.textContent.length);

    // previousValue = currentValue;
  }
}
// handles clicks of number buttons
function parseNumber(evnt) {
  let btnContent = evnt.target.textContent;

  // limits entered values to 10characters
  if (currentValue.length < 11) {
    currentValue += btnContent;
    ANS.textContent = currentValue;
  }
}
// handles clicks of operator buttons
function parseOperator(evnt) {
  let btnContent = evnt.target.textContent;

  operator = btnContent;
  EQUATION.textContent = `${currentValue} ${operator}`;
  previousValue = currentValue;
  currentValue = "";
}
// all the calculations are handled here
/* BUG */
// when you already got a ans of a calculation and try to do some more arithematic operations, the equation value is not updating correctly, I'm trying to  figure out what is going wrong; not sure that I'll be able to fix it
function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
    ANS.textContent = previousValue;
  } else if (operator === "%") {
    ANS.textContent = previousValue / 100;
  } else if (operator === "-") {
    previousValue -= currentValue;
    ANS.textContent = previousValue;
  } else if (operator === "/") {
    previousValue /= currentValue;
    previousValue = roundNumber(previousValue);
    ANS.textContent = previousValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
    ANS.textContent = previousValue;
  }
}
// limits the decimal places
function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}
// adds a decimal  to the input only when no decimal is present
function parseDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    ANS.textContent = currentValue;
  }
}

/* adding addEventListner to the buttons */
NUMBERS.forEach((number) => number.addEventListener("click", parseNumber));

OPERATORS.forEach((oper) => oper.addEventListener("click", parseOperator));

CLEAR.addEventListener("click", clearTheFields);

EQUAL.addEventListener("click", calculate);

DEL.addEventListener("click", eraseAns);

DOT.addEventListener("click", parseDecimal);
