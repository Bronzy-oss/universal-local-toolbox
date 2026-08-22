<script>
  import * as cc from "./logic.js";

  let text = $state("");

  const options = [
    { label: "UPPERCASE", fn: cc.toUpperCase },
    { label: "lowercase", fn: cc.toLowerCase },
    { label: "Title Case", fn: cc.toTitleCase },
    { label: "Sentence case", fn: cc.toSentenceCase },
    { label: "camelCase", fn: cc.toCamelCase },
    { label: "PascalCase", fn: cc.toPascalCase },
    { label: "snake_case", fn: cc.toSnakeCase },
    { label: "kebab-case", fn: cc.toKebabCase },
  ];

  function apply(fn) {
    text = fn(text);
  }
</script>

<div class="case-converter">
  <div class="field">
    <label for="cc-input">Text</label>
    <textarea id="cc-input" bind:value={text} placeholder="Type or paste text here…" rows="6"></textarea>
  </div>

  <div class="options-grid">
    {#each options as option (option.label)}
      <button type="button" class="btn" onclick={() => apply(option.fn)}>{option.label}</button>
    {/each}
  </div>
</div>

<style>
  .case-converter {
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

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
</style>
