<script>
  import { computeAllHashes } from "./logic.js";

  let input = $state("");
  let hashes = $state(null);
  let copiedKey = $state("");

  async function generate() {
    hashes = await computeAllHashes(input);
  }

  async function copy(text, key) {
    try {
      await navigator.clipboard.writeText(text);
      copiedKey = key;
      setTimeout(() => (copiedKey = ""), 1200);
    } catch {
      // clipboard unavailable — skip the confirmation, not worth an error
    }
  }
</script>

<div class="hash-tool">
  <div class="field">
    <label for="hash-input">Text</label>
    <textarea id="hash-input" bind:value={input} placeholder="Type or paste text here…" rows="4"></textarea>
  </div>

  <button type="button" class="btn primary" onclick={generate}>Generate Hashes</button>

  {#if hashes}
    <div class="results">
      {#each Object.entries(hashes) as [name, value] (name)}
        <button type="button" class="hash-row" onclick={() => copy(value, name)}>
          <div class="hash-row-header">
            <span class="algo">{name}</span>
            <span class="copy-label">{copiedKey === name ? "Copied!" : "Copy"}</span>
          </div>
          <span class="hash-value">{value}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .hash-tool {
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

  .btn {
    padding: 12px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 550;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .hash-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 10px 12px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
  }

  .hash-row-header {
    display: flex;
    justify-content: space-between;
  }

  .algo {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-accent);
  }

  .copy-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }

  .hash-value {
    font-size: 0.75rem;
    font-family: "SFMono-Regular", Consolas, monospace;
    color: var(--color-text);
    word-break: break-all;
  }
</style>
