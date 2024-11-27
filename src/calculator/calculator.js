const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

const ROUNDING = 1e12;

class Calculator {
  constructor() {
    this.currentValue = 0;
    this.history = [];
  }

  execute(command) {
    console.log(command);
    let result = command.execute(this.currentValue);
    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }
    this.currentValue = result;
    this.history.push(command);
  }

  undo() {
    if (this.history.length === 0) return;
    const command = this.history.pop();
    this.currentValue = command.undo(this.currentValue);
  }

  clear() {
    this.currentValue = 0;
    this.history = [];
  }
}

class Command {
  constructor() {
    if (new.target === Command) {
      throw new Error(
        'Command is an abstract class and cannot be instantiated directly.',
      );
    }
  }
}

class Add extends Command {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  execute(currentValue) {
    return currentValue + this.amount;
  }

  undo(currentValue) {
    return currentValue - this.amount;
  }
}

class Subtract extends Command {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  execute(currentValue) {
    return currentValue - this.amount;
  }

  undo(currentValue) {
    return currentValue + this.amount;
  }
}

class Multiply extends Command {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  execute(currentValue) {
    return currentValue * this.amount;
  }

  undo(currentValue) {
    return currentValue / this.factor;
  }
}

class Divide extends Command {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  execute(currentValue) {
    if (this.amount === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return currentValue / this.amount;
  }

  undo(currentValue) {
    return currentValue * this.amount;
  }
}

class Square extends Command {
  execute({ previousValue }) {
    let result = previousValue ** 2;

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class Cube extends Command {
  execute({ previousValue }) {
    let result = previousValue ** 3;

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class Power extends Command {
  execute({ previousValue, currentValue }) {
    if (currentValue < 1 && currentValue > 0 && previousValue < 0) {
      throw new Error('impossible to take even root of negative number');
    }

    let result = previousValue ** currentValue;

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class TenPower extends Command {
  execute({ previousValue }) {
    let result = 10 ** previousValue;

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class SquareRoot extends Command {
  execute({ previousValue }) {
    if (previousValue < 0) {
      throw new Error('square root of a negative number');
    }

    if (!isValid(previousValue)) {
      throw new Error('value is out of bounds');
    }

    return previousValue ** 0.5;
  }
}

class CubeRoot extends Command {
  execute({ previousValue }) {
    if (!isValid(previousValue)) {
      throw new Error('value is out of bounds');
    }

    const result =
      previousValue < 0
        ? -((-previousValue) ** (1 / 3))
        : previousValue ** (1 / 3);

    return result;
  }
}

class NthRoot extends Command {
  execute({ previousValue, currentValue }) {
    if (currentValue === 0) {
      throw new Error("can't take the 0th root");
    }

    if (previousValue < 0 && currentValue % 2 === 0) {
      throw new Error("can't take an even root of a negative number");
    }

    if (previousValue < 0 && currentValue < 0) {
      throw new Error("can't take a negative root of a negative number");
    }

    const result =
      previousValue < 0
        ? -((-previousValue) ** (1 / currentValue))
        : previousValue ** (1 / currentValue);

    return result;
  }
}

class Percent extends Command {
  execute({ previousValue }) {
    let result = previousValue / 100;

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class Negate extends Command {
  execute({ previousValue }) {
    return -previousValue;
  }
}

class DivideByN extends Command {
  execute({ previousValue }) {
    if (previousValue === 0) {
      throw new Error("can't divide by 0");
    }
    return 1 / previousValue;
  }
}

class Factorial extends Command {
  #factorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    }

    return n * this.#factorial(n - 1);
  };

  execute({ previousValue }) {
    if (previousValue - parseInt(previousValue) !== 0) {
      throw new Error('value is not an integer');
    }

    if (previousValue < 0) {
      throw new Error('factorial of a negative number is undefined');
    }

    let result = this.#factorial(previousValue);

    if (!isValid(result)) {
      throw new Error('value is out of bounds');
    }

    return result;
  }
}

class Random extends Command {
  execute() {
    return (+new Date().getTime() % ROUNDING) / ROUNDING;
  }
}

class MemoryCommand {
  constructor() {
    if (new.target === MemoryCommand) {
      throw new TypeError('cannot construct MemoryCommand instances directly');
    }
  }

  execute() {
    throw new Error("method 'execute()' must be implemented.");
  }
}

class MemoryClear extends MemoryCommand {
  execute(calculator) {
    calculator.history.length = 0;
  }
}

class MemoryAdd extends MemoryCommand {
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
};
