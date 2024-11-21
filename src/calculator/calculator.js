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
    try {
      let result =
        (previousValue * ROUNDING + currentValue * ROUNDING) / ROUNDING;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

class Subtract extends Operation {
  execute({ previousValue, currentValue }) {
    try {
      let result =
        (previousValue * ROUNDING - currentValue * ROUNDING) / ROUNDING;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Multiply extends Operation {
  execute({ previousValue, currentValue }) {
    try {
      let result = previousValue * currentValue;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Divide extends Operation {
  execute({ previousValue, currentValue }) {
    try {
      if (this.divisionValue === 0) {
        throw new Error('Error: division by 0');
      }

      let result = previousValue / currentValue;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Square extends Operation {
  execute({ base }) {
    let result = base ** 2;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Cube extends Operation {
  execute({ base }) {
    let result = base ** 3;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Power extends Operation {
  execute({ previousValue, currentValue }) {
    try {
      let result = previousValue ** currentValue;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class TenPower extends Operation {
  execute({ value }) {
    try {
      let result = 10 ** value;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class SquareRoot extends Operation {
  execute({ value }) {
    if (value < 0) {
      throw new Error('Error: square root of a negative number');
    }

    if (!isValid(value)) {
      throw new Error('Error: value is out of bounds');
    }

    return value ** 0.5;
  }
}

class CubeRoot extends Operation {
  execute({ value }) {
    if (!isValid(value)) {
      throw new Error('Error: value is out of bounds');
    }

    return value ** (1 / 3);
  }
}

class NthRoot extends Operation {
  execute({ base, root }) {
    if (root === 0) {
      throw new Error("Error: can't take 0th root");
    } else if (base < 0 && root % 2 === 0) {
      throw new Error('Error: impossible to take even root of negative number');
    }

    return base ** (1 / root);
  }
}

class Percent extends Operation {
  execute({ value }) {
    try {
      let result = value / 100;

      if (!isValid(result)) {
        throw new Error('Error: value is out of bounds');
      }

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Negate extends Operation {
  execute({ value }) {
    return -value;
  }
}

class DivideByN extends Operation {
  execute({ value }) {
    try {
      if (value === 0) {
        throw new Error("Error: can't divide by 0");
      }
      return 1 / value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Factorial extends Operation {
  execute({ value }) {
    try {
      if (!isValid(value)) {
        throw new Error('Error: value is out of bounds');
      }

      if (value - parseInt(value) !== 0) {
        throw new Error('Error: value is not an integer');
      }

      if (value < 0) {
        throw new Error('Error: factorial of a negative number is undefined');
      }

      if (value === 0 || value === 1) {
        return 1;
      }

      return value * this.execute(value - 1);
    } catch (error) {
      console.error(error);
      return null;
    }
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
    calculator.previousValue =
      calculator.history[calculator.history.length - 1];
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
  MemoryClear,
  MemoryAdd,
  MemorySubtract,
  MemoryRecall,
  Clear,
};
