import { Calculator } from '../calculator/calculator';
import { buttons } from '../model/buttons';

const calculatorContainer = document.createElement('div');
calculatorContainer.className = 'calculator-container';

const calculatorDisplay = document.createElement('div');
calculatorDisplay.className = 'calculator-display';

const undoButton = document.createElement('button');
undoButton.textContent = 'Undo';
undoButton.id = 'undo-btn';

document.body.appendChild(undoButton);
document.body.appendChild(calculatorContainer);

calculatorContainer.appendChild(calculatorDisplay);

const basicCalculatorContainer = document.createElement('div');
basicCalculatorContainer.className = 'basic-calculator-container';

const complexOperationsContainer = document.createElement('div');
complexOperationsContainer.className = 'complex-operations-container';

calculatorContainer.appendChild(complexOperationsContainer);
calculatorContainer.appendChild(basicCalculatorContainer);

const calculator = new Calculator();

let currentValue = '';
let isAlreadyFloating = false;
let currentCommand = null;

calculatorDisplay.textContent = currentValue;

const resetCalculator = () => {
  calculator.clear();
  currentValue = '';
  currentCommand = null;
  isAlreadyFloating = false;
  calculatorDisplay.textContent = currentValue;
};

const executeEqual = () => {
  if (currentCommand && currentValue) {
    const value = parseFloat(currentValue);
    console.log('value: ', value);
    const command = currentCommand(value);
    console.log(command);
    calculator.execute(command);
    currentValue = calculator.currentValue.toString();
    isAlreadyFloating = currentValue.includes('.');
    calculatorDisplay.textContent = currentValue;
  }
};

undoButton.addEventListener('click', () => {
  calculator.undo();
  currentValue = calculator.currentValue.toString() || '0';
  isAlreadyFloating = currentValue.includes('.');
  calculatorDisplay.textContent = currentValue;
});

const updateDisplay = (value, icon) => {
  if (!currentValue) {
    currentValue = '';
  }

  if (['e', 'π'].includes(icon)) {
    currentValue = value;
  } else {
    currentValue += value;
  }
  calculatorDisplay.textContent = currentValue;
};

const handleOperation = (operation) => {
  if (typeof operation === 'function') {
    calculator.currentValue = parseFloat(currentValue);
    currentValue = '';
    calculatorDisplay.textContent = currentValue;
    currentCommand = operation;
    isAlreadyFloating = false;

    if (!operation.length) {
      const command = currentCommand();
      calculator.execute(command);
      currentValue = calculator.currentValue.toString();
      isAlreadyFloating = currentValue.includes('.');
      calculatorDisplay.textContent = currentValue;
      return;
    }
  }

  switch (operation) {
    case 'clear':
      resetCalculator();
      break;
    case 'equal':
      executeEqual();
      break;
    default:
      break;
  }
};

const handleValue = (value, icon) => {
  if (['e', 'π'].includes(icon)) {
    isAlreadyFloating = true;
    currentValue = value;
  }

  if (value === '.' && isAlreadyFloating) {
    return;
  }

  if (value === '.') {
    if (!currentValue) {
      return;
    }
    isAlreadyFloating = true;
  }

  updateDisplay(value, icon);
};

const handleButtonClick = ({ operation, value, icon }) => {
  if (operation) {
    handleOperation(operation);
  } else if (value || icon) {
    handleValue(value, icon);
  }
};

export const buttonsCollection = buttons.map((button) => {
  const { icon, operation, type, value } = button;

  const buttonElement = document.createElement('button');
  buttonElement.textContent = icon;
  buttonElement.className = `${type}-btn`;

  if (!operation && !value) {
    buttonElement.className += ' disabled';
  }

  buttonElement.addEventListener('click', () =>
    handleButtonClick({ operation, value, icon }),
  );

  if (icon === '0') {
    buttonElement.className += ' big';
  }

  switch (type) {
    case 'complex':
      complexOperationsContainer.appendChild(buttonElement);
      break;
    case 'basic':
      if (operation && !['clear', 'negate', 'percent'].includes(operation)) {
        buttonElement.className += ' operation';
      } else if (operation) {
        buttonElement.className += ' upper';
      }
      basicCalculatorContainer.appendChild(buttonElement);
      break;
    default:
      break;
  }

  return buttonElement;
});
