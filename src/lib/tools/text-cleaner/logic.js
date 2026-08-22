// Each cleaning operation is a pure text -> text function, so they're
// independently testable and can be chained by the UI as the user
// taps more than one.
export function trimLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

export function removeEmptyLines(text) {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}

export function removeDuplicateLines(text) {
  const seen = new Set();
  const result = [];
  for (const line of text.split("\n")) {
    if (!seen.has(line)) {
      seen.add(line);
      result.push(line);
    }
  }
  return result.join("\n");
}

export function collapseSpaces(text) {
  return text.replace(/[ \t]+/g, " ");
}

export function sortLines(text) {
  return text.split("\n").sort((a, b) => a.localeCompare(b)).join("\n");
}
