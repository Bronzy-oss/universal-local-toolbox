<script>
  import { encodeBase64, decodeBase64 } from "./logic.js";

  let input = $state("");
  let output = $state("");
  let error = $state("");

  function runEncode() {
    try {
      output = encodeBase64(input);
      error = "";
    } catch {
      output = "";
      error = "Couldn't encode this text.";
    }
  }

  function runDecode() {
    try {
      output = decodeBase64(input);
      error = "";
    } catch {
      output = "";
      error = "This isn't valid Base64.";
    }
  }

  function swap() {
    input = output;
    output = "";
    error = "";
  }

  function clearAll() {
    input = "";
    output = "";
    error = "";
  }
</script>

<div class="base64-tool">
  <div class="field">
    <label for="b64-input">Input</label>
    <textarea id="b64-input" bind:value={input} placeholder="Text or Base64…" rows="6"></textarea>
  </div>

  <div class="actions">
    <button type="button" class="btn primary" onclick={runEncode}>Encode</button>
    <button type="button" class="btn primary" onclick={runDecode}>Decode</button>
    <button type="button" class="btn" onclick={clearAll}>Clear</button>
  </div>

  {#if error}
    <div class="error-box"><p>{error}</p></div>
  {/if}

  {#if output}
    <div class="field">
      <div class="output-header">
        <label for="b64-output">Output</label>
        <button type="button" class="link-btn" onclick={swap}>Use as input ↑</button>
      </div>
      <textarea id="b64-output" readonly rows="6">{output}</textarea>
    </div>
  {/if}
</div>

<style>
  .base64-tool {
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
    font-size: 0.8125rem;
    font-family: "SFMono-Regular", Consolas, monospace;
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

  .link-btn {
    background: transparent;
    border: none;
    color: var(--color-accent);
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
</style>
