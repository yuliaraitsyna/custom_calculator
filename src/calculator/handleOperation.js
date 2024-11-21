import {
  Add,
  Subtract,
  Multiply,
  Divide,
  Percent,
  Negate,
  Square,
  Cube,
  SquareRoot,
  CubeRoot,
  Power,
  TenPower,
  NthRoot,
  DivideByN,
  Factorial,
  Random,
  MemoryAdd,
  MemorySubtract,
  MemoryClear,
  MemoryRecall,
  Clear,
} from '../calculator/calculator';

export const handleOperation = (operation, calculator) => {
  if (!['equal', 'clear'].includes(operation)) {
    calculator.setPreviousValue(calculator.currentValue);
  }

  switch (operation) {
    case 'add':
      calculator.setOperation(new Add());
      break;
    case 'subtract':
      calculator.setOperation(new Subtract());
      break;
    case 'multiply':
      calculator.setOperation(new Multiply());
      break;
    case 'divide':
      calculator.setOperation(new Divide());
      break;
    case 'percent':
      calculator.executeOperation(new Percent());
      break;
    case 'negate':
      calculator.executeOperation(new Negate());
      break;
    case 'square':
      calculator.executeOperation(new Square());
      break;
    case 'cube':
      calculator.executeOperation(new Cube());
      break;
    case 'squareRoot':
      calculator.executeOperation(new SquareRoot());
      break;
    case 'cubeRoot':
      calculator.executeOperation(new CubeRoot());
      break;
    case 'power':
      calculator.setOperation(new Power());
      break;
    case 'tenPower':
      calculator.executeOperation(new TenPower());
      break;
    case 'nthRoot':
      calculator.setOperation(new NthRoot());
      break;
    case 'reciprocal':
      calculator.executeOperation(new DivideByN());
      break;
    case 'factorial':
      calculator.executeOperation(new Factorial());
      break;
    case 'random':
      calculator.executeOperation(new Random());
      break;
    case 'memoryClear':
      calculator.executeOperation(new MemoryClear());
      break;
    case 'memoryAdd':
      calculator.executeOperation(new MemoryAdd());
      break;
    case 'memorySubtract':
      calculator.executeOperation(new MemorySubtract());
      break;
    case 'memoryRecall':
      calculator.executeOperation(new MemoryRecall());
      break;
    case 'equal':
      if (!calculator.operation) {
        console.error('No operation set!');
        return;
      }
      calculator.executeOperation(calculator.operation);
      calculator.setOperation(null);
      break;
    case 'clear': {
      calculator.executeOperation(new Clear());
      break;
    }
    default:
      console.error('Unknown operation:', operation);
  }
};
