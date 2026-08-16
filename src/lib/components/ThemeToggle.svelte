<script>
  import { themePreference } from "../stores/theme.js";

  const labels = { system: "System", light: "Light", dark: "Dark" };
  // Order matters: System on top, then Light, then Dark, as requested.
  const options = ["system", "light", "dark"];

  let isOpen = $state(false);
  let rootEl;

  function toggle() {
    isOpen = !isOpen;
  }

  function select(value) {
    themePreference.set(value);
    isOpen = false;
  }

  function handleWindowClick(event) {
    if (isOpen && rootEl && !rootEl.contains(event.target)) {
      isOpen = false;
    }
  }
</script>

<svelte:window onclick={handleWindowClick} />

<div class="dropdown" bind:this={rootEl}>
  <button type="button" class="trigger" class:open={isOpen} onclick={toggle}>
    <span>Appearance</span>
    <span class="value">
      {labels[$themePreference]}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </button>

  {#if isOpen}
    <div class="options">
      {#each options as value (value)}
        <button
          type="button"
          class:active={$themePreference === value}
          onclick={() => select(value)}
        >
          {labels[value]}
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
