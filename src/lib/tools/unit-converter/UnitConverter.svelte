<script>
  import Dropdown from "../../components/Dropdown.svelte";
  import { categories, convert, formatNumber } from "./conversions.js";

  const categoryOptions = Object.entries(categories).map(([id, cat]) => ({
    value: id,
    label: cat.label,
  }));

  let categoryId = $state("length");
  let fromUnit = $state("km");
  let toUnit = $state("mi");
  let inputValue = $state("5");

  let unitOptions = $derived(
    Object.entries(categories[categoryId].units).map(([id, u]) => ({
      value: id,
      label: u.label,
    })),
  );

  let result = $derived.by(() => {
    const num = parseFloat(inputValue);
    if (Number.isNaN(num)) return "";
    return formatNumber(convert(categoryId, num, fromUnit, toUnit));
  });

  let toUnitLabel = $derived(
    unitOptions.find((u) => u.value === toUnit)?.label ?? "",
  );

  function handleCategoryChange(newCategoryId) {
    categoryId = newCategoryId;
    const unitIds = Object.keys(categories[newCategoryId].units);
    fromUnit = unitIds[0];
    toUnit = unitIds[1] ?? unitIds[0];
  }
</script>

<div class="converter">
  <Dropdown
    label="Category"
    options={categoryOptions}
    value={categoryId}
    onChange={handleCategoryChange}
  />

  <div class="field">
    <label for="uc-value">Value</label>
    <input id="uc-value" type="number" inputmode="decimal" bind:value={inputValue} />
  </div>

  <Dropdown label="From" options={unitOptions} value={fromUnit} onChange={(v) => (fromUnit = v)} />
  <Dropdown label="To" options={unitOptions} value={toUnit} onChange={(v) => (toUnit = v)} />

  <div class="result">
    <p class="result-label">Result</p>
    <p class="result-value">{result || "—"}{result ? " " + toUnitLabel : ""}</p>
  </div>
</div>

<style>
  .converter {
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

  .field input {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 13px 16px;
    font-size: 0.9375rem;
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
  }

  .field input:focus {
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
    font-size: 1.5rem;
    font-weight: 650;
    color: var(--color-accent);
  }
</style>
