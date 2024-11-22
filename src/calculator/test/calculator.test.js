import { describe, test, expect, beforeEach, it } from '@jest/globals';
import {
  Calculator,
  Add,
  Subtract,
  Multiply,
  Divide,
  Square,
  Cube,
  SquareRoot,
  CubeRoot,
  NthRoot,
  Percent,
  Negate,
  Power,
  TenPower,
  DivideByN,
  Factorial,
  Random,
  Clear,
  MemoryAdd,
  MemoryClear,
  MemoryRecall,
  MemorySubtract,
} from '../calculator';

describe('Calculator tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should throw exception when setting large current value', () => {
    expect(
      () =>
        (calculator.calculator.currentValue = Number.MAX_VALUE.toThrowError(
          'Error: value is out of bounds',
        )),
    );
    expect(
      () =>
        (calculator.calculator.currentValue = Number.MIN_VALUE.toThrowError(
          'Error: value is out of bounds',
        )),
    );
  });

  it('should throw exception when setting large previous value', () => {
    expect(() =>
      calculator.previousValue.toThrowError('Error: value is out of bounds'),
    );
    expect(
      () =>
        (calculator.calculator.previousValue = Number.MAX_VALUE.toThrowError(
          'Error: value is out of bounds',
        )),
    );
  });
});

