<script>
  import * as calc from "./logic.js";

  let state = $state(calc.createInitialState());

  function digit(d) {
    state = calc.inputDigit(state, d);
  }
  function decimal() {
    state = calc.inputDecimal(state);
  }
  function clear() {
    state = calc.clearAll();
  }
  function sign() {
    state = calc.toggleSign(state);
  }
  function percent() {
    state = calc.inputPercent(state);
  }
  function op(nextOp) {
    state = calc.performOperation(state, nextOp);
  }
  function equals() {
    state = calc.handleEquals(state);
  }
</script>

<div class="calculator">
  <div class="display">{state.display}</div>
  <div class="pad">
    <button class="key fn" onclick={clear}>C</button>
    <button class="key fn" onclick={sign}>+/−</button>
    <button class="key fn" onclick={percent}>%</button>
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

    <button class="key zero" onclick={() => digit("0")}>0</button>
    <button class="key" onclick={decimal}>.</button>
    <button class="key equals" onclick={equals}>=</button>
  </div>
</div>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .display {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5) var(--space-4);
    text-align: right;
    font-size: 2.25rem;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    overflow-x: auto;
    white-space: nowrap;
  }

  .pad {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }

  .key {
    height: 60px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    border-radius: var(--radius-md);
    font-size: 1.25rem;
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

  .key.zero {
    grid-column: span 2;
  }
</style>
