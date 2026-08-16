import { writable, get } from "svelte/store";

// Keep this in sync with the inline anti-flash script in index.html —
// both need the same key to agree on the stored preference.
const STORAGE_KEY = "ult:theme-preference";
const VALID = ["system", "light", "dark"];

function readStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return VALID.includes(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function applyTheme(preference) {
  if (typeof document === "undefined") return;
  const effective =
    preference === "system"
      ? systemPrefersDark()
        ? "dark"
        : "light"
      : preference;
  document.documentElement.setAttribute("data-theme", effective);
}

export const themePreference = writable(readStored());

themePreference.subscribe((value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Persistence is best-effort — not worth failing over.
  }
  applyTheme(value);
});

// If preference is "system", keep following the OS when it changes
// while the app is open.
if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (get(themePreference) === "system") applyTheme("system");
    });
}
