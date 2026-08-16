<script>
  import Section from "./Section.svelte";
  // Empty for now — no history exists until tools exist (Phase 3+).
  // Deliberately worded as a next step, not a dead end.
</script>

<Section label="Recent">
  <div class="empty-state">
    <p>No recent tools yet — pick one below to get started.</p>
  </div>
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
