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
    expect(() =>
      calculator.calculator
        .setCurrentValue(Number.MAX_VALUE)
        .toThrowError('Error: value is out of bounds'),
    );
    expect(() =>
      calculator.calculator
        .setCurrentValue(Number.MIN_VALUE)
        .toThrowError('Error: value is out of bounds'),
    );
  });

  it('should throw exception when setting large previous value', () => {
    expect(() =>
      calculator.calculator
        .setPreviousValue(Number.MAX_VALUE)
        .toThrowError('Error: value is out of bounds'),
    );
    expect(() =>
      calculator.calculator
        .setPreviousValue(Number.MAX_VALUE)
        .toThrowError('Error: value is out of bounds'),
    );
  });
});

describe('Addition tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it adds two numbers correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('if it adds two negative numbers correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  test('if it adds two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8.8);
  });

  test('if it adds a negative and a positive number correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  it('should throw exception when getting large results on addition', () => {
    calculator.setCurrentValue(Number.MAX_VALUE - 70);
    calculator.setPreviousValue(70);
    calculator.setOperation(new Add());
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
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('if it subtracts two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2.2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  it('should throw exception when getting large results on subtraction', () => {
    calculator.setCurrentValue(Number.MIN_VALUE + 70);
    calculator.setPreviousValue(-70);
    calculator.setOperation(new Subtract());
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
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('if it multiplies a negative number and a positive number correctly', () => {
    calculator.setCurrentValue(-2);
    calculator.setPreviousValue(6);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-12);
  });

  test('if it multiplies two negative numbers correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('if it multiplies two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(5.5 * 3.3);
  });

  test('if it multiplies a floating point number and a negative number correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(-2);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-11);
  });

  it('should throw exception when getting large results on multiplication', () => {
    calculator.setCurrentValue(Number.MIN_VALUE + 1);
    calculator.setPreviousValue(10);
    calculator.setOperation(new Multiply());
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
    calculator.setCurrentValue(6);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('if it divides a negative number and a positive number correctly', () => {
    calculator.setCurrentValue(-2);
    calculator.setPreviousValue(6);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-3);
  });

  test('if it divides two negative numbers correctly', () => {
    calculator.setCurrentValue(-6);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('if it divides a floating point number and a negative number correctly', () => {
    calculator.setCurrentValue(2.5);
    calculator.setPreviousValue(-10);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-4);
  });

  it('should throw an exception when division by 0', () => {
    calculator.setCurrentValue(10);
    calculator.setPreviousValue(0);
    calculator.setOperation(new Divide());
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Division by 0'),
    );
  });

  it('should throw exception when getting large results on division', () => {
    calculator.setCurrentValue(0.5);
    calculator.setPreviousValue(Number.MAX_VALUE);
    calculator.setOperation(new Divide());
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
    calculator.setPreviousValue(10);
    calculator.executeOperation(new Percent());
    expect(calculator.previousValue).toBe(0.1);
  });

  test('if it calculates percentage from a negative number', () => {
    calculator.setPreviousValue(-10);
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
    calculator.setPreviousValue(3);
    calculator.executeOperation(new Square());
    expect(calculator.previousValue).toBe(9);
  });

  test('if it calculates the square of a negative number', () => {
    calculator.setPreviousValue(-3);
    calculator.executeOperation(new Square());
    expect(calculator.previousValue).toBe(9);
  });

  it('should throw exception when getting large results on square', () => {
    calculator.setPreviousValue(Number.MAX_VALUE - 1);
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
    calculator.setPreviousValue(3);
    calculator.executeOperation(new Cube());
    expect(calculator.previousValue).toBe(27);
  });

  test('if it calculates the cube of a negative number', () => {
    calculator.setPreviousValue(-3);
    calculator.executeOperation(new Cube());
    expect(calculator.previousValue).toBe(-27);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.setPreviousValue(Number.MAX_VALUE - 1);
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
    calculator.setPreviousValue(2);
    calculator.setCurrentValue(4);
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(16);
  });

  test('if it calculates the power of a negative number', () => {
    calculator.setPreviousValue(-3);
    calculator.setCurrentValue(3);
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(-27);
  });

  test('if it calculates the power of a positive number with floating power', () => {
    calculator.setPreviousValue(9);
    calculator.setCurrentValue(0.5);
    calculator.executeOperation(new Power());
    expect(calculator.previousValue).toBe(3);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.setPreviousValue(-4);
    calculator.setCurrentValue(0.5);
    expect(() =>
      calculator
        .executeOperation(new Power())
        .toThrowError('Error: impossible to take even root of negative number'),
    );
  });

  it('should throw exception when getting large results on power', () => {
    calculator.setPreviousValue(Number.MAX_VALUE - 1);
    calculator.setCurrentValue(4);
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
    calculator.setPreviousValue(3);
    calculator.executeOperation(new TenPower());
    expect(calculator.previousValue).toBe(1000);
  });

  test('if it calculates ten in a negative power', () => {
    calculator.setPreviousValue(-3);
    calculator.executeOperation(new TenPower());
    expect(calculator.previousValue).toBe(0.001);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.setPreviousValue(Number.MAX_VALUE - 1);
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
    calculator.setPreviousValue(9);
    calculator.executeOperation(new SquareRoot());
    expect(calculator.previousValue).toBe(3);
  });

  test('if it calculates the square root of a floating point number', () => {
    calculator.setPreviousValue(9.6);
    calculator.executeOperation(new SquareRoot());
    expect(calculator.previousValue).toBeCloseTo(3.098);
  });

  it('should throw exception when taking square root of a negative number', () => {
    calculator.setPreviousValue(-9);
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
    calculator.setPreviousValue(27);
    calculator.executeOperation(new CubeRoot());
    expect(calculator.previousValue).toBe(3);
  });

  test('if it calculates the cube root of a negative number', () => {
    calculator.setPreviousValue(-27);
    calculator.executeOperation(new CubeRoot());
    expect(calculator.previousValue).toBe(-3);
  });

  test('if it calculates the cube root of a floating point number', () => {
    calculator.setPreviousValue(0.001);
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
    calculator.setPreviousValue(16);
    calculator.setCurrentValue(4);
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBe(2);
  });

  test('if it calculates the nth root of a negative number', () => {
    calculator.setPreviousValue(-8);
    calculator.setCurrentValue(3);
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBe(-2);
  });

  test('if it calculates the nth root of a floating point number', () => {
    calculator.setPreviousValue(0.001);
    calculator.setCurrentValue(3);
    calculator.executeOperation(new NthRoot());
    expect(calculator.previousValue).toBeCloseTo(0.1);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.setPreviousValue(-8);
    calculator.setCurrentValue(2);
    expect(() =>
      calculator
        .executeOperation(new NthRoot())
        .toThrowError('Error: impossible to take even root of negative number'),
    );
  });

  it('should throw exception when taking 0th root', () => {
    calculator.setPreviousValue(16);
    calculator.setCurrentValue(0);
    expect(() =>
      calculator
        .executeOperation(new NthRoot())
        .toThrowError("Error: can't take 0th root"),
    );
  });

  it('should throw exception when taking negative root of negative even number', () => {
    calculator.setPreviousValue(-16);
    calculator.setCurrentValue(-2);
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
    calculator.setPreviousValue(4);
    calculator.executeOperation(new DivideByN());
    expect(calculator.previousValue).toBe(0.25);
  });

  test('if it calculates the reciprocal of a negative number', () => {
    calculator.setPreviousValue(-4);
    calculator.executeOperation(new DivideByN());
    expect(calculator.previousValue).toBe(-0.25);
  });

  it('should throw exception when dividing by 0', () => {
    calculator.setPreviousValue(0);
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
    calculator.setPreviousValue(5);
    calculator.executeOperation(new Factorial());
    expect(calculator.previousValue).toBe(120);
  });

  test('if it calculates the factorial of 0', () => {
    calculator.setPreviousValue(0);
    calculator.executeOperation(new Factorial());
    expect(calculator.previousValue).toBe(1);
  });

  it('should throw exception when calculating factorial of a negative number', () => {
    calculator.setPreviousValue(-5);
    expect(() =>
      calculator
        .executeOperation(new Factorial())
        .toThrowError("Error: can't calculate factorial of a negative number"),
    );
  });

  it('should throw exception when calculating factorial of a floating point number', () => {
    calculator.setPreviousValue(5.5);
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
    calculator.setPreviousValue(5);
    calculator.executeOperation(new Negate());
    expect(calculator.previousValue).toBe(-5);
  });

  test('if it negates a negative number', () => {
    calculator.setPreviousValue(-5);
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
    calculator.setPreviousValue(5);
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
    calculator.setPreviousValue(5);
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
