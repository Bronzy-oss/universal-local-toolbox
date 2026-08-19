<script>
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import CategoryPage from "./routes/CategoryPage.svelte";
  import ToolPage from "./routes/ToolPage.svelte";

  // A navigation stack where every visited screen stays mounted (just
  // hidden via CSS `display: none`) while it's still in the stack,
  // instead of being destroyed and recreated. That's what makes Back
  // restore exactly where you were — scroll position included —
  // rather than resetting Home (or any screen) to the top every time.
  // Verified with a standalone prototype: display:none genuinely
  // preserves scrollTop for when the element is shown again.
  let stack = $state([{ name: "home", key: 0 }]);
  let nextKey = 1;

  function push(view) {
    stack = [...stack, { ...view, key: nextKey++ }];
  }

  function goBack() {
    if (stack.length > 1) stack = stack.slice(0, -1);
  }
</script>

{#each stack as view, i (view.key)}
  <div class="layer" class:hidden={i !== stack.length - 1}>
    {#if view.name === "home"}
      <Home
        onOpenSettings={() => push({ name: "settings" })}
        onOpenCategory={(category) => push({ name: "category", category })}
        onOpenTool={(tool) => push({ name: "tool", tool })}
      />
    {:else if view.name === "settings"}
      <Settings onBack={goBack} />
    {:else if view.name === "category"}
      <CategoryPage
        category={view.category}
        onBack={goBack}
        onOpenTool={(tool) => push({ name: "tool", tool })}
      />
    {:else if view.name === "tool"}
      <ToolPage tool={view.tool} onBack={goBack} />
    {/if}
  </div>
{/each}

<style>
  .layer.hidden {
    display: none;
  }
</style>
