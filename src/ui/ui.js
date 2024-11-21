import { Calculator } from '../calculator/calculator';
import { handleOperation } from '../calculator/handleOperation';
import { buttons } from '../model/buttons';

const calculatorContainer = document.createElement('div');
calculatorContainer.className = 'calculator-container';

const calculatorDisplay = document.createElement('div');
calculatorDisplay.className = 'calculator-display';

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

const updateDisplay = (value) => {
  if (!currentValue) {
    currentValue = '';
  }
  currentValue += value;
  calculatorDisplay.textContent = currentValue;
};

const handleButtonClick = ({ operation, value }) => {
  if (operation) {
    handleOperationButtonClick(operation);
  } else if (value) {
    if (value === '.' && isAlreadyFloating) {
      return;
    }
    if (value === '.') {
      if (!currentValue) {
        return;
      }
      isAlreadyFloating = true;
    }
    updateDisplay(value);
  }
};

const handleOperationButtonClick = (operation) => {
  if (currentValue) {
    calculator.setCurrentValue(parseFloat(currentValue));
  }

  handleOperation(operation, calculator);

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
      'memoryRecall',
    ].includes(operation)
  ) {
    calculatorDisplay.textContent = calculator.previousValue;
    calculator.setCurrentValue(calculator.previousValue);
    calculator.setPreviousValue(0);
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
    handleButtonClick({ operation, value }),
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
