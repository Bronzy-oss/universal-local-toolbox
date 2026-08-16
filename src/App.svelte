<script>
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";

  // Simple local view-switch — no router needed yet for two screens.
  // Revisit once Search / Category-detail / Guide screens need real
  // navigation (Phase 3+).
  let view = $state("home");
</script>

{#if view === "settings"}
  <Settings onBack={() => (view = "home")} />
{:else}
  <Home onOpenSettings={() => (view = "settings")} />
{/if}
