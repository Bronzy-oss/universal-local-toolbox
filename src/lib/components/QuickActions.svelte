<script>
  import Section from "./Section.svelte";
  import ToolCard from "./ToolCard.svelte";

  // Static placeholder data for now — becomes registry-driven once
  // the Tool Registry (Phase 3) exists. These four match the
  // Project Plan's Quick Actions example.
  const actions = [
    { id: "compress", label: "Compress", glyph: "C" },
    { id: "convert", label: "Convert", glyph: "⇄" },
    { id: "image-to-pdf", label: "PDF", glyph: "PDF" },
    { id: "qr-generator", label: "QR Code", glyph: "QR" },
  ];
</script>

<Section label="Quick Actions">
  <div class="grid-2">
    {#each actions as action (action.id)}
      <ToolCard glyph={action.glyph} label={action.label} size="lg" />
    {/each}
  </div>
</Section>
