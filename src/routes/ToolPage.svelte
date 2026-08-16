<script>
  import PageHeader from "../lib/components/PageHeader.svelte";
  import IconButton from "../lib/components/IconButton.svelte";
  import GuideModal from "../lib/components/GuideModal.svelte";
  import { recordRecentTool } from "../lib/stores/recent.js";

  let { tool, onBack } = $props();
  let showGuide = $state(false);

  $effect(() => {
    recordRecentTool(tool.id);
  });
</script>

<main>
  <PageHeader title={tool.label} {onBack}>
    <IconButton label="How to use" onclick={() => (showGuide = true)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </IconButton>
  </PageHeader>

  <div class="empty-state">
    <p>This tool is coming soon.</p>
  </div>
</main>

{#if showGuide}
  <GuideModal
    title={tool.label}
    whatItDoes={tool.guide.whatItDoes}
    steps={tool.guide.steps}
    example={tool.guide.example}
    onClose={() => (showGuide = false)}
  />
{/if}

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-5) var(--space-4) var(--space-6);
    max-width: 480px;
    margin: 0 auto;
  }

  .empty-state {
    border: 1.5px dashed var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5) var(--space-4);
    text-align: center;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
</style>
