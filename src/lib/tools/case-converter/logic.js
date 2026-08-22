// Each converter is a pure string -> string function.
export function toUpperCase(t) {
  return t.toUpperCase();
}

export function toLowerCase(t) {
  return t.toLowerCase();
}

export function toTitleCase(t) {
  return t.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

export function toSentenceCase(t) {
  const lower = t.toLowerCase();
  return lower.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (match) => match.toUpperCase());
}

function words(t) {
  return t.match(/[a-zA-Z0-9]+/g) || [];
}

export function toCamelCase(t) {
  return words(t)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}

export function toPascalCase(t) {
  return words(t)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(t) {
  return words(t)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toKebabCase(t) {
  return words(t)
    .map((w) => w.toLowerCase())
    .join("-");
}
