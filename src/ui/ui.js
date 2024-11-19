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

buttons.forEach(({ icon, operation, type }) => {
  const button = document.createElement('button');
  button.textContent = icon;
  button.className = `${type}-btn`;

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
