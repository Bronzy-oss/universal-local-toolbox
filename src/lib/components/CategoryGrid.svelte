<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";
  import { categories } from "../data/categories.js";

  let { onSelect } = $props();
</script>

<Section label="Categories">
  <div class="grid-2">
    {#each categories as category (category.id)}
      <ToolCard
        glyph={category.glyph}
        icon={category.icon}
        label={category.label}
        onclick={() => onSelect(category)}
      />
    {/each}
  </div>
</Section>
