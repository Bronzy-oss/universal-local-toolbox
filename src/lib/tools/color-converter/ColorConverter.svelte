<script>
  import { hexToRgb, rgbToHsl, formatRgb, formatHsl } from "./logic.js";

  let hex = $state("#2563eb");
  let error = $state("");

  let rgb = $derived.by(() => {
    try {
      const value = hexToRgb(hex);
      error = "";
      return value;
    } catch {
      error = "Enter a valid hex color, like #2563eb.";
      return null;
    }
  });

  let hsl = $derived(rgb ? rgbToHsl(rgb) : null);
  let rgbText = $derived(rgb ? formatRgb(rgb) : "");
  let hslText = $derived(hsl ? formatHsl(hsl) : "");

  let copiedField = $state("");
  async function copy(text, field) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      copiedField = field;
      setTimeout(() => (copiedField = ""), 1200);
    } catch {
      // clipboard unavailable — skip confirmation
    }
  }
</script>

<div class="color-tool">
  <div class="field">
    <label for="hex-input">Hex color</label>
    <div class="hex-input-row">
      <input id="hex-input" type="text" bind:value={hex} placeholder="#2563eb" />
      {#if rgb}
        <span class="swatch" style="background: {hex};"></span>
      {/if}
    </div>
  </div>

  {#if error}
    <div class="error-box"><p>{error}</p></div>
  {/if}

  {#if rgb}
    <button type="button" class="value-row" onclick={() => copy(rgbText, "rgb")}>
      <span class="value-label">RGB</span>
      <span class="value-text">{rgbText}</span>
      <span class="copy-label">{copiedField === "rgb" ? "Copied!" : "Copy"}</span>
    </button>
    <button type="button" class="value-row" onclick={() => copy(hslText, "hsl")}>
      <span class="value-label">HSL</span>
      <span class="value-text">{hslText}</span>
      <span class="copy-label">{copiedField === "hsl" ? "Copied!" : "Copy"}</span>
    </button>
  {/if}
</div>

<style>
  .color-tool {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .hex-input-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  input {
    flex: 1;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 13px 16px;
    font-size: 0.9375rem;
    font-family: "SFMono-Regular", Consolas, monospace;
    background: var(--color-surface);
    color: var(--color-text);
  }

  input:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
  }

  .swatch {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
  }

  .error-box {
    background: var(--color-error-bg);
    border-radius: var(--radius-md);
    padding: var(--space-3);
  }

  .error-box p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-error-text);
  }

  .value-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 13px 16px;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
  }

  .value-label {
    flex-shrink: 0;
    font-size: 0.6875rem;
    font-weight: 700;
    color: var(--color-accent);
    width: 32px;
  }

  .value-text {
    flex: 1;
    font-size: 0.875rem;
    font-family: "SFMono-Regular", Consolas, monospace;
    color: var(--color-text);
  }

  .copy-label {
    flex-shrink: 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }
</style>
