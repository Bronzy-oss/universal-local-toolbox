<script>
  import PageHeader from "../lib/components/PageHeader.svelte";
  import ToolCard from "../lib/components/ToolCard.svelte";
  import { getToolsByCategory } from "../lib/registry/tools.js";

  // No guide button here — guides are per-tool (Project Plan section
  // 33), not per-category.
  let { category, onBack, onOpenTool } = $props();

  let categoryTools = $derived(getToolsByCategory(category.id));
</script>

<main>
  <PageHeader title={category.label} {onBack} />

  {#if categoryTools.length === 0}
    <div class="empty-state">
      <p>Tools for {category.label} are coming soon.</p>
    </div>
  {:else}
    <div class="grid-2">
      {#each categoryTools as tool (tool.id)}
        <ToolCard glyph={tool.glyph} label={tool.label} onclick={() => onOpenTool(tool)} />
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-5) var(--space-4) var(--space-6);
    max-width: 480px;
    margin: 0 auto;
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
