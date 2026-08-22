<script>
  import { buildQrMatrix } from "./logic.js";

  let text = $state("");
  let error = $state("");

  let matrix = $derived.by(() => {
    if (!text.trim()) {
      error = "";
      return null;
    }
    try {
      const m = buildQrMatrix(text.trim());
      error = "";
      return m;
    } catch {
      error = "Couldn't generate a QR code for this text — try shortening it.";
      return null;
    }
  });

  const VIEWBOX_SIZE = 100;
  let cellSize = $derived(matrix ? VIEWBOX_SIZE / matrix.length : 0);

  function downloadSvg() {
    if (!matrix) return;
    const svgEl = document.getElementById("qr-svg");
    const serialized = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([serialized], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="qr-tool">
  <div class="field">
    <label for="qr-input">Text or link</label>
    <textarea id="qr-input" bind:value={text} placeholder="https://example.com" rows="3"></textarea>
  </div>

  {#if error}
    <div class="error-box"><p>{error}</p></div>
  {/if}

  {#if matrix}
    <div class="qr-preview">
      <svg
        id="qr-svg"
        viewBox="0 0 {VIEWBOX_SIZE} {VIEWBOX_SIZE}"
        width="240"
        height="240"
        role="img"
        aria-label="Generated QR code"
      >
        <rect width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill="#ffffff" />
        {#each matrix as row, r (r)}
          {#each row as isDark, c (c)}
            {#if isDark}
              <rect x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#000000" />
            {/if}
          {/each}
        {/each}
      </svg>
    </div>
    <button type="button" class="btn primary" onclick={downloadSvg}>Save as SVG</button>
  {/if}
</div>

<style>
  .qr-tool {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
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

  textarea {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 12px;
    font-size: 0.9375rem;
    font-family: inherit;
    background: var(--color-surface);
    color: var(--color-text);
    resize: vertical;
  }

  textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
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

  .qr-preview {
    display: flex;
    justify-content: center;
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
  }

  .btn {
    padding: 12px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 550;
  }

  .btn.primary {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
</style>
