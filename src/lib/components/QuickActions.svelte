<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { getQuickActions } from "../registry/tools.js";

  let { onSelect } = $props();
  const actions = getQuickActions();
</script>

<Section label="Quick Actions">
  <div class="grid-2">
    {#each actions as action (action.id)}
      <ToolCard
        glyph={action.glyph}
        label={action.label}
        size="lg"
        onclick={() => onSelect(action)}
      />
    {/each}
  </div>
</Section>
