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
          'value is out of bounds',
        )),
    );
    expect(
      () =>
        (calculator.calculator.currentValue = Number.MIN_VALUE.toThrowError(
          'value is out of bounds',
        )),
    );
  });

  it('should throw exception when setting large previous value', () => {
    expect(() =>
      calculator.currentValue.toThrowError('value is out of bounds'),
    );
    expect(
      () =>
        (calculator.calculator.currentValue = Number.MAX_VALUE.toThrowError(
          'value is out of bounds',
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
    calculator.operation = new Add(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(8);
  });

  test('if it adds two negative numbers correctly', () => {
    calculator.currentValue = -5;
    calculator.operation = new Add(-3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-8);
  });

  test('if it adds two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.operation = new Add(3.3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(8.8);
  });

  test('if it adds a negative and a positive number correctly', () => {
    calculator.currentValue = -5;
    calculator.operation = new Add(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-2);
  });

  it('should throw exception when getting large results on addition', () => {
    calculator.currentValue = Number.MAX_VALUE - 70;
    calculator.operation = new Add(70);
    expect(() =>
      calculator
        .execute(calculator.operation)
        .toThrowError('value is out of bounds'),
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
    calculator.operation = new Subtract(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.currentValue = -5;
    calculator.operation = new Subtract(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-8);
  });

  test('if it subtracts two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.operation = new Subtract(3.3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(2.2);
  });

  test('if it subtracts a negative number from a positive number correctly', () => {
    calculator.currentValue = 5;
    calculator.operation = new Subtract(-3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(8);
  });

  it('should throw exception when getting large results on subtraction', () => {
    calculator.currentValue = Number.MIN_VALUE + 70;
    calculator.operation = new Subtract(-70);
    expect(() =>
      calculator
        .execute(calculator.operation)
        .toThrowError('value is out of bounds'),
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
    calculator.operation = new Multiply(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(15);
  });

  test('if it multiplies a negative number and a positive number correctly', () => {
    calculator.currentValue = -2;
    calculator.operation = new Multiply(6);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-12);
  });

  test('if it multiplies two negative numbers correctly', () => {
    calculator.currentValue = -5;
    calculator.operation = new Multiply(-3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(15);
  });

  test('if it multiplies two floating point numbers correctly', () => {
    calculator.currentValue = 5.5;
    calculator.operation = new Multiply(3.3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(5.5 * 3.3);
  });

  test('if it multiplies a floating point number and a negative number correctly', () => {
    calculator.currentValue = 5.5;
    calculator.operation = new Multiply(-2);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-11);
  });

  it('should throw exception when getting large results on multiplication', () => {
    calculator.currentValue = Number.MIN_VALUE + 1;
    calculator.operation = new Multiply(10);
    expect(() =>
      calculator
        .execute(calculator.operation)
        .toThrowError('value is out of bounds'),
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
    calculator.operation = new Divide(3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(2);
  });

  test('if it divides a negative number and a positive number correctly', () => {
    calculator.currentValue = -2;
    calculator.operation = new Divide(6);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-2 / 6);
  });

  test('if it divides two negative numbers correctly', () => {
    calculator.currentValue = -6;
    calculator.operation = new Divide(-3);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(2);
  });

  test('if it divides a floating point number and a negative number correctly', () => {
    calculator.currentValue = 2.5;
    calculator.operation = new Divide(-10);
    calculator.execute(calculator.operation);
    expect(calculator.currentValue).toBe(-0.25);
  });

  it('should throw an exception when division by 0', () => {
    calculator.currentValue = 10;
    calculator.operation = new Divide(0);
    expect(() =>
      calculator.execute(calculator.operation).toThrowError('division by 0'),
    );
  });

  it('should throw exception when getting large results on division', () => {
    calculator.currentValue = 0.5;
    calculator.operation = new Divide(Number.MAX_VALUE);
    expect(() =>
      calculator
        .execute(calculator.operation)
        .toThrowError('value is out of bounds'),
    );
  });
});

describe('Percent tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates percentage from a positive number', () => {
    calculator.currentValue = 10;
    calculator.execute(new Percent());
    expect(calculator.currentValue).toBe(0.1);
  });

  test('if it calculates percentage from a negative number', () => {
    calculator.currentValue = -10;
    calculator.execute(new Percent());
    expect(calculator.currentValue).toBe(-0.1);
  });
});

describe('Square tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the square of a positive number', () => {
    calculator.currentValue = 3;
    calculator.execute(new Square());
    expect(calculator.currentValue).toBe(9);
  });

  test('if it calculates the square of a negative number', () => {
    calculator.currentValue = -3;
    calculator.execute(new Square());
    expect(calculator.currentValue).toBe(9);
  });

  it('should throw exception when getting large results on square', () => {
    calculator.currentValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator.execute(new Square()).toThrowError('value is out of bounds'),
    );
  });
});

describe('Cube tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the cube of a positive number', () => {
    calculator.currentValue = 3;
    calculator.execute(new Cube());
    expect(calculator.currentValue).toBe(27);
  });

  test('if it calculates the cube of a negative number', () => {
    calculator.currentValue = -3;
    calculator.execute(new Cube());
    expect(calculator.currentValue).toBe(-27);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.currentValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator.execute(new Cube()).toThrowError('value is out of bounds'),
    );
  });
});

