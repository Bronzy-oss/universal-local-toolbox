<script>
  import { formatJson, minifyJson } from "./logic.js";

  let input = $state("");
  let output = $state("");
  let error = $state("");
  let copied = $state(false);

  function applyResult(r) {
    if (r.success) {
      output = r.result;
      error = "";
    } else {
      output = "";
      error = r.error;
    }
  }

  function runFormat() {
    applyResult(formatJson(input));
  }

  function runMinify() {
    applyResult(minifyJson(input));
  }

  function clearAll() {
    input = "";
    output = "";
    error = "";
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {
      // Clipboard access can fail (permissions) — not critical enough
      // to show a scary error over, just skip the confirmation.
    }
  }
</script>

<div class="json-formatter">
  <div class="field">
    <label for="json-input">Input</label>
    <textarea
      id="json-input"
      bind:value={input}
      placeholder="Paste JSON here…"
      rows="7"
    ></textarea>
  </div>

  <div class="actions">
    <button type="button" class="btn primary" onclick={runFormat}>Format</button>
    <button type="button" class="btn" onclick={runMinify}>Minify</button>
    <button type="button" class="btn" onclick={clearAll}>Clear</button>
  </div>

  {#if error}
    <div class="error-box">
      <p>{error}</p>
    </div>
  {/if}

  {#if output}
    <div class="field">
      <div class="output-header">
        <label for="json-output">Output</label>
        <button type="button" class="copy-btn" onclick={copyOutput}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <textarea id="json-output" readonly rows="7">{output}</textarea>
    </div>
  {/if}
</div>

<style>
  .json-formatter {
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
    font-family: "SFMono-Regular", Consolas, monospace;
    font-size: 0.8125rem;
    background: var(--color-surface);
    color: var(--color-text);
    resize: vertical;
  }

  textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: -1px;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .btn {
    padding: 10px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 550;
  }

  .btn.primary {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
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

  .output-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .copy-btn {
    background: transparent;
    border: none;
    color: var(--color-accent);
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
</style>
