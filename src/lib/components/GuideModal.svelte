<script>
  import IconButton from "./IconButton.svelte";

  // Generic "How to use" popup — matches the Project Plan's Guide
  // system (section 8): What does this do? / How to use / Example.
  // Reused by every tool page later; only the props change.
  let { title, whatItDoes, steps, example, onClose } = $props();

  function handleKeydown(event) {
    if (event.key === "Escape") onClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="backdrop">
  <button
    type="button"
    class="backdrop-dismiss"
    onclick={onClose}
    aria-label="Close"
  ></button>

  <div class="modal" role="dialog" aria-modal="true" aria-label={title}>
    <div class="modal-header">
      <h2>{title}</h2>
      <IconButton label="Close" onclick={onClose}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </IconButton>
    </div>

    <div class="modal-section">
      <p class="section-label">What does this do?</p>
      <p>{whatItDoes}</p>
    </div>

    <div class="modal-section">
      <p class="section-label">How to use</p>
      <ol>
        {#each steps as step}
          <li>{step}</li>
        {/each}
      </ol>
    </div>

    {#if example}
      <div class="modal-section">
        <p class="section-label">Example</p>
        <p>{example}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
  }

  .backdrop-dismiss {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .modal {
    position: relative;
    background: var(--color-surface);
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-width: 480px;
    padding: var(--space-5) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-height: 80vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 650;
  }

  .modal-section p.section-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin: 0 0 4px;
  }

  .modal-section p,
  .modal-section ol {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text);
    line-height: 1.5;
  }

  .modal-section ol {
    padding-left: 1.1rem;
  }
</style>
