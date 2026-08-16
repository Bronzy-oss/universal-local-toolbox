// Single source of truth for every tool in the app — real ones and
// still-placeholder ones alike. Replaces the old separate
// quickActions.js: that was a duplicate, hand-picked list that would
// have drifted from this one as real tools got built.
//
// A tool WITHOUT `load` is a stub: ToolPage shows "coming soon" for
// it. A tool WITH `load` (a function returning a dynamic import) is
// real — its component code is only fetched when opened, per the
// Project Plan's lazy-loading strategy.
export const tools = [
  // --- Sprint 1 (built) ---
  {
    id: "calculator",
    label: "Calculator",
    glyph: "=",
    category: "everyday",
    guide: {
      whatItDoes: "A standard four-function calculator for quick everyday math.",
      steps: [
        "Tap numbers and an operator (+, −, ×, ÷).",
        "Keep entering numbers and operators to chain calculations.",
        "Tap = for the result.",
        "Tap C to clear and start over.",
      ],
      example: "12 × 7 = 84",
    },
    load: () => import("../tools/calculator/Calculator.svelte"),
  },
  {
    id: "unit-converter",
    label: "Unit Converter",
    glyph: "U",
    category: "everyday",
    guide: {
      whatItDoes: "Convert a value between units — length, weight, or temperature.",
      steps: [
        "Choose a category (Length, Weight, or Temperature).",
        "Enter a value and pick the unit you're converting from.",
        "Pick the unit you're converting to.",
        "The result updates automatically.",
      ],
      example: "5 km → 3.11 mi",
    },
    load: () => import("../tools/unit-converter/UnitConverter.svelte"),
  },
  {
    id: "json-formatter",
    label: "JSON Formatter",
    glyph: "{}",
    category: "developer",
    guide: {
      whatItDoes: "Pretty-print or minify JSON, with a clear error if it's invalid.",
      steps: [
        "Paste your JSON into the input box.",
        "Tap Format to pretty-print it, or Minify to compact it.",
        "Tap Copy to copy the result.",
      ],
      example: '{"a":1} → { "a": 1 }',
    },
    load: () => import("../tools/json-formatter/JsonFormatter.svelte"),
  },

  // --- Not built yet (Sprint 4) — kept as Quick Actions per the
  // Project Plan's Home mockup; ToolPage shows "coming soon" for
  // these until their sprint arrives. ---
  {
    id: "compress",
    label: "Compress",
    glyph: "C",
    category: "images",
    isQuickAction: true,
    guide: {
      whatItDoes: "Reduce an image's file size while keeping good visual quality.",
      steps: ["Select an image.", "Choose the quality.", "Tap Compress.", "Save the result."],
      example: "12 MB → 3 MB",
    },
  },
  {
    id: "convert-image",
    label: "Convert",
    glyph: "⇄",
    category: "images",
    isQuickAction: true,
    guide: {
      whatItDoes: "Change a file from one format to another, like PNG to JPG.",
      steps: ["Select a file.", "Choose the output format.", "Tap Convert.", "Save the result."],
      example: "photo.png → photo.jpg",
    },
  },
  {
    id: "image-to-pdf",
    label: "PDF",
    glyph: "PDF",
    category: "documents",
    isQuickAction: true,
    guide: {
      whatItDoes: "Turn one or more images into a single PDF file.",
      steps: [
        "Select one or more images.",
        "Arrange the order if needed.",
        "Tap Create PDF.",
        "Save the result.",
      ],
      example: "3 photos → one PDF",
    },
  },
  {
    id: "qr-generator",
    label: "QR Code",
    glyph: "QR",
    category: "everyday",
    isQuickAction: true,
    guide: {
      whatItDoes: "Create a scannable QR code from text or a link.",
      steps: [
        "Type or paste text or a URL.",
        "Tap Generate.",
        "Save or share the QR code.",
      ],
      example: "https://example.com → QR image",
    },
  },
];

export function getQuickActions() {
  return tools.filter((t) => t.isQuickAction);
}

export function getToolsByCategory(categoryId) {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolById(id) {
  return tools.find((t) => t.id === id);
}
