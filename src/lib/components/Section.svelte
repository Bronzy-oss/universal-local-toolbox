<script>
  // Shared section wrapper: a small uppercase label + whatever content
  // is passed in. Keeps the "QUICK ACTIONS" / "RECENT" / "CATEGORIES"
  // label styling in one place instead of repeated per section.
  let { label, children } = $props();
</script>

<section>
  <p class="section-label">{label}</p>
  {@render children()}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .section-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin: 0;
  }
</style>
