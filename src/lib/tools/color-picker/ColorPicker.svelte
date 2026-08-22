<script>
  import { getHarmonies, getShades, toRgbString, toHslString } from "./logic.js";

  let hex = $state("#2563eb");

  let rgbText = $derived(toRgbString(hex));
  let hslText = $derived(toHslString(hex));
  let shades = $derived(getShades(hex));
  let harmonies = $derived(getHarmonies(hex));

  let copiedText = $state("");
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      copiedText = text;
      setTimeout(() => (copiedText = ""), 1200);
    } catch {
      // clipboard unavailable — skip the confirmation
    }
  }

  const harmonyLabels = {
    complementary: "Complementary",
    analogous: "Analogous",
    triadic: "Triadic",
    tetradic: "Tetradic",
  };
</script>

<div class="color-picker">
  <!-- Simple, familiar picker up top — tap the swatch to open your
       device's own color picker. Codes are right there, no extra taps. -->
  <div class="picker-row">
    <input type="color" bind:value={hex} aria-label="Pick a color" class="native-picker" />
    <div class="codes">
      <button type="button" class="code-row" onclick={() => copy(hex)}>
        <span class="code-label">HEX</span>
        <span class="code-value">{hex}</span>
      </button>
      <button type="button" class="code-row" onclick={() => copy(rgbText)}>
        <span class="code-label">RGB</span>
        <span class="code-value">{rgbText}</span>
      </button>
      <button type="button" class="code-row" onclick={() => copy(hslText)}>
        <span class="code-label">HSL</span>
        <span class="code-value">{hslText}</span>
      </button>
    </div>
  </div>
  {#if copiedText}
    <p class="copied-toast">Copied {copiedText}</p>
  {/if}

  <div class="section">
    <p class="section-label">Shades</p>
    <div class="swatch-row">
      {#each shades as shade (shade)}
        <button
          type="button"
          class="swatch"
          style="background: {shade};"
          onclick={() => copy(shade)}
          aria-label={shade}
        ></button>
      {/each}
    </div>
  </div>

  <div class="section">
    <p class="section-label">Harmonies</p>
    <p class="section-hint">Other colors that pair well with yours — tap any swatch to copy its hex code.</p>
    {#each Object.entries(harmonies) as [key, colors] (key)}
      <div class="harmony-group">
        <p class="harmony-name">{harmonyLabels[key]}</p>
        <div class="swatch-row">
          {#each colors as color, i (key + i)}
            <button
              type="button"
              class="swatch"
              style="background: {color};"
              onclick={() => copy(color)}
              aria-label={color}
            ></button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .color-picker {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .picker-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .native-picker {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    padding: 0;
    background: none;
    cursor: pointer;
  }

  .codes {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .code-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 8px 12px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
  }

  .code-label {
    flex-shrink: 0;
    width: 32px;
    font-size: 0.6875rem;
    font-weight: 700;
    color: var(--color-accent);
  }

  .code-value {
    font-size: 0.8125rem;
    font-family: "SFMono-Regular", Consolas, monospace;
    color: var(--color-text);
  }

  .copied-toast {
    margin: -8px 0 0;
    font-size: 0.75rem;
    color: var(--color-accent);
    text-align: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .section-label {
    margin: 0;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .section-hint {
    margin: -4px 0 4px;
    font-size: 0.8125rem;
    color: var(--color-text-muted);
  }

  .harmony-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .harmony-name {
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 550;
    color: var(--color-text);
  }

  .swatch-row {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .swatch {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    cursor: pointer;
    flex-shrink: 0;
  }
</style>
