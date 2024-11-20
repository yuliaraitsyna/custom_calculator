export const buttons = [
  { icon: '(', value: '(', operation: null, type: 'complex' },
  { icon: ')', value: ')', operation: null, type: 'complex' },
  { icon: 'mc', value: null, operation: 'memoryClear', type: 'complex' },
  { icon: 'm+', value: null, operation: 'memoryAdd', type: 'complex' },
  { icon: 'm-', value: null, operation: 'memorySubtract', type: 'complex' },
  { icon: 'mr', value: null, operation: 'memoryRecall', type: 'complex' },

  { icon: '2nd', value: null, operation: null, type: 'complex' },
  { icon: 'x²', value: null, operation: 'square', type: 'complex' },
  { icon: 'x³', value: null, operation: 'cube', type: 'complex' },
  { icon: 'xʸ', value: null, operation: 'power', type: 'complex' },
  { icon: 'eˣ', value: null, operation: null, type: 'complex' },
  { icon: '10ˣ', value: null, operation: 'tenPower', type: 'complex' },

  { icon: '1/x', value: null, operation: 'reciprocal', type: 'complex' },
  { icon: '²√x', value: null, operation: 'squareRoot', type: 'complex' },
  { icon: '³√x', value: null, operation: 'cubeRoot', type: 'complex' },
  { icon: 'ʸ√x', value: null, operation: 'nthRoot', type: 'complex' },
  { icon: 'ln', value: null, operation: null, type: 'complex' },
  { icon: 'log₁₀', value: null, operation: null, type: 'complex' },

  { icon: 'x!', value: null, operation: 'factorial', type: 'complex' },
  { icon: 'sin', value: null, operation: null, type: 'complex' },
  { icon: 'cos', value: null, operation: null, type: 'complex' },
  { icon: 'tan', value: null, operation: null, type: 'complex' },
  { icon: 'e', value: 2.7183, operation: null, type: 'complex' },
  { icon: 'EE', value: null, operation: null, type: 'complex' },

  { icon: 'Rad', value: null, operation: null, type: 'complex' },
  { icon: 'sinh', value: null, operation: null, type: 'complex' },
  { icon: 'cosh', value: null, operation: null, type: 'complex' },
  { icon: 'tanh', value: null, operation: null, type: 'complex' },
  { icon: 'π', value: 3.141592653589793, operation: null, type: 'complex' },
  { icon: 'Rand', value: null, operation: 'random', type: 'complex' },

  { icon: 'AC', value: null, operation: 'clear', type: 'basic' },
  { icon: '+/-', value: null, operation: 'negate', type: 'basic' },
  { icon: '%', value: null, operation: 'percent', type: 'basic' },
  { icon: '÷', value: null, operation: 'divide', type: 'basic' },
  { icon: '7', value: '7', operation: null, type: 'basic' },
  { icon: '8', value: '8', operation: null, type: 'basic' },
  { icon: '9', value: '9', operation: null, type: 'basic' },
  { icon: '×', value: null, operation: 'multiply', type: 'basic' },
  { icon: '4', value: '4', operation: null, type: 'basic' },
  { icon: '5', value: '5', operation: null, type: 'basic' },
  { icon: '6', value: '6', operation: null, type: 'basic' },
  { icon: '-', value: null, operation: 'subtract', type: 'basic' },
  { icon: '1', value: '1', operation: null, type: 'basic' },
  { icon: '2', value: '2', operation: null, type: 'basic' },
  { icon: '3', value: '3', operation: null, type: 'basic' },
  { icon: '+', value: null, operation: 'add', type: 'basic' },
  { icon: '0', value: '0', operation: null, type: 'basic' },
  { icon: '.', value: '.', operation: null, type: 'basic' },
  { icon: '=', value: null, operation: 'equal', type: 'basic' },
];
