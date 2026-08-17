<script>
  // Shared card used for Quick Actions, Category items, and search
  // results. `icon` (an imported image URL) is used when available;
  // otherwise falls back to the `glyph` monogram placeholder — most
  // tools still don't have a real icon yet.
  let { glyph, icon, label, size = "md", onclick } = $props();
</script>

<button type="button" class="card" class:lg={size === "lg"} {onclick}>
  <span class="icon-slot" class:has-image={!!icon}>
    {#if icon}
      <img src={icon} alt="" />
    {:else}
      {glyph}
    {/if}
  </span>
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

  .icon-slot.has-image {
    background: transparent;
    padding: 0;
    overflow: hidden;
  }

  .icon-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    display: block;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 550;
    color: var(--color-text);
  }
</style>
