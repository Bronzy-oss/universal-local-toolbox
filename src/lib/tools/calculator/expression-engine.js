// Small, dependency-free expression tokenizer + recursive-descent
// parser/evaluator. Needed because a scientific calculator (functions,
// parentheses, exponents) can't be computed with simple left-to-right
// immediate math the way a basic 4-function calculator can — order of
// operations and grouping have to be resolved properly.
//
// Grammar (highest to lowest precedence):
//   primary   := NUMBER | CONSTANT | FUNCTION '(' expression ')' | '(' expression ')'
//   postfix   := primary ('!' | '%')*
//   unary     := '-' unary | postfix
//   power     := unary ('^' power)?      // right-associative
//   term      := power (('×' | '÷') power)*
//   expression:= term (('+' | '-') term)*

const FUNCTION_NAMES = ["sin", "cos", "tan", "log", "ln", "sqrt"];
const CONSTANTS = { "π": Math.PI, e: Math.E };

export function tokenize(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (/[0-9.]/.test(ch)) {
      let num = "";
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i];
        i++;
      }
      tokens.push({ type: "number", value: parseFloat(num) });
      continue;
    }

    if (ch === "π" || ch === "e") {
      tokens.push({ type: "number", value: CONSTANTS[ch] });
      i++;
      continue;
    }

    if ("+-×÷^()!%".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i++;
      continue;
    }

    const rest = input.slice(i);
    const fn = FUNCTION_NAMES.find((name) => rest.startsWith(name));
    if (fn) {
      tokens.push({ type: "func", value: fn });
      i += fn.length;
      continue;
    }

    throw new Error(`Unexpected character "${ch}"`);
  }
  return tokens;
}

export function evaluate(input, angleMode = "deg") {
  const tokens = tokenize(input);
  if (tokens.length === 0) throw new Error("Empty expression");

  let pos = 0;
  const peek = () => tokens[pos];
  const consume = () => tokens[pos++];
  const expectOp = (value) => {
    const t = peek();
    if (!t || t.value !== value) throw new Error(`Expected "${value}"`);
    consume();
  };

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");

    if (t.type === "number") {
      consume();
      return t.value;
    }
    if (t.type === "func") {
      consume();
      expectOp("(");
      const arg = parseExpression();
      expectOp(")");
      return applyFunction(t.value, arg, angleMode);
    }
    if (t.type === "op" && t.value === "(") {
      consume();
      const value = parseExpression();
      expectOp(")");
      return value;
    }
    throw new Error(`Unexpected "${t.value}"`);
  }

  function parsePostfix() {
    let value = parsePrimary();
    while (peek() && (peek().value === "!" || peek().value === "%")) {
      const op = consume().value;
      value = op === "!" ? factorial(value) : value / 100;
    }
    return value;
  }

  function parseUnary() {
    if (peek() && peek().value === "-") {
      consume();
      return -parseUnary();
    }
    return parsePostfix();
  }

  function parsePower() {
    const value = parseUnary();
    if (peek() && peek().value === "^") {
      consume();
      return Math.pow(value, parsePower()); // right-associative
    }
    return value;
  }

  function parseTerm() {
    let value = parsePower();
    while (peek() && (peek().value === "×" || peek().value === "÷")) {
      const op = consume().value;
      const rhs = parsePower();
      if (op === "×") value *= rhs;
      else {
        if (rhs === 0) throw new Error("Division by zero");
        value /= rhs;
      }
    }
    return value;
  }

  function parseExpression() {
    let value = parseTerm();
    while (peek() && (peek().value === "+" || peek().value === "-")) {
      const op = consume().value;
      const rhs = parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  const result = parseExpression();
  if (pos < tokens.length) {
    throw new Error(`Unexpected "${tokens[pos].value}"`);
  }
  if (!Number.isFinite(result)) {
    throw new Error("Result is not a finite number");
  }
  return result;
}

function applyFunction(name, arg, angleMode) {
  const inRadians = angleMode === "deg" ? (arg * Math.PI) / 180 : arg;
  switch (name) {
    case "sin":
      return Math.sin(inRadians);
    case "cos":
      return Math.cos(inRadians);
    case "tan":
      return Math.tan(inRadians);
    case "log":
      if (arg <= 0) throw new Error("log of a non-positive number");
      return Math.log10(arg);
    case "ln":
      if (arg <= 0) throw new Error("ln of a non-positive number");
      return Math.log(arg);
    case "sqrt":
      if (arg < 0) throw new Error("sqrt of a negative number");
      return Math.sqrt(arg);
    default:
      throw new Error(`Unknown function "${name}"`);
  }
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw new Error("! needs a non-negative whole number");
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
