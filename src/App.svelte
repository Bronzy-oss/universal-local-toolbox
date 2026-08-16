<script>
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import CategoryPage from "./routes/CategoryPage.svelte";
  import ToolPage from "./routes/ToolPage.svelte";

  // Still a simple local view-switch, not a real router — fine while
  // navigation is this shallow (Home + 3 leaf screens, all one level
  // deep). Revisit if it ever needs real history/back-button support.
  let view = $state({ name: "home" });

  function goHome() {
    view = { name: "home" };
  }
</script>

{#if view.name === "settings"}
  <Settings onBack={goHome} />
{:else if view.name === "category"}
  <CategoryPage category={view.category} onBack={goHome} />
{:else if view.name === "tool"}
  <ToolPage tool={view.tool} onBack={goHome} />
{:else}
  <Home
    onOpenSettings={() => (view = { name: "settings" })}
    onOpenCategory={(category) => (view = { name: "category", category })}
    onOpenTool={(tool) => (view = { name: "tool", tool })}
  />
{/if}
