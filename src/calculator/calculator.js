const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

class Calculator {
  constructor() {
    this.currentValue = null;
    this.previousValue = null;
    this.history = [];
    this.operation = null;
    this.isFloat = false;
  }

  executeOperation(operation) {
    console.log('P, C', this.previousValue, this.currentValue);
    this.previousValue = operation.execute(
      this.previousValue,
      this.currentValue,
    );
    this.currentValue = null;
    //this.history.push(operation);
  }

  setCurrentValue(value) {
    this.currentValue = value;
  }

  setPreviousValue(value) {
    this.previousValue = value;
  }

  setOperation(operation) {
    this.operation = operation;
  }
}

class Add {
  constructor() {}

  execute(previousValue, currentValue) {
    try {
      console.log(previousValue, currentValue);
      let result = previousValue + currentValue;

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
  constructor(subtractionValue) {
    this.subtractionValue = subtractionValue;
  }

  execute(currentValue) {
    try {
      let result = currentValue - this.subtractionValue;

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
  constructor(multiplicationValue) {
    this.multiplicationValue = multiplicationValue;
  }

  execute(currentValue) {
    try {
      let result = currentValue * this.multiplicationValue;

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
  constructor(divisionValue) {
    this.divisionValue = divisionValue;
  }

  execute(currentValue) {
    try {
      if (this.divisionValue === 0) {
        throw new Error('Error: division by 0');
      }

      let result = currentValue / this.divisionValue;

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
  execute(currentValue) {
    if (!isValid(currentValue)) {
      throw new Error('Error: value is out of bounds');
    }
    return currentValue ** 2;
  }
}

class Cube {
  execute(currentValue) {
    if (!isValid(currentValue)) {
      throw new Error('Error: value is out of bounds');
    }
    return currentValue ** 3;
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
    return Math.sqrt(currentValue);
  }
}

class Percent {
  execute(currentValue) {
    try {
      if (!isValid(currentValue)) {
        throw new Error('Error: value is out of bounds');
      }
      return currentValue / 100;
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

class Clear {
  execute() {
    this.value = null;
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
  Percent,
  Negate,
  Clear,
};
