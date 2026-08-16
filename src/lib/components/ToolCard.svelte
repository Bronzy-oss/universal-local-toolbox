<script>
  // Shared card used for both Quick Actions and Category items.
  // `glyph` is a short placeholder monogram (e.g. "C", "PDF") standing
  // in for a real icon set, which is a later design pass — not part
  // of this structural step.
  let { glyph, label, size = "md" } = $props();
</script>

<button type="button" class="card" class:lg={size === "lg"}>
  <span class="icon-slot">{glyph}</span>
  <span class="label">{label}</span>
</button>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    text-align: left;
    font-family: inherit;
    cursor: pointer;
  }

  .icon-slot {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--color-accent-soft);
    color: var(--color-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .card.lg .icon-slot {
    width: 44px;
    height: 44px;
    font-size: 0.875rem;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 550;
    color: var(--color-text);
  }
</style>
