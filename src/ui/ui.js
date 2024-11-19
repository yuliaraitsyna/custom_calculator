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

const updateDisplay = (value) => {
  calculatorDisplay.textContent += value;
};

const handleButtonClick = (buttonValue) => {
  updateDisplay(buttonValue);
};

buttons.forEach(({ icon, value, operation, type }) => {
  const button = document.createElement('button');
  button.textContent = icon;
  button.className = `${type}-btn`;

  if (value) {
    button.addEventListener('click', () => handleButtonClick(value));
  }

  if (icon === '0') {
    button.className += ' big';
  }

  switch (type) {
    case 'complex':
      complexOperationsContainer.appendChild(button);
      break;
    case 'basic':
      if (
        operation &&
        operation != 'clear' &&
        operation != 'negate' &&
        operation != 'percent'
      ) {
        button.className += ' operation';
      } else if (
        operation &&
        !(
          operation != 'clear' &&
          operation != 'negate' &&
          operation != 'percent'
        )
      ) {
        button.className += ' upper';
      }
      basicCalculatorContainer.appendChild(button);
      break;
    default:
      break;
  }
});
