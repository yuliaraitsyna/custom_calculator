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

const handleErrorState = (error) => {
  currentValue = '';
  calculatorDisplay.textContent = 'Error';

  console.error(error);
};

const resetCalculator = () => {
  calculator.clear();

  currentValue = '';
  currentCommand = null;
  isAlreadyFloating = false;
  calculatorDisplay.textContent = '';
};

const executeEqual = () => {
  try {
    if (currentCommand && currentValue) {
      const value = parseFloat(currentValue);
      const command = currentCommand(value);

      calculator.execute(command);

      calculatorDisplay.textContent +=
        ' = ' + calculator.currentValue.toString();

      currentValue = calculator.currentValue.toString();

      isAlreadyFloating = false;
      currentCommand = null;
    }
  } catch (error) {
    handleErrorState(error);
  }
};

undoButton.addEventListener('click', () => {
  try {
    calculator.undo();

    currentValue = calculator.currentValue.toString() || '0';
    isAlreadyFloating = currentValue.includes('.');
    calculatorDisplay.textContent = currentValue;
  } catch (error) {
    handleErrorState(error);
  }
});

const handleOperation = ({ operation, icon }) => {
  try {
    if (typeof operation === 'function') {
      if (!currentCommand && currentValue) {
        calculator.currentValue = parseFloat(currentValue);
      }

      if (calculatorDisplay.textContent.includes('=')) {
        calculatorDisplay.textContent = calculator.currentValue.toString();
      }

      if (currentValue) {
        switch (icon) {
          case 'ʸ√x':
            calculatorDisplay.textContent += ` √ `;
            break;
          case 'xʸ':
            calculatorDisplay.textContent += ` ^ `;
            break;
          default:
            calculatorDisplay.textContent += ` ${icon} `;
        }
      }

      if (currentCommand && currentValue) {
        const value = parseFloat(currentValue);
        const command = currentCommand(value);
        calculator.execute(command);
      }

      currentValue = '';
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
  } catch (error) {
    handleErrorState(error);
  }
};

const handleValue = (value, icon) => {
  if (['e', 'π'].includes(icon)) {
    resetCalculator();

    isAlreadyFloating = true;
    currentValue = value;
    calculator.currentValue = parseFloat(value);
    calculatorDisplay.textContent = value;

    return;
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

  if (calculatorDisplay.textContent.includes('=')) {
    calculatorDisplay.textContent = '';
  }

  currentValue += value;
  calculatorDisplay.textContent += value.toString();
};

const handleButtonClick = ({ operation, value, icon }) => {
  if (operation) {
    handleOperation({ operation, icon });
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
