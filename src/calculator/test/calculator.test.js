import { describe, test, expect, beforeEach } from '@jest/globals';
import { Calculator, Add } from '../calculator';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should add two numbers correctly', () => {
    calculator.setCurrentValue(5);
    calculator.setPreviousValue(3);
    calculator.setOperation(new Add());
    calculator.executeOperation(calculator.operation);
    expect(calculator.previousValue).toBe(8);
  });
});
