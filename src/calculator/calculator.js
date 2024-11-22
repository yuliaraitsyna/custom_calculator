const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

const ROUNDING = 1e12;

class Calculator {
  #previousValue;
  #currentValue;
  #undoStack;
  #history;
  #operation;

  constructor() {
    this.#previousValue = 0;
    this.#currentValue = 0;
    this.#history = [];
    this.#undoStack = [];
    this.#operation = null;
  }

  saveState() {
    this.#undoStack.push({
      previousValue: this.#previousValue,
      currentValue: this.#currentValue,
      operation: this.#operation,
    });
  }

  executeOperation(operation) {
    this.saveState();
    this.#previousValue = operation.execute(this);
    this.#currentValue = 0;
  }

  undoOperation() {
    if (this.#undoStack.length === 0) {
      return;
    }

    const { previousValue, currentValue, operation } = this.#undoStack.pop();

    this.#previousValue = previousValue;
    this.#currentValue = currentValue;
    this.#operation = operation;
  }

  set currentValue(value) {
    try {
      if (!isValid(value)) {
        throw new Error('Error: value is out of bounds');
      }
      this.#currentValue = value;
    } catch (error) {
      console.error(error);
    }
  }

  set previousValue(value) {
    try {
      if (!isValid(value)) {
        throw new Error('Error: value is out of bounds');
      }
      this.#previousValue = value;
    } catch (error) {
      console.error(error);
    }
  }

  set operation(operation) {
    this.#operation = operation;
  }

  set history(history) {
    this.#history = history;
  }

  get previousValue() {
    return this.#previousValue;
  }

  get currentValue() {
    return this.#currentValue;
  }

  get history() {
    return this.#history;
  }

  get operation() {
    return this.#operation;
  }

  clearCalculator() {
    this.#currentValue = 0;
    this.#previousValue = 0;
    this.#operation = null;
    this.#undoStack = [];
  }
}

class Operation {
  execute() {
    throw new Error("Method 'execute()' must be implemented.");
  }
}

class Add extends Operation {
  execute({ previousValue, currentValue }) {
    let result =
      (previousValue * ROUNDING + currentValue * ROUNDING) / ROUNDING;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Subtract extends Operation {
  execute({ previousValue, currentValue }) {
    let result =
      (previousValue * ROUNDING - currentValue * ROUNDING) / ROUNDING;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Multiply extends Operation {
  execute({ previousValue, currentValue }) {
    let result = previousValue * currentValue;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Divide extends Operation {
  execute({ previousValue, currentValue }) {
    if (currentValue === 0) {
      throw new Error('Division by 0');
    }

    let result = previousValue / currentValue;

    if (!isValid(result)) {
      throw new Error('Value is out of bounds');
    }

    return result;
  }
}

class Square extends Operation {
  execute({ previousValue }) {
    let result = previousValue ** 2;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Cube extends Operation {
  execute({ previousValue }) {
    let result = previousValue ** 3;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Power extends Operation {
  execute({ previousValue, currentValue }) {
    if (currentValue < 1 && currentValue > 0 && previousValue < 0) {
      throw new Error('Error: impossible to take even root of negative number');
    }

    let result = previousValue ** currentValue;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class TenPower extends Operation {
  execute({ previousValue }) {
    let result = 10 ** previousValue;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class SquareRoot extends Operation {
  execute({ previousValue }) {
    if (previousValue < 0) {
      throw new Error('Error: square root of a negative number');
    }

    if (!isValid(previousValue)) {
      throw new Error('Error: value is out of bounds');
    }

    return previousValue ** 0.5;
  }
}

class CubeRoot extends Operation {
  execute({ previousValue }) {
    if (!isValid(previousValue)) {
      throw new Error('Error: value is out of bounds');
    }

    const result =
      previousValue < 0
        ? -((-previousValue) ** (1 / 3))
        : previousValue ** (1 / 3);

    return result;
  }
}

class NthRoot extends Operation {
  execute({ previousValue, currentValue }) {
    if (currentValue === 0) {
      throw new Error("Error: Can't take the 0th root");
    }

    if (previousValue < 0 && currentValue % 2 === 0) {
      throw new Error("Error: Can't take an even root of a negative number");
    }

    if (previousValue < 0 && currentValue < 0) {
      throw new Error("Error: Can't take a negative root of a negative number");
    }

    const result =
      previousValue < 0
        ? -((-previousValue) ** (1 / currentValue))
        : previousValue ** (1 / currentValue);

    return result;
  }
}

class Percent extends Operation {
  execute({ previousValue }) {
    let result = previousValue / 100;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Negate extends Operation {
  execute({ previousValue }) {
    return -previousValue;
  }
}

class DivideByN extends Operation {
  execute({ previousValue }) {
    if (previousValue === 0) {
      throw new Error("Error: can't divide by 0");
    }
    return 1 / previousValue;
  }
}

class Factorial extends Operation {
  #factorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    }

    return n * this.#factorial(n - 1);
  };

  execute({ previousValue }) {
    if (previousValue - parseInt(previousValue) !== 0) {
      throw new Error('Error: value is not an integer');
    }

    if (previousValue < 0) {
      throw new Error('Error: factorial of a negative number is undefined');
    }

    let result = this.#factorial(previousValue);

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Random extends Operation {
  execute() {
    return (+new Date().getTime() % ROUNDING) / ROUNDING;
  }
}

class Clear extends Operation {
  execute(calculator) {
    calculator.clearCalculator();
    return 0;
  }
}

class MemoryOperation {
  constructor() {
    if (new.target === MemoryOperation) {
      throw new TypeError(
        'Cannot construct MemoryOperation instances directly',
      );
    }
  }

  execute() {
    throw new Error("Method 'execute()' must be implemented.");
  }
}

class MemoryClear extends MemoryOperation {
  execute(calculator) {
    calculator.history.length = 0;
  }
}

class MemoryAdd extends MemoryOperation {
  execute(calculator) {
    if (calculator.history.length >= Array.MAX_SAFE_INTEGER) {
      throw new Error('memory is overflown');
    }

    calculator.history.push(calculator.previousValue);
  }
}

class MemorySubtract {
  execute(calculator) {
    if (calculator.history.length === 0) {
      throw new Error('memory is empty');
    }

    calculator.history.length--;
  }
}

class MemoryRecall {
  execute(calculator) {
    if (calculator.history.length === 0) {
      throw new Error('memory is empty');
    }

    return calculator.history[calculator.history.length - 1];
  }
}

export {
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
  MemoryClear,
  MemoryAdd,
  MemorySubtract,
  MemoryRecall,
  Clear,
};
