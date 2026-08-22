// crypto.randomUUID() is a standard Web API, available in the Tauri
// WebView on both Android and desktop — no library needed for
// generation itself. These helpers just handle formatting.
export function generateUuid() {
  return crypto.randomUUID();
}

export function generateMany(count) {
  return Array.from({ length: count }, () => generateUuid());
}

export function format(uuid, { uppercase = false, dashes = true } = {}) {
  let result = dashes ? uuid : uuid.replace(/-/g, "");
  return uppercase ? result.toUpperCase() : result;
}
