import { evaluate } from "./expression-engine.js";

const OPERATORS = ["+", "-", "×", "÷", "^"];

export function createInitialState() {
  return {
    expression: "",
    resultLine: "",
    isResult: false,
    isError: false,
    angleMode: "deg", // "deg" | "rad"
    mode: "basic", // "basic" | "scientific"
  };
}

// The big display: the live expression while typing, or the result
// right after "=". Formats digit runs with thousands separators for
// readability (matches the phone calculator reference).
export function getDisplay(state) {
  if (state.isError) return "Error";
  return formatForDisplay(state.expression || "0");
}

export function formatForDisplay(expr) {
  return expr.replace(/\d+\.?\d*/g, (match) => {
    const [intPart, decPart] = match.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart === undefined ? withCommas : `${withCommas}.${decPart}`;
  });
}

export function inputDigit(state, digit) {
  if (state.isResult || state.isError) {
    return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode, expression: digit };
  }
  return { ...state, expression: state.expression + digit };
}

export function inputDecimal(state) {
  if (state.isResult || state.isError) {
    return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode, expression: "0." };
  }
  // Only block a second "." within the current number segment.
  const segment = state.expression.split(/[+\-×÷^(),!%]/).pop() ?? "";
  if (segment.includes(".")) return state;
  if (state.expression === "" || /[+\-×÷^(]$/.test(state.expression)) {
    return { ...state, expression: state.expression + "0." };
  }
  return { ...state, expression: state.expression + "." };
}

export function inputOperator(state, op) {
  // Continues from a previous result (e.g. result "84", press "+" -> "84+").
  const base = state.isError ? "" : state.expression;
  return { ...state, expression: appendOperator(base, op), isResult: false, isError: false };
}

function appendOperator(expression, op) {
  if (expression === "") {
    return op === "-" ? "-" : expression;
  }
  const trailingRun = expression.match(/[+\-×÷^]+$/);
  if (trailingRun) {
    if (op === "-" && !trailingRun[0].endsWith("-")) {
      return expression + op; // allow "5×-3" style unary minus after an operator
    }
    return expression.slice(0, -trailingRun[0].length) + op; // replace trailing operator
  }
  return expression + op;
}

// True when the expression currently ends in a "completed" value (a
// digit, a closing paren, a constant, or a postfix ! / %) — i.e. a
// position where pressing sin/(/π next should imply multiplication,
// the way "2π" means "2×π" on a real calculator, not a syntax error.
function endsWithCompletedValue(expression) {
  if (expression === "") return false;
  return /[0-9)!%πe]$/.test(expression);
}

export function inputFunction(state, fn) {
  if (state.isResult || state.isError) {
    return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode, expression: fn + "(" };
  }
  const prefix = endsWithCompletedValue(state.expression) ? "×" : "";
  return { ...state, expression: state.expression + prefix + fn + "(", isResult: false, isError: false };
}

export function inputParen(state, paren) {
  if (state.isResult || state.isError) {
    return {
      ...createInitialState(),
      mode: state.mode,
      angleMode: state.angleMode,
      expression: paren === "(" ? "(" : "",
    };
  }
  if (paren === "(") {
    const prefix = endsWithCompletedValue(state.expression) ? "×" : "";
    return { ...state, expression: state.expression + prefix + paren, isResult: false, isError: false };
  }
  return { ...state, expression: state.expression + paren, isResult: false, isError: false };
}

export function inputConstant(state, symbol) {
  if (state.isResult || state.isError) {
    return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode, expression: symbol };
  }
  const prefix = endsWithCompletedValue(state.expression) ? "×" : "";
  return { ...state, expression: state.expression + prefix + symbol, isResult: false, isError: false };
}

export function inputPostfix(state, symbol) {
  // "!" or "%" — only makes sense right after a number/closing paren.
  if (state.expression === "" || /[+\-×÷^(]$/.test(state.expression)) return state;
  return { ...state, expression: state.expression + symbol, isResult: false, isError: false };
}

export function backspace(state) {
  if (state.isResult || state.isError) {
    return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode };
  }
  return { ...state, expression: state.expression.slice(0, -1) };
}

export function clearAll(state) {
  return { ...createInitialState(), mode: state.mode, angleMode: state.angleMode };
}

export function toggleAngleMode(state) {
  return { ...state, angleMode: state.angleMode === "deg" ? "rad" : "deg" };
}

export function setMode(state, mode) {
  return { ...state, mode };
}

export function handleEquals(state) {
  if (state.expression.trim() === "") return state;
  try {
    const result = evaluate(state.expression, state.angleMode);
    return {
      ...state,
      resultLine: formatForDisplay(state.expression),
      expression: formatRawNumber(result),
      isResult: true,
      isError: false,
    };
  } catch {
    return { ...state, isResult: true, isError: true };
  }
}

// Converts a computed number back into the plain string form the
// expression engine can re-parse if the user continues from it (no
// commas — those are display-only, added by formatForDisplay).
function formatRawNumber(value) {
  const rounded = Math.round(value * 1e10) / 1e10;
  return String(rounded);
}