describe('Addition tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it adds two numbers correctly', () => {
    calculator.currentValue = 5;
    calculator.previousValue = 3;
    calculator.operation = new Add();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('if it adds two negative numbers correctly', () => {
    calculator.currentValue = -5;
    calculator.previousValue = -3;
    calculator.operation = new Add();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  test('if it adds two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.previousValue = 3.3;
    calculator.operation = new Add();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8.8);
  });

  test('if it adds a negative and a positive number correctly', () => {
    calculator.currentValue = -5;
    calculator.previousValue = 3;
    calculator.operation = new Add();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  it('should throw exception when getting large results on addition', () => {
    calculator.currentValue = Number.MAX_VALUE - 70;
    calculator.previousValue = 70;
    calculator.operation = new Add();
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Subtraction tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it subtracts two numbers correctly', () => {
    calculator.currentValue = 5;
    calculator.previousValue = 3;
    calculator.operation = new Subtract();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.currentValue = -5;
    calculator.previousValue = 3;
    calculator.operation = new Subtract();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('if it subtracts two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.previousValue = 3.3;
    calculator.operation = new Subtract();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2.2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.currentValue = 5;
    calculator.previousValue = -3;
    calculator.operation = new Subtract();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  it('should throw exception when getting large results on subtraction', () => {
    calculator.currentValue = Number.MIN_VALUE + 70;
    calculator.previousValue = -70;
    calculator.operation = new Subtract();
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Multiplication tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it multiplies two numbers correctly', () => {
    calculator.currentValue = 5;
    calculator.previousValue = 3;
    calculator.operation = new Multiply();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('if it multiplies a negative number and a positive number correctly', () => {
    calculator.currentValue = -2;
    calculator.previousValue = 6;
    calculator.operation = new Multiply();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-12);
  });

  test('if it multiplies two negative numbers correctly', () => {
    calculator.currentValue = -5;
    calculator.previousValue = -3;
    calculator.operation = new Multiply();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('if it multiplies two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.previousValue = 3.3;
    calculator.operation = new Multiply();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(5.5 * 3.3);
  });

  test('if it multiplies a floating point number and a negative number correctly', () => {
    calculator.currentValue = 5.5;
    calculator.previousValue = -2;
    calculator.operation = new Multiply();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-11);
  });

  it('should throw exception when getting large results on multiplication', () => {
    calculator.currentValue = Number.MIN_VALUE + 1;
    calculator.previousValue = 10;
    calculator.operation = new Multiply();
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Division tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it divides two numbers correctly', () => {
    calculator.currentValue = 6;
    calculator.previousValue = 3;
    calculator.operation = new Divide();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('if it divides a negative number and a positive number correctly', () => {
    calculator.currentValue = -2;
    calculator.previousValue = 6;
    calculator.operation = new Divide();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-3);
  });

  test('if it divides two negative numbers correctly', () => {
    calculator.currentValue = -6;
    calculator.previousValue = -3;
    calculator.operation = new Divide();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('if it divides a floating point number and a negative number correctly', () => {
    calculator.currentValue = 2.5;
    calculator.previousValue = -10;
    calculator.operation = new Divide();
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-4);
  });

  it('should throw an exception when division by 0', () => {
    calculator.currentValue = 10;
    calculator.previousValue = 0;
    calculator.operation = new Divide();
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Division by 0'),
    );
  });

  it('should throw exception when getting large results on division', () => {
    calculator.currentValue = 0.5;
    calculator.previousValue = Number.MAX_VALUE;
    calculator.operation = new Divide();
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Percent tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates percentage from a positive number', () => {
    calculator.previousValue = 10;
    calculator.executeOperation(new Percent());
    expect(calculator.previousValue).toBe(0.1);
  });

  test('if it calculates percentage from a negative number', () => {
    calculator.previousValue = -10;
    calculator.executeOperation(new Percent());
    expect(calculator.previousValue).toBe(-0.1);
  });
});

describe('Square tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the square of a positive number', () => {
    calculator.previousValue = 3;
    calculator.executeOperation(new Square());
    expect(calculator.previousValue).toBe(9);
  });

  test('if it calculates the square of a negative number', () => {
    calculator.previousValue = -3;
    calculator.executeOperation(new Square());
    expect(calculator.previousValue).toBe(9);
  });

  it('should throw exception when getting large results on square', () => {
    calculator.previousValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator
        .executeOperation(new Square())
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Cube tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the cube of a positive number', () => {
    calculator.previousValue = 3;
    calculator.executeOperation(new Cube());
    expect(calculator.previousValue).toBe(27);
  });

  test('if it calculates the cube of a negative number', () => {
    calculator.previousValue = -3;
    calculator.executeOperation(new Cube());
    expect(calculator.previousValue).toBe(-27);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.previousValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator
        .executeOperation(new Cube())
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Power tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the power of a positive number', () => {
    calculator.previousValue = 2;
    calculator.currentValue = 4;
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(16);
  });

  test('if it calculates the power of a negative number', () => {
    calculator.previousValue = -3;
    calculator.currentValue = 3;
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(-27);
  });

  test('if it calculates the power of a positive number with floating power', () => {
    calculator.previousValue = 9;
    calculator.currentValue = 0.5;
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(3);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.previousValue = -4;
    calculator.currentValue = 0.5;
    expect(() =>
      calculator
        .executeOperation(new Power())
        .toThrowError('Error: impossible to take even root of negative number'),
    );
  });

  it('should throw exception when getting large results on power', () => {
    calculator.previousValue = Number.MAX_VALUE - 1;
    calculator.currentValue = 4;
    expect(() =>
      calculator
        .executeOperation(new Power())
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Ten power tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates ten in a positive power', () => {
    calculator.previousValue = 3;
    calculator.executeOperation(new TenPower());
    expect(calculator.previousValue).toBe(1000);
  });

  test('if it calculates ten in a negative power', () => {
    calculator.previousValue = -3;
    calculator.executeOperation(new TenPower());
    expect(calculator.previousValue).toBe(0.001);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.previousValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator
        .executeOperation(new TenPower())
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Square root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the square root of a positive number', () => {
    calculator.previousValue = 9;
    calculator.executeOperation(new SquareRoot());
    expect(calculator.previousValue).toBe(3);
  });

  test('if it calculates the square root of a floating point number', () => {
    calculator.previousValue = 9.6;
    calculator.executeOperation(new SquareRoot());
    expect(calculator.previousValue).toBeCloseTo(3.098);
  });

  it('should throw exception when taking square root of a negative number', () => {
    calculator.previousValue = -9;
    expect(() =>
      calculator
        .executeOperation(new SquareRoot())
        .toThrowError('Error: square root of a negative number'),
    );
  });
});

describe('Cube root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the cube root of a positive number', () => {
    calculator.previousValue = 27;
    calculator.executeOperation(new CubeRoot());
    expect(calculator.previousValue).toBe(3);
  });

  test('if it calculates the cube root of a negative number', () => {
    calculator.previousValue = -27;
    calculator.executeOperation(new CubeRoot());
    expect(calculator.previousValue).toBe(-3);
  });

  test('if it calculates the cube root of a floating point number', () => {
    calculator.previousValue = 0.001;
    calculator.executeOperation(new CubeRoot());
    expect(calculator.previousValue).toBeCloseTo(0.1);
  });
});

describe('Nth root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the nth root of a positive number', () => {
    calculator.previousValue = 16;
    calculator.currentValue = 4;
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBe(2);
  });

  test('if it calculates the nth root of a negative number', () => {
    calculator.previousValue = -8;
    calculator.currentValue = 3;
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBe(-2);
  });

  test('if it calculates the nth root of a floating point number', () => {
    calculator.previousValue = 0.001;
    calculator.currentValue = 3;
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBeCloseTo(0.1);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.previousValue = -8;
    calculator.currentValue = 2;
    expect(() =>
      calculator
        .executeOperation(new NthRoot())
        .toThrowError('Error: impossible to take even root of negative number'),
    );
  });

  it('should throw exception when taking 0th root', () => {
    calculator.previousValue = 16;
    calculator.currentValue = 0;
    expect(() =>
      calculator
        .executeOperation(new NthRoot())
        .toThrowError("Error: can't take 0th root"),
    );
  });

  it('should throw exception when taking negative root of negative even number', () => {
    calculator.previousValue = -16;
    calculator.currentValue = -2;
    expect(() =>
      calculator
        .executeOperation(new NthRoot())
        .toThrowError(
          'Error: impossible to take negative root of negative number',
        ),
    );
  });
});

describe('Divide by N tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the reciprocal of a positive number', () => {
    calculator.previousValue = 4;
    calculator.executeOperation(new DivideByN());
    expect(calculator.previousValue).toBe(0.25);
  });

  test('if it calculates the reciprocal of a negative number', () => {
    calculator.previousValue = -4;
    calculator.executeOperation(new DivideByN());
    expect(calculator.previousValue).toBe(-0.25);
  });

  it('should throw exception when dividing by 0', () => {
    calculator.previousValue = 0;
    expect(() =>
      calculator
        .executeOperation(new DivideByN())
        .toThrowError('Division by 0'),
    );
  });
});

