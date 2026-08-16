<script>
  // Small square icon button — used for the Settings gear on Home
  // and the Back arrow on Settings. Content (the icon svg) is passed
  // in as children so this stays icon-agnostic.
  let { label, onclick, children } = $props();
</script>

<button type="button" class="icon-btn" aria-label={label} onclick={onclick}>
  {@render children()}
</button>

<style>
  .icon-btn {
    flex-shrink: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    cursor: pointer;
  }
</style>
