const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

const ROUNDING = 1e12;

class Calculator {
  constructor() {
    this.previousValue = 0;
    this.currentValue = 0;
    this.history = [];
    this.operation = null;
  }

  executeOperation(operation) {
    this.previousValue = operation.execute(this);
    this.currentValue = 0;
  }

  setCurrentValue(value) {
    try {
      if (!isValid(value)) {
        throw new Error('Error: value is out of bounds');
      }
      this.currentValue = value;
    } catch (error) {
      console.error(error);
    }
  }

  setPreviousValue(value) {
    try {
      if (!isValid(value)) {
        throw new Error('Error: value is out of bounds');
      }
      this.previousValue = value;
    } catch (error) {
      console.error(error);
    }
  }

  setOperation(operation) {
    this.operation = operation;
  }

  clearCalculator() {
    this.currentValue = 0;
    this.previousValue = 0;
    this.operation = null;
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

    return previousValue ** (1 / 3);
  }
}

class NthRoot extends Operation {
  execute({ previousValue, currentValue }) {
    if (currentValue === 0) {
      throw new Error("Error: can't take 0th root");
    } else if (previousValue < 0 && currentValue % 2 === 0) {
      throw new Error('Error: impossible to take even root of negative number');
    }

    return previousValue ** (1 / currentValue);
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
    calculator.history.push(calculator.previousValue);
  }
}

class MemorySubtract {
  execute(calculator) {
    calculator.history.length--;
  }
}

class MemoryRecall {
  execute(calculator) {
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
