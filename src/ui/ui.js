import { Calculator } from '../calculator/calculator';
import { handleOperation } from '../calculator/handleOperation';
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

let currentValue = 0;
let isAlreadyFloating = false;

calculatorDisplay.textContent = currentValue;

undoButton.addEventListener('click', () => {
  calculator.undoOperation();
  calculatorDisplay.textContent = calculator.previousValue;
  currentValue = calculator.previousValue;
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

const handleButtonClick = ({ operation, value, icon }) => {
  if (operation) {
    handleOperationButtonClick(operation);
  } else if (value || icon) {
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
  }
};

const handleOperationButtonClick = (operation) => {
  if (currentValue) {
    calculator.currentValue = parseFloat(currentValue);
  }

  if (!handleOperation(operation, calculator, calculatorDisplay)) {
    calculatorDisplay.textContent = 'Error';
    currentValue = 0;
    isAlreadyFloating = false;

    calculator.clearCalculator();
    return;
  }

  if (['memoryAdd', 'clear'].includes(operation)) {
    calculatorDisplay.textContent = 0;
  } else if (
    [
      'equal',
      'percent',
      'negate',
      'square',
      'cube',
      'squareRoot',
      'cubeRoot',
      'tenPower',
      'reciprocal',
      'factorial',
      'random',
      'memoryRecall',
    ].includes(operation)
  ) {
    calculatorDisplay.textContent = calculator.previousValue;
    calculator.currentValue = calculator.previousValue;
    calculator.previousValue = 0;
  }

  currentValue = 0;
  isAlreadyFloating = false;
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
