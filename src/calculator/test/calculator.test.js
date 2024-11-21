import { describe, test, expect, beforeEach } from '@jest/globals';
import { Calculator, Add, Subtract, Multiply, Divide } from '../calculator';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should throw exception when setting large current value', () => {
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

  test('should throw exception when setting large previous value', () => {
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

  test('should add two numbers correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('should subtract two numbers correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  test('should multiply two numbers correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('should divide two numbers correctly', () => {
    calculator.setCurrentValue(6);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('should add two negative numbers correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  test('should subtract a negative number from a positive number correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });

  test('should divide a negative number and a positive number correctly', () => {
    calculator.setCurrentValue(-2);
    calculator.setPreviousValue(6);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-3);
  });

  test('should multiply a negative number and a positive number correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-15);
  });

  test('should multiply two negative numbers correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(15);
  });

  test('should divide two negative numbers correctly', () => {
    calculator.setCurrentValue(-6);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(0.5);
  });

  test('should add two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8.8);
  });

  test('should subtract two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2.2);
  });

  test('should multiply two floating point numbers correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(3.3);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(5.5 * 3.3);
  });

  test('should add a negative and a positive number correctly', () => {
    calculator.setCurrentValue(-5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-2);
  });

  test('should subtract a negative number from a positive number correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-8);
  });

  test('should add a floating point and a negative number correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(-3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(2.5);
  });

  test('should subtract a floating point number from a negative number correctly', () => {
    calculator.setCurrentValue(-5.5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Subtract());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8.5);
  });

  test('should multiply a floating point number and a negative number correctly', () => {
    calculator.setCurrentValue(5.5);
    calculator.setPreviousValue(-2);
    calculator.setOperation(new Multiply());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-11);
  });

  test('should divide a floating point number and a negative number correctly', () => {
    calculator.setCurrentValue(2.5);
    calculator.setPreviousValue(-10);
    calculator.setOperation(new Divide());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(-4);
  });

  test('should throw an exception when division by 0', () => {
    calculator.setCurrentValue(10);
    calculator.setPreviousValue(0);
    calculator.setOperation(new Divide());
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Division by 0'),
    );
  });

  test('should throw exception when getting large results on addition', () => {
    calculator.setCurrentValue(Number.MAX_VALUE - 70);
    calculator.setPreviousValue(70);
    calculator.setOperation(new Add());
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });

  test('should throw exception when getting large results on subtraction', () => {
    calculator.setCurrentValue(Number.MIN_VALUE + 70);
    calculator.setPreviousValue(-70);
    calculator.setOperation(new Subtract());
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Error: value is out of bounds'),
    );
  });

  test('should throw exception when getting large results on subtraction', () => {
    calculator.setCurrentValue(0.5);
    calculator.setPreviousValue(Number.MIN_VALUE - 1);
    calculator.setOperation(new Divide());
    expect(() =>
      calculator
        .executeOperation(calculator.operation)
        .toThrowError('Value is out of bounds'),
    );
  });
});
