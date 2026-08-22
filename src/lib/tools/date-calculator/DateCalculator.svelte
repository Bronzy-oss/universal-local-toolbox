<script>
  import Dropdown from "../../components/Dropdown.svelte";
  import { totalDaysBetween, breakdownBetween, addDays } from "./logic.js";

  const modeOptions = [
    { value: "difference", label: "Difference" },
    { value: "add", label: "Add / Subtract" },
  ];

  let mode = $state("difference");

  // Difference mode
  const today = new Date().toISOString().split("T")[0];
  let dateA = $state(today);
  let dateB = $state(today);

  let totalDays = $derived.by(() => {
    try {
      return totalDaysBetween(dateA, dateB);
    } catch {
      return null;
    }
  });
  let breakdown = $derived.by(() => {
    try {
      return breakdownBetween(dateA, dateB);
    } catch {
      return null;
    }
  });

  // Add/subtract mode
  let baseDate = $state(today);
  let offsetDays = $state("7");
  let resultDate = $derived.by(() => {
    const n = parseInt(offsetDays, 10);
    if (Number.isNaN(n)) return null;
    try {
      return addDays(baseDate, n);
    } catch {
      return null;
    }
  });
</script>

<div class="date-calculator">
  <Dropdown label="Mode" options={modeOptions} value={mode} onChange={(v) => (mode = v)} />

  {#if mode === "difference"}
    <div class="field">
      <label for="date-a">From</label>
      <input id="date-a" type="date" bind:value={dateA} />
    </div>
    <div class="field">
      <label for="date-b">To</label>
      <input id="date-b" type="date" bind:value={dateB} />
    </div>

    {#if breakdown && totalDays !== null}
      <div class="result">
        <p class="result-label">Difference</p>
        <p class="result-value">
          {breakdown.years}y {breakdown.months}m {breakdown.days}d
        </p>
        <p class="result-sub">{totalDays.toLocaleString()} total days</p>
      </div>
    {/if}
  {:else}
    <div class="field">
      <label for="base-date">Start date</label>
      <input id="base-date" type="date" bind:value={baseDate} />
    </div>
    <div class="field">
      <label for="offset-days">Days to add (use a negative number to subtract)</label>
      <input id="offset-days" type="number" inputmode="numeric" bind:value={offsetDays} />
    </div>

    {#if resultDate}
      <div class="result">
        <p class="result-label">Result</p>
        <p class="result-value">{resultDate}</p>
      </div>
    {/if}
  {/if}
</div>

<style>
  .date-calculator {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  input {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 13px 16px;
    font-size: 0.9375rem;
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
  }

  input:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
  }

  .result {
    background: var(--color-accent-soft);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    margin-top: var(--space-2);
  }

  .result-label {
    margin: 0 0 4px;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
    opacity: 0.75;
  }

  .result-value {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 650;
    color: var(--color-accent);
  }

  .result-sub {
    margin: 4px 0 0;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }
</style>
