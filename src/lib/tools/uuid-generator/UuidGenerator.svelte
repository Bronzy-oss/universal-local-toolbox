<script>
  import { generateUuid, format } from "./logic.js";

  let uuids = $state([generateUuid()]);
  let uppercase = $state(false);
  let dashes = $state(true);
  let copiedIndex = $state(-1);

  let formatted = $derived(uuids.map((u) => format(u, { uppercase, dashes })));

  function generateOne() {
    uuids = [generateUuid()];
  }

  function generateFive() {
    uuids = Array.from({ length: 5 }, () => generateUuid());
  }

  async function copy(text, i) {
    try {
      await navigator.clipboard.writeText(text);
      copiedIndex = i;
      setTimeout(() => (copiedIndex = -1), 1200);
    } catch {
      // clipboard unavailable — not worth an error message
    }
  }
</script>

<div class="uuid-tool">
  <div class="toggles">
    <label class="toggle">
      <input type="checkbox" bind:checked={uppercase} />
      Uppercase
    </label>
    <label class="toggle">
      <input type="checkbox" bind:checked={dashes} />
      Dashes
    </label>
  </div>

  <div class="list">
    {#each formatted as uuid, i (i)}
      <button type="button" class="uuid-row" onclick={() => copy(uuid, i)}>
        <span class="uuid-text">{uuid}</span>
        <span class="copy-label">{copiedIndex === i ? "Copied!" : "Copy"}</span>
      </button>
    {/each}
  </div>

  <div class="actions">
    <button type="button" class="btn primary" onclick={generateOne}>Generate</button>
    <button type="button" class="btn" onclick={generateFive}>Generate 5</button>
  </div>
</div>

<style>
  .uuid-tool {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .toggles {
    display: flex;
    gap: var(--space-4);
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .uuid-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 12px;
    font-family: "SFMono-Regular", Consolas, monospace;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  .uuid-text {
    font-size: 0.8125rem;
    color: var(--color-text);
    overflow-x: auto;
    white-space: nowrap;
  }

  .copy-label {
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-accent);
    font-family: inherit;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .btn {
    padding: 10px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 550;
  }

  .btn.primary {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
</style>
