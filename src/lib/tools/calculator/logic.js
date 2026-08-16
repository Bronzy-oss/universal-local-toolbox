// Pure calculator logic, kept separate from the .svelte component so
// it can be unit tested directly with plain Node (no compiler needed).

export function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export function formatResult(value) {
  if (Number.isNaN(value)) return "Error";
  // Round away binary float noise (0.1 + 0.2 -> 0.30000000000000004)
  const rounded = Math.round(value * 1e10) / 1e10;
  return String(rounded);
}

export function createInitialState() {
  return {
    display: "0",
    previousValue: null,
    operator: null,
    waitingForOperand: false,
  };
}

export function inputDigit(state, digit) {
  if (state.waitingForOperand) {
    return { ...state, display: digit, waitingForOperand: false };
  }
  return {
    ...state,
    display: state.display === "0" ? digit : state.display + digit,
  };
}

export function inputDecimal(state) {
  if (state.waitingForOperand) {
    return { ...state, display: "0.", waitingForOperand: false };
  }
  if (state.display.includes(".")) return state;
  return { ...state, display: state.display + "." };
}

export function clearAll() {
  return createInitialState();
}

export function toggleSign(state) {
  const display = state.display.startsWith("-")
    ? state.display.slice(1)
    : "-" + state.display;
  return { ...state, display };
}

export function inputPercent(state) {
  return { ...state, display: formatResult(parseFloat(state.display) / 100) };
}

export function performOperation(state, nextOperator) {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      display: state.display,
      previousValue: inputValue,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  if (state.operator) {
    const result = calculate(state.previousValue, inputValue, state.operator);
    return {
      display: formatResult(result),
      previousValue: result,
      operator: nextOperator,
      waitingForOperand: true,
    };
  }

  return { ...state, operator: nextOperator, waitingForOperand: true };
}

export function handleEquals(state) {
  if (state.operator === null || state.previousValue === null) return state;
  const inputValue = parseFloat(state.display);
  const result = calculate(state.previousValue, inputValue, state.operator);
  return {
    display: formatResult(result),
    previousValue: null,
    operator: null,
    waitingForOperand: true,
  };
}
