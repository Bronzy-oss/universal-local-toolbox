<script>
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import CategoryPage from "./routes/CategoryPage.svelte";
  import ToolPage from "./routes/ToolPage.svelte";

  // A real navigation stack — not just a single "current view" like
  // before. That earlier version made Back always jump straight to
  // Home, even from Home -> Category -> Tool, which skipped the
  // Category screen entirely. Home always stays at the bottom of the
  // stack and is never popped away.
  let stack = $state([{ name: "home" }]);
  let current = $derived(stack[stack.length - 1]);

  function push(view) {
    stack = [...stack, view];
  }

  function goBack() {
    if (stack.length > 1) stack = stack.slice(0, -1);
  }
</script>

{#if current.name === "settings"}
  <Settings onBack={goBack} />
{:else if current.name === "category"}
  <CategoryPage
    category={current.category}
    onBack={goBack}
    onOpenTool={(tool) => push({ name: "tool", tool })}
  />
{:else if current.name === "tool"}
  <ToolPage tool={current.tool} onBack={goBack} />
{:else}
  <Home
    onOpenSettings={() => push({ name: "settings" })}
    onOpenCategory={(category) => push({ name: "category", category })}
    onOpenTool={(tool) => push({ name: "tool", tool })}
  />
{/if}
