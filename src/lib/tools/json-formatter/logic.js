// Pure JSON formatting logic. Deliberately just the native JSON
// object (JSON.parse/stringify) — this is lightweight, dependency-
// free processing, so it does NOT need to go through the Rust core
// (that's reserved for genuinely heavy work like image/PDF/hash, per
// the Project Plan's Lightweight Strategy).

export function formatJson(input, indent = 2) {
  try {
    const parsed = JSON.parse(input);
    return { success: true, result: JSON.stringify(parsed, null, indent) };
  } catch (error) {
    return { success: false, error: describeError(error, input) };
  }
}

export function minifyJson(input) {
  try {
    const parsed = JSON.parse(input);
    return { success: true, result: JSON.stringify(parsed) };
  } catch (error) {
    return { success: false, error: describeError(error, input) };
  }
}

function describeError(error, input) {
  if (input.trim() === "") return "Enter some JSON first.";
  // Keep the message beginner-friendly rather than a raw parser
  // exception (Project Plan section 34: no raw error codes).
  return "This isn't valid JSON: " + error.message;
}