describe('Factorial tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the factorial of a positive number', () => {
    calculator.previousValue = 5;
    calculator.executeOperation(new Factorial());
    expect(calculator.previousValue).toBe(120);
  });

  test('if it calculates the factorial of 0', () => {
    calculator.previousValue = 0;
    calculator.executeOperation(new Factorial());
    expect(calculator.previousValue).toBe(1);
  });

  it('should throw exception when calculating factorial of a negative number', () => {
    calculator.previousValue = -5;
    expect(() =>
      calculator
        .executeOperation(new Factorial())
        .toThrowError("Error: can't calculate factorial of a negative number"),
    );
  });

  it('should throw exception when calculating factorial of a floating point number', () => {
    calculator.previousValue = 5.5;
    expect(() =>
      calculator
        .executeOperation(new Factorial())
        .toThrowError(
          "Error: can't calculate factorial of a floating point number",
        ),
    );
  });
});

describe('Random number tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it generates random number', () => {
    calculator.executeOperation(new Random());
    expect(calculator.previousValue).toBeGreaterThanOrEqual(0);
    expect(calculator.previousValue).toBeLessThan(1);
  });
});

describe('Negate tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it negates a positive number', () => {
    calculator.previousValue = 5;
    calculator.executeOperation(new Negate());
    expect(calculator.previousValue).toBe(-5);
  });

  test('if it negates a negative number', () => {
    calculator.previousValue = -5;
    calculator.executeOperation(new Negate());
    expect(calculator.previousValue).toBe(5);
  });
});

describe('Clear tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it clears the calculator', () => {
    calculator.previousValue = 5;
    calculator.executeOperation(new Clear());
    expect(calculator.previousValue).toBe(0);
  });
});

describe('Memory tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it clears the memory', () => {
    calculator.executeOperation(new MemoryClear());
    expect(calculator.history.length).toBe(0);
  });

  test('if it adds a number to the memory', () => {
    calculator.previousValue = 5;
    calculator.executeOperation(new MemoryAdd());
    expect(calculator.history[0]).toBe(5);
  });

  test('if it subtracts a number from the memory', () => {
    calculator.history = [5];
    calculator.executeOperation(new MemorySubtract());
    expect(calculator.history.indexOf(calculator.previousValue)).toBe(-1);
  });

  test('if it recalls a number from the memory', () => {
    calculator.history = [5];
    calculator.executeOperation(new MemoryRecall());
    expect(calculator.previousValue).toBe(5);
  });

  it('should throw exception when memory is empty', () => {
    calculator.history = [];
    expect(() =>
      calculator
        .executeOperation(new MemorySubtract())
        .toThrowError('Error: memory is empty'),
    );
    expect(() =>
      calculator
        .executeOperation(new MemoryRecall())
        .toThrowError('Error: memory is empty'),
    );
  });

  it('should throw exception when memory is overflown', () => {
    calculator.history = new Array(Number.MAX_SAFE_INTEGER - 1, 0);
    expect(() =>
      calculator
        .executeOperation(new MemoryAdd())
        .toThrowError('Error: memory is overflown'),
    );
  });
});
