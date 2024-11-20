const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

const ROUNDING = 1e12;

class Calculator {
  constructor() {
    this.currentValue = 0;
    this.previousValue = 0;
    this.history = [];
    this.operation = null;
  }

  executeOperation(operation) {
    this.previousValue = operation.execute(
      this.previousValue,
      this.currentValue,
    );

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
}

class Add {
  execute(previousValue, currentValue) {
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

class Subtract {
  execute(previousValue, currentValue) {
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

class Multiply {
  execute(previousValue, currentValue) {
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

class Divide {
  execute(previousValue, currentValue) {
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

class Square {
  execute(base) {
    let result = base ** 2;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Cube {
  execute(base) {
    let result = base ** 3;

    if (!isValid(result)) {
      throw new Error('Error: value is out of bounds');
    }

    return result;
  }
}

class Power {
  execute(previousValue, currentValue) {
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

class TenPower {
  execute(currentValue) {
    try {
      let result = 10 ** currentValue;

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

class SquareRoot {
  execute(currentValue) {
    if (currentValue < 0) {
      throw new Error('Error: square root of a negative number');
    }

    if (!isValid(currentValue)) {
      throw new Error('Error: value is out of bounds');
    }

    return currentValue ** 0.5;
  }
}

class CubeRoot {
  execute(currentValue) {
    if (!isValid(currentValue)) {
      throw new Error('Error: value is out of bounds');
    }

    return currentValue ** (1 / 3);
  }
}

class NthRoot {
  execute(base, root) {
    if (root === 0) {
      throw new Error("Error: can't take 0th root");
    } else if (base < 0 && root % 2 === 0) {
      throw new Error('Error: impossible to take even root of negative number');
    }

    return base ** (1 / root);
  }
}

class Percent {
  execute(currentValue) {
    try {
      let result = currentValue / 100;

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

class Negate {
  execute(currentValue) {
    return -currentValue;
  }
}

class DivideByN {
  execute(currentValue) {
    try {
      if (currentValue === 0) {
        throw new Error("Error: can't divide by 0");
      }
      return 1 / currentValue;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Factorial {
  execute(currentValue) {
    try {
      if (!isValid(currentValue)) {
        throw new Error('Error: value is out of bounds');
      }

      if (currentValue - parseInt(currentValue) !== 0) {
        throw new Error('Error: value is not an integer');
      }

      if (currentValue < 0) {
        throw new Error('Error: factorial of a negative number is undefined');
      }

      if (currentValue === 0 || currentValue === 1) {
        return 1;
      }

      return currentValue * this.execute(currentValue - 1);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

class Clear {
  execute() {
    this.currentValue = 0;
    this.previousValue = 0;
    this.history = [];
    this.operation = null;
    this.isFloat = false;
    return null;
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
  Clear,
};
