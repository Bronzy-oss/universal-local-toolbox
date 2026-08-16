<script>
  import PageHeader from "../lib/components/PageHeader.svelte";
  import ThemeToggle from "../lib/components/ThemeToggle.svelte";

  let { onBack } = $props();
</script>

<main>
  <PageHeader title="Settings" {onBack} />
  <ThemeToggle />
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
</style>
