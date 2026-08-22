<script>
  import { analyzeText } from "./logic.js";

  let text = $state("");
  let stats = $derived(analyzeText(text));

  const rows = $derived([
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading time", value: stats.words === 0 ? "—" : `${stats.readingTimeMinutes} min` },
  ]);
</script>

<div class="word-counter">
  <div class="field">
    <label for="wc-input">Text</label>
    <textarea id="wc-input" bind:value={text} placeholder="Paste or type text here…" rows="8"></textarea>
  </div>

  <div class="stats-grid">
    {#each rows as row (row.label)}
      <div class="stat">
        <p class="stat-value">{row.value}</p>
        <p class="stat-label">{row.label}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .word-counter {
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

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }

  .stat {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
  }

  .stat-value {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 650;
    color: var(--color-accent);
  }

  .stat-label {
    margin: 2px 0 0;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
</style>