describe('Power tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the power of a positive number', () => {
    calculator.currentValue = 2;
    calculator.execute(new Power(4));
    expect(calculator.currentValue).toBe(16);
  });

  test('if it calculates the power of a negative number', () => {
    calculator.currentValue = -3;
    calculator.execute(new Power(3));
    expect(calculator.currentValue).toBe(-27);
  });

  test('if it calculates the power of a positive number with floating power', () => {
    calculator.currentValue = 9;
    calculator.execute(new Power(0.5));
    expect(calculator.currentValue).toBe(3);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.currentValue = -4;
    expect(() =>
      calculator
        .execute(new Power(0.5))
        .toThrowError('impossible to take even root of negative number'),
    );
  });

  it('should throw exception when getting large results on power', () => {
    calculator.currentValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator.execute(new Power(4)).toThrowError('value is out of bounds'),
    );
  });
});

describe('Ten power tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates ten in a positive power', () => {
    calculator.currentValue = 3;
    calculator.execute(new TenPower());
    expect(calculator.currentValue).toBe(1000);
  });

  test('if it calculates ten in a negative power', () => {
    calculator.currentValue = -3;
    calculator.execute(new TenPower());
    expect(calculator.currentValue).toBe(0.001);
  });

  it('should throw exception when getting large results on cube', () => {
    calculator.currentValue = Number.MAX_VALUE - 1;
    expect(() =>
      calculator.execute(new TenPower()).toThrowError('value is out of bounds'),
    );
  });
});

describe('Square root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the square root of a positive number', () => {
    calculator.currentValue = 9;
    calculator.execute(new SquareRoot());
    expect(calculator.currentValue).toBe(3);
  });

  test('if it calculates the square root of a floating point number', () => {
    calculator.currentValue = 9.6;
    calculator.execute(new SquareRoot());
    expect(calculator.currentValue).toBeCloseTo(3.098);
  });

  it('should throw exception when taking square root of a negative number', () => {
    calculator.currentValue = -9;
    expect(() =>
      calculator
        .execute(new SquareRoot())
        .toThrowError('square root of a negative number'),
    );
  });
});

describe('Cube root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the cube root of a positive number', () => {
    calculator.currentValue = 27;
    calculator.execute(new CubeRoot());
    expect(calculator.currentValue).toBe(3);
  });

  test('if it calculates the cube root of a negative number', () => {
    calculator.currentValue = -27;
    calculator.execute(new CubeRoot());
    expect(calculator.currentValue).toBe(-3);
  });

  test('if it calculates the cube root of a floating point number', () => {
    calculator.currentValue = 0.001;
    calculator.execute(new CubeRoot());
    expect(calculator.currentValue).toBeCloseTo(0.1);
  });
});

