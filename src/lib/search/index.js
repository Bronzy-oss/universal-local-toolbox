import { quickActions } from "../data/quickActions.js";
import { categories } from "../data/categories.js";

// Placeholder search: case-insensitive substring match over today's
// known items (the 4 quick actions + 7 categories). This becomes the
// real Tool Registry + natural-language matching from the Project
// Plan's Smart Search section once Phase 3/4 land — this is only
// enough to make the search bar honest right now, not the final
// "make picture smaller" style intent matching.
export function searchTools(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const toolResults = quickActions
    .filter((item) => item.label.toLowerCase().includes(q))
    .map((item) => ({ type: "tool", item }));

  const categoryResults = categories
    .filter((item) => item.label.toLowerCase().includes(q))
    .map((item) => ({ type: "category", item }));

  return [...toolResults, ...categoryResults];
}
