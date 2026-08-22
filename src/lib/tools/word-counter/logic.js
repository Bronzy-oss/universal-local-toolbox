// Pure text-statistics logic, kept separate from the UI so it can be
// unit tested directly.
export function analyzeText(text) {
  const trimmed = text.trim();
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const sentences =
    trimmed === "" ? 0 : (trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) => s.trim() !== "").length;
  const paragraphs =
    trimmed === "" ? 0 : trimmed.split(/\n\s*\n/).filter((p) => p.trim() !== "").length;
  const readingTimeMinutes = words === 0 ? 0 : Math.max(1, Math.round(words / 200));

  return { characters, charactersNoSpaces, words, sentences, paragraphs, readingTimeMinutes };
}
