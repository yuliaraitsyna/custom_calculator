const isValid = (result) =>
  result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER;

const ROUNDING = 1e12;

class Calculator {
  constructor() {
    this.currentValue = 0;
    this.history = [];
  }

  execute(command) {
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
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    return currentValue + this.value;
  }

  undo(currentValue) {
    return currentValue - this.value;
  }
}

class Subtract extends Command {
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    return currentValue - this.value;
  }

  undo(currentValue) {
    return currentValue + this.value;
  }
}

class Multiply extends Command {
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    return currentValue * this.value;
  }

  undo(currentValue) {
    return currentValue / this.value;
  }
}

class Divide extends Command {
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    if (this.value === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return currentValue / this.value;
  }

  undo(currentValue) {
    return currentValue * this.value;
  }
}

class Square extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return currentValue ** 2;
  }
}

class Cube extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return currentValue ** 3;
  }
}

class Power extends Command {
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    if (this.value < 1 && this.value > 0 && currentValue < 0) {
      throw new Error('impossible to take even root of negative number');
    }

    return currentValue ** this.value;
  }
}

class TenPower extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return 10 ** currentValue;
  }
}

class SquareRoot extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    if (currentValue < 0) {
      throw new Error('square root of a negative number');
    }

    return currentValue ** 0.5;
  }
}

class CubeRoot extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return currentValue < 0
      ? -((-currentValue) ** (1 / 3))
      : currentValue ** (1 / 3);
  }
}

class NthRoot extends Command {
  constructor(value) {
    super();
    this.value = value;
  }

  execute(currentValue) {
    if (this.value === 0) {
      throw new Error("can't take the 0th root");
    }

    if (currentValue < 0 && this.value % 2 === 0) {
      throw new Error("can't take an even root of a negative number");
    }

    if (currentValue < 0 && this.value < 0) {
      throw new Error("can't take a negative root of a negative number");
    }

    const result =
      currentValue < 0
        ? -((-currentValue) ** (1 / this.value))
        : currentValue ** (1 / this.value);

    return result;
  }
}

class Percent extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return currentValue / 100;
  }
}

class Negate extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    return -currentValue;
  }
}

class DivideByN extends Command {
  constructor() {
    super();
  }

  execute(currentValue) {
    if (currentValue === 0) {
      throw new Error("can't divide by 0");
    }
    return 1 / currentValue;
  }
}

class Factorial extends Command {
  constructor() {
    super();
  }

  #factorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    }

    return n * this.#factorial(n - 1);
  };

  execute(currentValue) {
    if (currentValue - parseInt(currentValue !== 0)) {
      throw new Error('value is not an integer');
    }

    if (currentValue < 0) {
      throw new Error('factorial of a negative number is undefined');
    }

    return this.#factorial(currentValue);
  }
}

class Random extends Command {
  constructor() {
    super();
  }

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
