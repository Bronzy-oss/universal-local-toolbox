<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { quickActions } from "../data/quickActions.js";

  let { onSelect } = $props();
</script>

<Section label="Quick Actions">
  <div class="grid-2">
    {#each quickActions as action (action.id)}
      <ToolCard
        glyph={action.glyph}
        label={action.label}
        size="lg"
        onclick={() => onSelect(action)}
      />
    {/each}
  </div>
</Section>
