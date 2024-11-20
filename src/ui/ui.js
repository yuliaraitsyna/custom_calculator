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

let currentValue = '';
let isAlreadyFloating = false;

const calculator = new Calculator();

const updateDisplay = (value) => {
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

  if (['equal', 'clear'].includes(operation)) {
    calculatorDisplay.textContent = calculator.previousValue;
  }

  currentValue = '';
  isAlreadyFloating = false;
};

export const buttonsCollection = buttons.map((button) => {
  const { icon, operation, type, value } = button;

  const buttonElement = document.createElement('button');
  buttonElement.textContent = icon;
  buttonElement.className = `${type}-btn`;

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
