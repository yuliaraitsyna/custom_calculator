import { describe, test, expect, beforeEach, it } from '@jest/globals';
import { Calculator, Add, Subtract, Multiply, Divide } from '../calculator';

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
