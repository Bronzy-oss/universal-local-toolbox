<script>
  import { diffLines, diffStats } from "./logic.js";

  let textA = $state("");
  let textB = $state("");
  let diff = $state(null);

  function compare() {
    diff = diffLines(textA, textB);
  }

  let stats = $derived(diff ? diffStats(diff) : null);
</script>

<div class="text-diff">
  <div class="field">
    <label for="diff-a">Original</label>
    <textarea id="diff-a" bind:value={textA} placeholder="Paste original text…" rows="5"></textarea>
  </div>

  <div class="field">
    <label for="diff-b">Changed</label>
    <textarea id="diff-b" bind:value={textB} placeholder="Paste changed text…" rows="5"></textarea>
  </div>

  <button type="button" class="btn primary" onclick={compare}>Compare</button>

  {#if diff}
    <div class="summary">
      <span class="added">+{stats.added}</span>
      <span class="removed">−{stats.removed}</span>
      <span class="unchanged">{stats.unchanged} unchanged</span>
    </div>
    <div class="diff-view">
      {#each diff as line, i (i)}
        <div class="diff-line {line.type}">{line.line || " "}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .text-diff {
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
    font-size: 0.875rem;
    font-family: "SFMono-Regular", Consolas, monospace;
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
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 550;
  }

  .btn.primary {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }

  .summary {
    display: flex;
    gap: var(--space-3);
    font-size: 0.8125rem;
    font-weight: 600;
  }

  .summary .added {
    color: #4ade80;
  }

  .summary .removed {
    color: #f87171;
  }

  .summary .unchanged {
    color: var(--color-text-muted);
  }

  .diff-view {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 0.8125rem;
  }

  .diff-line {
    padding: 4px 10px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .diff-line.added {
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;
  }

  .diff-line.removed {
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
  }

  .diff-line.equal {
    color: var(--color-text-muted);
  }
</style>
