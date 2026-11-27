#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Operações suportadas (conforme a imagem js-calculator.png e a issue #2):
 *   - addition        (+)  : soma dois números
 *   - subtraction     (-)  : subtrai o segundo número do primeiro
 *   - multiplication  (*)  : multiplica dois números
 *   - division        (/)  : divide o primeiro número pelo segundo
 *   - modulo          (%)  : resto da divisão do primeiro pelo segundo
 *   - power           (^)  : base elevada ao expoente
 *   - square root     (sqrt): raiz quadrada de um número (um operando)
 *
 * Uso:
 *   node src/calculator.js <operação> <a> <b>
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 3   # 12
 *   node src/calculator.js divide 8 2     # 4
 *   node src/calculator.js modulo 10 3    # 1
 *   node src/calculator.js power 2 8      # 256
 *   node src/calculator.js sqrt 16        # 4
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

// Modulo: resto de a / b (módulo por zero não é permitido)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Power: base elevada a exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root: raiz quadrada de n (números negativos não são permitidos)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(n);
}

const operations = {
  add: add, '+': add,
  subtract: subtract, '-': subtract,
  multiply: multiply, '*': multiply, x: multiply,
  divide: divide, '/': divide,
  modulo: modulo, '%': modulo,
  power: power, '^': power,
};

// Operações que recebem apenas um operando
const unaryOperations = {
  sqrt: squareRoot,
};

function main(args) {
  const [op, rawA, rawB] = args;
  const unary = unaryOperations[op];
  const fn = unary || operations[op];
  const a = Number(rawA);
  const b = Number(rawB);
  const expectedArgs = unary ? 2 : 3;

  if (!fn || args.length !== expectedArgs || Number.isNaN(a) || (!unary && Number.isNaN(b))) {
    console.error('Uso: node src/calculator.js <add|subtract|multiply|divide|modulo|power> <a> <b>');
    console.error('     node src/calculator.js sqrt <n>');
    process.exit(1);
  }

  try {
    console.log(unary ? fn(a) : fn(a, b));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
