const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

class Calculator {
  constructor() {
    this.value = null;
    this.history = [];
    this.operation = null;
    this.isFloat = false;
  }

  executeOperation(operation) {
    this.value = operation.execute(this.value);
    this.history.push(operation);
  }
}

class Add {
  constructor(additionValue) {
    try {
      if (!isValid(additionValue)) {
        throw new Error('Error: value is out of bounds');
      }

      this.additionValue = additionValue;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  execute(currentValue) {
    try {
      let result = currentValue + this.additionValue;

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

class Subtract {
  constructor(subtractionValue) {
    try {
      if (!isValid(subtractionValue)) {
        throw new Error('Error: value is out of bounds');
      }

      this.subtractionValue = subtractionValue;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  execute(currentValue) {
    try {
      let result = currentValue + this.subtractionValue;

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
    try {
      if (!isValid(multiplicationValue)) {
        throw new Error('Error: value is out of bounds');
      }

      this.additionValue = multiplicationValue;
    } catch (error) {
      console.error(error);
      return null;
    }
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
      let result = currentValue / this.divisionValue;

      if (!currentValue || !this.divisionValue) {
        throw new Error('Error: division by 0');
      }

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

class TakePercent {
  execute(currentValue) {
    return currentValue / 100;
  }
}

class Negate {
  execute(currentValue) {
    return -currentValue;
  }
}

class Clear {
  execute() {
    return null;
  }
}

export {
  Calculator,
  Add,
  Subtract,
  Multiply,
  Divide,
  TakePercent,
  Negate,
  Clear,
};
