import { Add, Subtract, Multiply, Clear } from '../calculator/calculator';

export const handleOperation = (operation, calculator) => {
  switch (operation) {
    case 'add':
      calculator.setOperation(new Add());
      calculator.setPreviousValue(calculator.currentValue);
      break;
    case 'subtract':
      calculator.setOperation(new Subtract());
      calculator.setPreviousValue(calculator.currentValue);
      break;
    case 'multiply':
      calculator.setOperation(new Multiply());
      calculator.setPreviousValue(calculator.currentValue);
      break;
    case 'equal':
      if (!calculator.operation) {
        console.error('No operation set!');
        return;
      }

      calculator.executeOperation(calculator.operation);
      calculator.setOperation(null);
      break;
    case 'clear':
      calculator.executeOperation(new Clear());
      break;
    default:
      console.error('Unknown operation:', operation);
  }
};
