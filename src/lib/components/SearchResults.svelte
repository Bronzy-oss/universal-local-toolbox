<script>
  import { searchTools } from "../search/index.js";

  let { query, onSelectTool, onSelectCategory } = $props();

  let results = $derived(searchTools(query));

  function handleSelect(result) {
    if (result.type === "tool") onSelectTool(result.item);
    else onSelectCategory(result.item);
  }
</script>

{#if results.length === 0}
  <div class="empty-state">
    <p>No tools found for "{query}".</p>
  </div>
{:else}
  <div class="results-list">
    {#each results as result (result.type + result.item.id)}
      <button type="button" class="result-row" onclick={() => handleSelect(result)}>
        <span class="icon-slot" class:has-image={!!result.item.icon}>
          {#if result.item.icon}
            <img src={result.item.icon} alt="" />
          {:else}
            {result.item.glyph}
          {/if}
        </span>
        <span class="label">{result.item.label}</span>
        <span class="type-tag">{result.type === "tool" ? "Quick Action" : "Category"}</span>
      </button>
    {/each}
  </div>
{/if}

<style>
  .results-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .result-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    text-align: left;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    font-family: inherit;
    cursor: pointer;
  }

  .icon-slot {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-accent-soft);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8125rem;
    font-weight: 700;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 550;
    color: var(--color-text);
  }

  .type-tag {
    margin-left: auto;
    font-size: 0.6875rem;
    color: var(--color-text-muted);
    flex-shrink: 0;
  }

  .empty-state {
    border: 1.5px dashed var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5) var(--space-4);
    text-align: center;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
</style>
