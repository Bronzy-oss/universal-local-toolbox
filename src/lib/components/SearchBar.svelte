<script>
  // Controlled via bind:value from the parent (Home), which decides
  // whether to show normal sections or search results based on it.
  let { value = $bindable("") } = $props();
</script>

<div class="search-bar">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
  <input type="text" placeholder="Search tools..." aria-label="Search tools" bind:value />
</div>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 999px;
    padding: 13px 18px;
  }

  .search-bar svg {
    flex-shrink: 0;
    color: var(--color-text-muted);
  }

  .search-bar input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.9375rem;
    color: var(--color-text);
    width: 100%;
    font-family: inherit;
  }

  .search-bar input::placeholder {
    color: var(--color-text-muted);
  }
</style>
