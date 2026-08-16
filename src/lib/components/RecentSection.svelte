<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { recentToolIds } from "../stores/recent.js";
  import { quickActions } from "../data/quickActions.js";

  let { onSelect } = $props();

  // Resolved against current quickActions data each time, by id —
  // never stores stale copies of label/guide text.
  let recentTools = $derived(
    $recentToolIds
      .map((id) => quickActions.find((t) => t.id === id))
      .filter(Boolean),
  );
</script>

<Section label="Recent">
  {#if recentTools.length === 0}
    <div class="empty-state">
      <p>No recent tools yet — pick one below to get started.</p>
    </div>
  {:else}
    <div class="grid-2">
      {#each recentTools as tool (tool.id)}
        <ToolCard glyph={tool.glyph} label={tool.label} onclick={() => onSelect(tool)} />
      {/each}
    </div>
  {/if}
</Section>

<style>
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
