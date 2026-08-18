<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { tools } from "../registry/tools.js";

  let { onSelect } = $props();

  const BATCH_SIZE = 12;
  let visibleCount = $state(BATCH_SIZE);
  let sentinel = $state(null);

  // Loads more tools as the sentinel element scrolls into view — a
  // full catalog (the Project Plan's "ALL TOOLS & FUTURE TOOLS")
  // grows well past what should render at once, so this shows a
  // batch at a time instead of the whole list up front.
  $effect(() => {
    if (!sentinel || visibleCount >= tools.length) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        visibleCount = Math.min(visibleCount + BATCH_SIZE, tools.length);
      }
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  });

  let visibleTools = $derived(tools.slice(0, visibleCount));
</script>

<Section label="All Tools">
  <div class="grid-2">
    {#each visibleTools as tool (tool.id)}
      <ToolCard
        glyph={tool.glyph}
        icon={tool.icon}
        label={tool.label}
        onclick={() => onSelect(tool)}
      />
    {/each}
  </div>
  {#if visibleCount < tools.length}
    <div bind:this={sentinel} class="sentinel" aria-hidden="true"></div>
  {/if}
</Section>

<style>
  .sentinel {
    height: 1px;
  }
</style>
