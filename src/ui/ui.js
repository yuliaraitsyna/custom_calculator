import { Calculator } from '../calculator/calculator';
import { Add } from '../calculator/calculator';
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
const calculator = new Calculator();

const updateDisplay = (value) => {
  currentValue += value;
  calculatorDisplay.textContent = currentValue;
};

const handleButtonClick = ({ operation, value }) => {
  if (operation) {
    handleOperationButtonClick(operation);
  } else if (value !== undefined) {
    updateDisplay(value);
  }
};

const handleOperationButtonClick = (operation) => {
  if (currentValue) {
    calculator.setCurrentValue(parseFloat(currentValue));
  }

  switch (operation) {
    case 'add':
      calculator.setOperation(new Add());
      calculator.setPreviousValue(calculator.currentValue);
      currentValue = '';
      break;
    case 'equal':
      if (!calculator.operation) {
        console.error('No operation set!');
        return;
      }
      calculator.executeOperation(calculator.operation);
      calculatorDisplay.textContent = calculator.previousValue;
      currentValue = '';
      break;
    default:
      console.error('Unknown operation:', operation);
  }
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
