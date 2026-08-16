import { writable } from "svelte/store";

const STORAGE_KEY = "ult:recent-tool-ids";
const MAX_RECENT = 6;

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Stores just tool ids, most-recent-first. Resolved against the
// current quickActions data at render time (see RecentSection.svelte)
// so it can never go stale if guide content changes later.
export const recentToolIds = writable(readStored());

recentToolIds.subscribe((value) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Persistence is best-effort only — not worth failing over.
  }
});

export function recordRecentTool(toolId) {
  recentToolIds.update((ids) =>
    [toolId, ...ids.filter((id) => id !== toolId)].slice(0, MAX_RECENT),
  );
}
