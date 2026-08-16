<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";

  // Matches the Project Plan's 7 V1 categories.
  const categories = [
    { id: "files", label: "Files", glyph: "F" },
    { id: "images", label: "Images", glyph: "Im" },
    { id: "documents", label: "Documents", glyph: "D" },
    { id: "text", label: "Text", glyph: "T" },
    { id: "developer", label: "Developer", glyph: "Dv" },
    { id: "everyday", label: "Everyday", glyph: "E" },
    { id: "security", label: "Security", glyph: "S" },
  ];
</script>

<Section label="Categories">
  <div class="grid-2">
    {#each categories as category (category.id)}
      <ToolCard glyph={category.glyph} label={category.label} />
    {/each}
  </div>
</Section>
