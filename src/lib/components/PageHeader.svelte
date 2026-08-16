<script>
  import IconButton from "./IconButton.svelte";

  // Shared back+title header for any non-Home screen (Settings,
  // Category page, Tool page, ...). `children`, if passed, renders on
  // the right (e.g. the guide "i" button on a Tool page).
  let { title, onBack, children } = $props();
</script>

<div class="page-header">
  <div class="left">
    <IconButton label="Back" onclick={onBack}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </IconButton>
    <h1>{title}</h1>
  </div>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  h1 {
    font-size: 1.125rem;
    font-weight: 650;
    margin: 0;
  }
</style>
