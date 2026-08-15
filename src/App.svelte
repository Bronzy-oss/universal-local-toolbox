<script>
  // Empty-shell placeholder for Phase 1.
  // Home screen, universal search, and category grid are built in
  // Phase 2 (see the approved Project Plan's UI/UX Structure and
  // Development Roadmap sections). This component only proves the
  // Tauri + Svelte + Vite pipeline renders correctly end to end.
  const appName = "Universal Local Toolbox";
  const tagline = "Useful tools. Zero clutter.";
</script>

<main>
  <header>
    <h1>{appName}</h1>
    <p class="tagline">{tagline}</p>
  </header>

  <section class="placeholder">
    <p>Empty shell — Phase 1 scaffold.</p>
    <p>Home, Search, and Categories arrive in Phase 2.</p>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  .tagline {
    margin: 0;
    color: var(--color-text-muted);
  }

  .placeholder {
    margin-top: 2rem;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
  }
</style>
