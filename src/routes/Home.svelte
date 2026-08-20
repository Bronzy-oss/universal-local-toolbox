<script>
  import SearchBar from "../lib/components/SearchBar.svelte";
  import SearchResults from "../lib/components/SearchResults.svelte";
  import RecentSection from "../lib/components/RecentSection.svelte";
  import CategoryGrid from "../lib/components/CategoryGrid.svelte";
  import AllToolsSection from "../lib/components/AllToolsSection.svelte";
  import IconButton from "../lib/components/IconButton.svelte";

  let { onOpenSettings, onOpenCategory, onOpenTool } = $props();

  let searchQuery = $state("");
</script>

<main>
  <div class="top-row">
    <header>
      <h1>Universal Local Toolbox</h1>
      <p>Useful tools. Zero clutter.</p>
    </header>
    <IconButton label="Settings" onclick={onOpenSettings}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </IconButton>
  </div>

  <SearchBar bind:value={searchQuery} />

  {#if searchQuery.trim()}
    <SearchResults query={searchQuery} onSelectTool={onOpenTool} onSelectCategory={onOpenCategory} />
  {:else}
    <CategoryGrid onSelect={onOpenCategory} />
    <RecentSection onSelect={onOpenTool} />
    <AllToolsSection onSelect={onOpenTool} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: calc(var(--space-5) + env(safe-area-inset-top)) var(--space-4) var(--space-6);
    max-width: 480px;
    margin: 0 auto;
  }

  .top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  header h1 {
    font-size: 1.25rem;
    font-weight: 650;
    margin: 0 0 2px;
    letter-spacing: -0.01em;
  }

  header p {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;
  }
</style>