describe('Nth root tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the nth root of a positive number', () => {
    calculator.currentValue = 16;
    calculator.execute(new NthRoot(4));
    expect(calculator.currentValue).toBe(2);
  });

  test('if it calculates the nth root of a negative number', () => {
    calculator.currentValue = -8;
    calculator.execute(new NthRoot(3));
    expect(calculator.currentValue).toBe(-2);
  });

  test('if it calculates the nth root of a floating point number', () => {
    calculator.currentValue = 0.001;
    calculator.execute(new NthRoot(3));
    expect(calculator.currentValue).toBeCloseTo(0.1);
  });

  it('should throw exception when taking even root of negative number', () => {
    calculator.currentValue = -8;
    expect(() =>
      calculator
        .execute(new NthRoot(2))
        .toThrowError('impossible to take even root of negative number'),
    );
  });

  it('should throw exception when taking 0th root', () => {
    calculator.currentValue = 16;
    expect(() =>
      calculator.execute(new NthRoot(0)).toThrowError("can't take 0th root"),
    );
  });

  it('should throw exception when taking negative root of negative even number', () => {
    calculator.currentValue = -16;
    expect(() =>
      calculator
        .execute(new NthRoot(-2))
        .toThrowError('impossible to take negative root of negative number'),
    );
  });
});

describe('Divide by N tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the reciprocal of a positive number', () => {
    calculator.currentValue = 4;
    calculator.execute(new DivideByN());
    expect(calculator.currentValue).toBe(0.25);
  });

  test('if it calculates the reciprocal of a negative number', () => {
    calculator.currentValue = -4;
    calculator.execute(new DivideByN());
    expect(calculator.currentValue).toBe(-0.25);
  });

  it('should throw exception when dividing by 0', () => {
    calculator.currentValue = 0;
    expect(() =>
      calculator.execute(new DivideByN()).toThrowError('Division by 0'),
    );
  });
});

describe('Factorial tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it calculates the factorial of a positive number', () => {
    calculator.currentValue = 5;
    calculator.execute(new Factorial());
    expect(calculator.currentValue).toBe(120);
  });

  test('if it calculates the factorial of 0', () => {
    calculator.currentValue = 0;
    calculator.execute(new Factorial());
    expect(calculator.currentValue).toBe(1);
  });

  it('should throw exception when calculating factorial of a negative number', () => {
    calculator.currentValue = -5;
    expect(() =>
      calculator
        .execute(new Factorial())
        .toThrowError("can't calculate factorial of a negative number"),
    );
  });

  it('should throw exception when calculating factorial of a floating point number', () => {
    calculator.currentValue = 5.5;
    expect(() =>
      calculator
        .execute(new Factorial())
        .toThrowError("can't calculate factorial of a floating point number"),
    );
  });
});

describe('Random number tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it generates random number', () => {
    calculator.execute(new Random());
    expect(calculator.currentValue).toBeGreaterThanOrEqual(0);
    expect(calculator.currentValue).toBeLessThan(1);
  });
});

describe('Negate tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it negates a positive number', () => {
    calculator.currentValue = 5;
    calculator.execute(new Negate());
    expect(calculator.currentValue).toBe(-5);
  });

  test('if it negates a negative number', () => {
    calculator.currentValue = -5;
    calculator.execute(new Negate());
    expect(calculator.currentValue).toBe(5);
  });
});

describe('Clear tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it clears the calculator', () => {
    calculator.currentValue = 5;
    calculator.clear();
    expect(calculator.currentValue).toBe(0);
  });
});

describe('Memory tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('if it clears the memory', () => {
    calculator.execute(new MemoryClear());
    expect(calculator.memory.length).toBe(0);
  });

  test('if it adds a number to the memory', () => {
    calculator.currentValue = 5;
    calculator.execute(new MemoryAdd());
    expect(calculator.memory[0]).toBe(5);
  });

  test('if it subtracts a number from the memory', () => {
    calculator.memory = [5];
    calculator.execute(new MemorySubtract());
    expect(calculator.memory.indexOf(calculator.currentValue)).toBe(-1);
  });

  test('if it recalls a number from the memory', () => {
    calculator.memory = [5];
    calculator.execute(new MemoryRecall());
    expect(calculator.currentValue).toBe(5);
  });

  it('should throw exception when memory is empty', () => {
    calculator.memory = [];
    expect(() =>
      calculator.execute(new MemorySubtract()).toThrowError('memory is empty'),
    );
    expect(() =>
      calculator.execute(new MemoryRecall()).toThrowError('memory is empty'),
    );
  });

  it('should throw exception when memory is overflown', () => {
    calculator.memory = new Array(Number.MAX_SAFE_INTEGER - 1, 0);
    expect(() =>
      calculator.execute(new MemoryAdd()).toThrowError('memory is overflown'),
    );
  });
});
