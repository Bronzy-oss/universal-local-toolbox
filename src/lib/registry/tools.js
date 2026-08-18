// Single source of truth for every tool in the app — real ones and
// still-placeholder ones alike. Replaces the old separate
// quickActions.js: that was a duplicate, hand-picked list that would
// have drifted from this one as real tools got built.
//
// A tool WITHOUT `load` is a stub: ToolPage shows "coming soon" for
// it. A tool WITH `load` (a function returning a dynamic import) is
// real — its component code is only fetched when opened, per the
// Project Plan's lazy-loading strategy.
//
// `icon` (an imported image) is used when available; tools without
// one fall back to the `glyph` monogram placeholder. Icons are added
// as each tool is built/reaches this list — not a bulk asset dump.
import iconCalculator from "../../assets/icons/calculator.png";
import iconUnitConverter from "../../assets/icons/unit-converter.png";
import iconJsonFormatter from "../../assets/icons/json-formatter.png";
import iconCompress from "../../assets/icons/compress.png";
import iconConvertImage from "../../assets/icons/convert-image.png";
import iconImageToPdf from "../../assets/icons/image-to-pdf.png";
import iconQrGenerator from "../../assets/icons/qr-generator.png";
import iconFileManager from "../../assets/icons/file-manager.png";

export const tools = [
  // --- Sprint 1 (built) ---
  {
    id: "calculator",
    label: "Calculator",
    glyph: "=",
    icon: iconCalculator,
    category: "everyday",
    guide: {
      whatItDoes:
        "A calculator with a Basic mode for everyday math and a Scientific mode for trig, logs, and more.",
      steps: [
        "Type a full expression, like a real calculator — e.g. 12×7 or sin(30).",
        "Tap Scientific for trig/log/power functions; tap DEG/RAD to switch angle units.",
        "Tap ⌫ to correct a mistake, or AC to start over.",
        "Tap = to see the result; the expression you typed stays visible above it.",
      ],
      example: "157,000 × 120 = 18,840,000",
    },
    load: () => import("../tools/calculator/Calculator.svelte"),
  },
  {
    id: "unit-converter",
    label: "Unit Converter",
    glyph: "U",
    icon: iconUnitConverter,
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
    icon: iconJsonFormatter,
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
  {
    id: "file-manager",
    label: "File Manager",
    glyph: "F",
    icon: iconFileManager,
    category: "files",
    // No `load` yet — implementation approach (folder-picker vs. full
    // device access) is still an open decision, so this is honestly a
    // "coming soon" stub for now, same as the other unbuilt tools.
    guide: {
      whatItDoes: "Browse the files and folders on your device, and open them.",
      steps: [
        "Tap a folder to open it.",
        "Tap ← to go back up a level.",
        "Tap a file to open it with your device's default app for that file type.",
      ],
      example: "Downloads → photo.jpg → opens in your gallery app",
    },
  },

  // --- Not built yet (Sprint 4) — kept as Quick Actions per the
  // Project Plan's Home mockup; ToolPage shows "coming soon" for
  // these until their sprint arrives. ---
  {
    id: "compress",
    label: "Compress",
    glyph: "C",
    icon: iconCompress,
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
    icon: iconConvertImage,
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
    icon: iconImageToPdf,
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
    icon: iconQrGenerator,
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

export function getToolsByCategory(categoryId) {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolById(id) {
  return tools.find((t) => t.id === id);
}
