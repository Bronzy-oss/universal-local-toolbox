<script>
  import SearchBar from "../lib/components/SearchBar.svelte";
  import QuickActions from "../lib/components/QuickActions.svelte";
  import RecentSection from "../lib/components/RecentSection.svelte";
  import CategoryGrid from "../lib/components/CategoryGrid.svelte";
</script>

<main>
  <header>
    <h1>Universal Local Toolbox</h1>
    <p>Useful tools. Zero clutter.</p>
  </header>

  <SearchBar />
  <QuickActions />
  <RecentSection />
  <CategoryGrid />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-5) var(--space-4) var(--space-6);
    max-width: 480px;
    margin: 0 auto;
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
