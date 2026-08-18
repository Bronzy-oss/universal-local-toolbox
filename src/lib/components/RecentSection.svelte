<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { recentToolIds } from "../stores/recent.js";
  import { getToolById } from "../registry/tools.js";

  let { onSelect } = $props();

  // Resolved against the current registry each time, by id — never
  // stores stale copies of label/guide text.
  let recentTools = $derived(
    $recentToolIds.map((id) => getToolById(id)).filter(Boolean),
  );

  // Column-major zigzag layout, most-recent-first:
  //   row 1: 1st, 3rd, 5th, ...
  //   row 2: 2nd, 4th, 6th, ...
  // scrolling horizontally as more history accumulates.
  let columns = $derived.by(() => {
    const cols = [];
    for (let i = 0; i < recentTools.length; i += 2) {
      cols.push([recentTools[i], recentTools[i + 1] ?? null]);
    }
    return cols;
  });
</script>

<Section label="Recent">
  {#if recentTools.length === 0}
    <div class="empty-state">
      <p>No recent tools yet — pick one below to get started.</p>
    </div>
  {:else}
    <div class="recent-scroll">
      {#each columns as column, i (column[0].id)}
        <div class="recent-column">
          <ToolCard
            glyph={column[0].glyph}
            icon={column[0].icon}
            label={column[0].label}
            onclick={() => onSelect(column[0])}
          />
          {#if column[1]}
            <ToolCard
              glyph={column[1].glyph}
              icon={column[1].icon}
              label={column[1].label}
              onclick={() => onSelect(column[1])}
            />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</Section>

<style>
  .recent-scroll {
    display: flex;
    gap: var(--space-3);
    overflow-x: auto;
    padding-bottom: 4px;
    margin: 0 calc(var(--space-4) * -1);
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  .recent-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex-shrink: 0;
    width: 168px;
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
