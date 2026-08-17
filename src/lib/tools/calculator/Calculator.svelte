<script>
  import * as calc from "./logic.js";

  let state = $state(calc.createInitialState());

  const digit = (d) => (state = calc.inputDigit(state, d));
  const decimal = () => (state = calc.inputDecimal(state));
  const op = (o) => (state = calc.inputOperator(state, o));
  const fn = (f) => (state = calc.inputFunction(state, f));
  const paren = (p) => (state = calc.inputParen(state, p));
  const constant = (c) => (state = calc.inputConstant(state, c));
  const postfix = (p) => (state = calc.inputPostfix(state, p));
  const back = () => (state = calc.backspace(state));
  const clear = () => (state = calc.clearAll(state));
  const equals = () => (state = calc.handleEquals(state));
  const toggleAngle = () => (state = calc.toggleAngleMode(state));
  const setMode = (m) => (state = calc.setMode(state, m));

  const sciFunctions = [
    { label: "sin", action: () => fn("sin") },
    { label: "cos", action: () => fn("cos") },
    { label: "tan", action: () => fn("tan") },
    { label: "log", action: () => fn("log") },
    { label: "ln", action: () => fn("ln") },
    { label: "√", action: () => fn("sqrt") },
    { label: "^", action: () => op("^") },
    { label: "π", action: () => constant("π") },
    { label: "e", action: () => constant("e") },
    { label: "!", action: () => postfix("!") },
    { label: "(", action: () => paren("(") },
    { label: ")", action: () => paren(")") },
  ];
</script>

<div class="calculator">
  <div class="display">
    <div class="result-line">{state.resultLine}</div>
    <div class="main-line">{calc.getDisplay(state)}</div>
  </div>

  <div class="mode-row">
    <div class="mode-toggle">
      <button type="button" class:active={state.mode === "basic"} onclick={() => setMode("basic")}>
        Basic
      </button>
      <button type="button" class:active={state.mode === "scientific"} onclick={() => setMode("scientific")}>
        Scientific
      </button>
    </div>
    {#if state.mode === "scientific"}
      <button type="button" class="angle-toggle" onclick={toggleAngle}>
        {state.angleMode.toUpperCase()}
      </button>
    {/if}
  </div>

  {#if state.mode === "scientific"}
    <div class="sci-strip">
      {#each sciFunctions as f (f.label)}
        <button type="button" class="chip" onclick={f.action}>{f.label}</button>
      {/each}
    </div>
  {/if}

  <div class="pad">
    <button class="key fn" onclick={clear}>AC</button>
    <button class="key fn" onclick={() => postfix("%")}>%</button>
    <button class="key fn" onclick={back}>⌫</button>
    <button class="key op" onclick={() => op("÷")}>÷</button>

    <button class="key" onclick={() => digit("7")}>7</button>
    <button class="key" onclick={() => digit("8")}>8</button>
    <button class="key" onclick={() => digit("9")}>9</button>
    <button class="key op" onclick={() => op("×")}>×</button>

    <button class="key" onclick={() => digit("4")}>4</button>
    <button class="key" onclick={() => digit("5")}>5</button>
    <button class="key" onclick={() => digit("6")}>6</button>
    <button class="key op" onclick={() => op("-")}>−</button>

    <button class="key" onclick={() => digit("1")}>1</button>
    <button class="key" onclick={() => digit("2")}>2</button>
    <button class="key" onclick={() => digit("3")}>3</button>
    <button class="key op" onclick={() => op("+")}>+</button>

    <button class="key" onclick={() => { digit("0"); digit("0"); }}>00</button>
    <button class="key" onclick={() => digit("0")}>0</button>
    <button class="key" onclick={decimal}>.</button>
    <button class="key equals" onclick={equals}>=</button>
  </div>
</div>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .display {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    text-align: right;
  }

  .result-line {
    min-height: 1.2em;
    font-size: 0.9375rem;
    color: var(--color-text-muted);
    font-variant-numeric: tabular-nums;
    overflow-x: auto;
    white-space: nowrap;
  }

  .main-line {
    font-size: 2rem;
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    overflow-x: auto;
    white-space: nowrap;
  }

  .mode-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .mode-toggle {
    display: flex;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 3px;
    gap: 3px;
  }

  .mode-toggle button {
    border: none;
    background: transparent;
    padding: 7px 12px;
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 550;
    color: var(--color-text-muted);
    font-family: inherit;
    cursor: pointer;
  }

  .mode-toggle button.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }

  .angle-toggle {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-accent);
    border-radius: var(--radius-md);
    padding: 7px 12px;
    font-size: 0.8125rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
  }

  .sci-strip {
    display: flex;
    gap: var(--space-2);
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .chip {
    flex-shrink: 0;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: var(--radius-md);
    padding: 10px 16px;
    font-size: 0.9375rem;
    font-family: inherit;
    cursor: pointer;
  }

  .pad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }

  .key {
    height: 58px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    border-radius: var(--radius-md);
    font-size: 1.125rem;
    font-weight: 550;
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
  }

  .key.fn {
    color: var(--color-accent);
  }

  .key.op {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }

  .key.equals {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
</style>
