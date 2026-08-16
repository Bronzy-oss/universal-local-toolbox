<script>
  import { themePreference } from "../stores/theme.js";

  const options = [
    { value: "system", label: "System" },
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
</script>

<div class="segmented">
  {#each options as option (option.value)}
    <button
      type="button"
      class:active={$themePreference === option.value}
      onclick={() => themePreference.set(option.value)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .segmented {
    display: flex;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 4px;
    gap: 4px;
  }

  .segmented button {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px 0;
    border-radius: 14px;
    font-size: 0.875rem;
    font-weight: 550;
    color: var(--color-text-muted);
    cursor: pointer;
    font-family: inherit;
  }

  .segmented button.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }
</style>
