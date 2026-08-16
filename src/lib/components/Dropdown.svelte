<script>
  // Generic labeled dropdown: a row showing `label` on the left and
  // the current selection + chevron on the right; tapping expands a
  // connected options list directly below (not a modal/overlay).
  // Extracted from the original theme selector so Unit Converter (and
  // any future tool) can reuse the same pattern instead of
  // reimplementing open/close/outside-click logic each time.
  let { label, options, value, onChange } = $props();

  let isOpen = $state(false);
  let rootEl;

  function toggle() {
    isOpen = !isOpen;
  }

  function select(optionValue) {
    onChange(optionValue);
    isOpen = false;
  }

  function handleWindowClick(event) {
    if (isOpen && rootEl && !rootEl.contains(event.target)) {
      isOpen = false;
    }
  }

  let currentLabel = $derived(
    options.find((o) => o.value === value)?.label ?? "",
  );
</script>

<svelte:window onclick={handleWindowClick} />

<div class="dropdown" bind:this={rootEl}>
  <button type="button" class="trigger" class:open={isOpen} onclick={toggle}>
    <span>{label}</span>
    <span class="value">
      {currentLabel}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </button>

  {#if isOpen}
    <div class="options">
      {#each options as option (option.value)}
        <button
          type="button"
          class:active={value === option.value}
          onclick={() => select(option.value)}
        >
          {option.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-surface);
  }

  .trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9375rem;
    color: var(--color-text);
  }

  .trigger .value {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  .trigger svg {
    transition: transform 0.15s ease;
  }

  .trigger.open svg {
    transform: rotate(180deg);
  }

  .options {
    background: var(--color-bg);
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    max-height: 240px;
    overflow-y: auto;
  }

  .options button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border);
    font-family: inherit;
    font-size: 0.875rem;
    color: var(--color-text);
    cursor: pointer;
  }

  .options button:last-child {
    border-bottom: none;
  }

  .options button.active {
    color: var(--color-accent);
    font-weight: 600;
  }
</style>
