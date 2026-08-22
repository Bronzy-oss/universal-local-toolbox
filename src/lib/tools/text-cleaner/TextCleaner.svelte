<script>
  import * as clean from "./logic.js";

  let text = $state("");

  const actions = [
    { label: "Trim each line", fn: clean.trimLines },
    { label: "Remove empty lines", fn: clean.removeEmptyLines },
    { label: "Remove duplicate lines", fn: clean.removeDuplicateLines },
    { label: "Collapse extra spaces", fn: clean.collapseSpaces },
    { label: "Sort lines A–Z", fn: clean.sortLines },
  ];

  function apply(fn) {
    text = fn(text);
  }

  function clearAll() {
    text = "";
  }
</script>

<div class="text-cleaner">
  <div class="field">
    <label for="tc-input">Text</label>
    <textarea id="tc-input" bind:value={text} placeholder="Paste text here…" rows="8"></textarea>
  </div>

  <div class="actions">
    {#each actions as action (action.label)}
      <button type="button" class="btn" onclick={() => apply(action.fn)}>{action.label}</button>
    {/each}
    <button type="button" class="btn ghost" onclick={clearAll}>Clear</button>
  </div>
</div>

<style>
  .text-cleaner {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
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

  textarea {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 12px;
    font-size: 0.9375rem;
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
    resize: vertical;
  }

  textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .btn {
    padding: 10px 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 550;
  }

  .btn.ghost {
    color: var(--color-text-muted);
  }
</style>
