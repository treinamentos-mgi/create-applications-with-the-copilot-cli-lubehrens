#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Operações suportadas (conforme a imagem js-calculator.png e a issue #2):
 *   - addition        (+)  : soma dois números
 *   - subtraction     (-)  : subtrai o segundo número do primeiro
 *   - multiplication  (*)  : multiplica dois números
 *   - division        (/)  : divide o primeiro número pelo segundo
 *
 * Uso:
 *   node src/calculator.js <operação> <a> <b>
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 3   # 12
 *   node src/calculator.js divide 8 2     # 4
 *
 * Os símbolos +, -, x (ou *) e / também são aceitos como operação.
 */

// Addition: a + b
function add(a, b) {
  return a + b;
}

// Subtraction: a - b
function subtract(a, b) {
  return a - b;
}

// Multiplication: a * b
function multiply(a, b) {
  return a * b;
}

// Division: a / b (divisão por zero não é permitida)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  add: add, '+': add,
  subtract: subtract, '-': subtract,
  multiply: multiply, '*': multiply, x: multiply,
  divide: divide, '/': divide,
};

function main(args) {
  const [op, rawA, rawB] = args;
  const fn = operations[op];
  const a = Number(rawA);
  const b = Number(rawB);

  if (!fn || args.length !== 3 || Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide> <a> <b>');
    process.exit(1);
  }

  try {
    console.log(fn(a, b));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide };
