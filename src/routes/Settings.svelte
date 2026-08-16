<script>
  import IconButton from "../lib/components/IconButton.svelte";
  import Section from "../lib/components/Section.svelte";
  import ThemeToggle from "../lib/components/ThemeToggle.svelte";

  let { onBack } = $props();
</script>

<main>
  <div class="settings-header">
    <IconButton label="Back" onclick={onBack}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </IconButton>
    <h1>Settings</h1>
  </div>

  <Section label="Appearance">
    <ThemeToggle />
  </Section>
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

  .settings-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .settings-header h1 {
    font-size: 1.125rem;
    font-weight: 650;
    margin: 0;
  }
</style>
