 
const add = (a,b) => a + b;

const subtract = (a,b) => a - b;

const multiply = (a,b) => a * b;

const divide = (a,b) => a / b;

const remainder = (a,b) => a % b;

const operate = (operator, a, b) => {
  return operator(parseFloat(a),parseFloat(b));
}

//maintain a variable for what to display on the screen;
let input = "0";

//A variable for storing the entered operator
let operation;

//A variable for storing the temp total
let tempTotal="0";


//A function for debugging which outputs the status of all variables we care about
const status = () => {
  console.log(tempTotal);
  console.log(operation);
  console.log(input);
  }


//A function to update the display
const updateScreen = (newScreen) => {
  newScreen = newScreen.toString();

  if (newScreen.length > 13) newScreen = newScreen.substring(0, 13);

  const screen = document.querySelector('#screen > p');
  screen.textContent=newScreen;
}
//update the display initially
updateScreen(input);




//make the numbers do things
const numbers = document.querySelectorAll('.number');
numbers.forEach((button) => { 
  button.addEventListener('click', () => {
    if (input == "0") input = "";
    if (input == tempTotal) input = "";
    if (button.id == "." && input.indexOf(".") !== -1) return;
    input = input + button.id;
    updateScreen(input);
  })
});

//a function for checking if the calculator is in its initial state
const initialState = (operator) => {
  if (operation == undefined) {
    if (operator) operation = operator;
    tempTotal = input;
    return true;
  }
}

//a function for executing an operation and setting operator value
const executeOperate = (operator) => {
  //handle dividing by zero
  if (operation == divide && input == 0) {
    reset();
    updateScreen("Math is hard");
  }

  input = operate(operation, tempTotal, input);
  tempTotal = input;
  //set operator and tempTotal depending on whether an operation was supplied;
  if (operator) {
    operation = operator
   } else {
    operation = undefined; 
    tempTotal = "0";
   } 
  updateScreen(input);
}

//a function for clearing the calculator's stored values
const reset = () => {
  input = "0";
  operation = undefined;
  tempTotal="0";
}



//make the add button do things
const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  if (initialState(add) == true) return;
  executeOperate(add);
})

//make the minus button do things
const subtractButton = document.querySelector('#subtract');
subtractButton.addEventListener('click', () => {
  if (initialState(subtract) == true) return;
  executeOperate(subtract);
})

//make the multiply button do things
const multiplyButton = document.querySelector('#multiply');
multiplyButton.addEventListener('click', () => {
  if (initialState(multiply) == true) return;
  executeOperate(multiply);
})

//make the divide button do things
const divideButton = document.querySelector('#divide');
divideButton.addEventListener('click', () => {
  if (initialState(divide) == true) return;
  executeOperate(divide);
})

//make the remainder button do things
const remainderButton = document.querySelector('#remainder');
remainderButton.addEventListener('click', () => {
  if (initialState(remainder) == true) return;
  executeOperate(remainder);
})

//make the equals button do things
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
  if (initialState() == true) return;
  executeOperate();
})

//make the AC button do things
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  reset();
  updateScreen(input);
})

//make the +/- button do things
const plusMinusButton = document.querySelector('#plusminus');
plusMinusButton.addEventListener('click', () => {
  if (input == 0) return;
  if(input.charAt(0) == "-") {
    input = input.substring(1,input.length)
  } else {
    input = "-" + input;
  };
  updateScreen(input);
})




