import { tools } from "../registry/tools.js";
import { categories } from "../data/categories.js";

// Placeholder search: case-insensitive substring match over today's
// known items. This becomes the real natural-language / intent
// matching from the Project Plan's Smart Search section in Phase 4 —
// this is only enough to make the search bar honest right now.
export function searchTools(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const toolResults = tools
    .filter((item) => item.label.toLowerCase().includes(q))
    .map((item) => ({ type: "tool", item }));

  const categoryResults = categories
    .filter((item) => item.label.toLowerCase().includes(q))
    .map((item) => ({ type: "category", item }));

  return [...toolResults, ...categoryResults];
}
