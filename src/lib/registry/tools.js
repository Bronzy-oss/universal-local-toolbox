// Single source of truth for every tool in the app — real ones and
// still-placeholder ones alike.
//
// A tool WITHOUT `load` is a stub: ToolPage shows "coming soon" for
// it. A tool WITH `load` (a function returning a dynamic import) is
// real — its component code is only fetched when opened, per the
// Project Plan's lazy-loading strategy.
//
// `icon` (an imported image) is used when available; tools without
// one fall back to the `glyph` monogram placeholder.
import iconCalculator from "../../assets/icons/calculator.png";
import iconUnitConverter from "../../assets/icons/unit-converter.png";
import iconJsonFormatter from "../../assets/icons/json-formatter.png";
import iconCompress from "../../assets/icons/compress.png";
import iconConvertImage from "../../assets/icons/convert-image.png";
import iconImageToPdf from "../../assets/icons/image-to-pdf.png";
import iconQrGenerator from "../../assets/icons/qr-generator.png";
import iconFileManager from "../../assets/icons/file-manager.png";
import iconDateCalculator from "../../assets/icons/date-calculator.png";
import iconWordCounter from "../../assets/icons/word-counter.png";
import iconTextCleaner from "../../assets/icons/text-cleaner.png";
import iconCaseConverter from "../../assets/icons/case-converter.png";
import iconTextDiff from "../../assets/icons/text-diff.png";
import iconBase64 from "../../assets/icons/base64.png";
import iconUuidGenerator from "../../assets/icons/uuid-generator.png";
import iconHashGenerator from "../../assets/icons/hash-generator.png";
import iconColorConverter from "../../assets/icons/color-converter.png";
import iconColorPicker from "../../assets/icons/color-picker.png";

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
    // No `load` yet — implementation approach still being worked out
    // (Storage Access Framework folder picker). "Coming soon" stub
    // for now, same as the other unbuilt tools.
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

  // --- Sprint 2 (built) ---
  {
    id: "date-calculator",
    label: "Date Calculator",
    glyph: "D",
    icon: iconDateCalculator,
    category: "everyday",
    guide: {
      whatItDoes: "Find the difference between two dates, or add/subtract days from a date.",
      steps: [
        "Choose Difference or Add/Subtract mode.",
        "Enter the date(s).",
        "The result updates automatically.",
      ],
      example: "2024-01-10 → 2025-03-13 = 1y 2m 3d",
    },
    load: () => import("../tools/date-calculator/DateCalculator.svelte"),
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
        "The QR code updates automatically.",
        "Tap Save as SVG to keep it.",
      ],
      example: "https://example.com → QR image",
    },
    load: () => import("../tools/qr-generator/QrGenerator.svelte"),
  },
  {
    id: "word-counter",
    label: "Word Counter",
    glyph: "W",
    icon: iconWordCounter,
    category: "text",
    guide: {
      whatItDoes: "Count words, characters, sentences, and paragraphs in your text.",
      steps: ["Paste or type text.", "Stats update automatically as you type."],
      example: "\"Hello world.\" → 2 words, 1 sentence",
    },
    load: () => import("../tools/word-counter/WordCounter.svelte"),
  },
  {
    id: "text-cleaner",
    label: "Text Cleaner",
    glyph: "Tc",
    icon: iconTextCleaner,
    category: "text",
    guide: {
      whatItDoes: "Clean up messy text — trim lines, remove duplicates, collapse spaces, sort.",
      steps: [
        "Paste your text.",
        "Tap any cleaning action to apply it.",
        "Actions can be combined by tapping more than one.",
      ],
      example: "Removes blank lines, duplicate lines, extra spaces",
    },
    load: () => import("../tools/text-cleaner/TextCleaner.svelte"),
  },
  {
    id: "case-converter",
    label: "Case Converter",
    glyph: "Aa",
    icon: iconCaseConverter,
    category: "text",
    guide: {
      whatItDoes: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, and more.",
      steps: ["Type or paste text.", "Tap the case style you want."],
      example: "hello world → helloWorld",
    },
    load: () => import("../tools/case-converter/CaseConverter.svelte"),
  },
  {
    id: "text-diff",
    label: "Text Diff",
    glyph: "Δ",
    icon: iconTextDiff,
    category: "text",
    guide: {
      whatItDoes: "Compare two pieces of text and highlight what changed, line by line.",
      steps: [
        "Paste the original text on top.",
        "Paste the changed text below.",
        "Tap Compare.",
      ],
      example: "Added lines shown in green, removed lines in red",
    },
    load: () => import("../tools/text-diff/TextDiff.svelte"),
  },

  // --- Sprint 3 (built) ---
  {
    id: "base64",
    label: "Base64",
    glyph: "B64",
    icon: iconBase64,
    category: "developer",
    guide: {
      whatItDoes: "Encode text to Base64, or decode Base64 back to text.",
      steps: ["Paste text or Base64.", "Tap Encode or Decode."],
      example: "hello → aGVsbG8=",
    },
    load: () => import("../tools/base64/Base64Tool.svelte"),
  },
  {
    id: "uuid-generator",
    label: "UUID Generator",
    glyph: "ID",
    icon: iconUuidGenerator,
    category: "developer",
    guide: {
      whatItDoes: "Generate random UUIDs (v4) for use as unique identifiers.",
      steps: ["Tap Generate for one, or Generate 5 for a batch.", "Tap any UUID to copy it."],
      example: "a5a1c562-45cf-4818-97be-ddee2a0d170b",
    },
    load: () => import("../tools/uuid-generator/UuidGenerator.svelte"),
  },
  {
    id: "hash-generator",
    label: "Hash Generator",
    glyph: "#",
    icon: iconHashGenerator,
    category: "developer",
    guide: {
      whatItDoes: "Compute MD5, SHA-1, SHA-256, and SHA-512 hashes of text.",
      steps: ["Type or paste text.", "Tap Generate Hashes.", "Tap any hash to copy it."],
      example: '"hello world" → SHA-256: b94d27b9…',
    },
    load: () => import("../tools/hash-generator/HashGenerator.svelte"),
  },
  {
    id: "color-converter",
    label: "Color Converter",
    glyph: "Cv",
    icon: iconColorConverter,
    category: "developer",
    guide: {
      whatItDoes: "Convert a color between HEX, RGB, and HSL formats.",
      steps: ["Enter a hex color.", "RGB and HSL values update automatically.", "Tap either to copy."],
      example: "#2563eb → rgb(37, 99, 235) → hsl(221, 83%, 53%)",
    },
    load: () => import("../tools/color-converter/ColorConverter.svelte"),
  },
  {
    id: "color-picker",
    label: "Color Picker",
    glyph: "🎨",
    icon: iconColorPicker,
    category: "developer",
    guide: {
      whatItDoes:
        "Pick a color visually and get every code for it, plus matching shades and color-scheme suggestions — like htmlcolorcodes.com, built into the app.",
      steps: [
        "Tap the color swatch to open the picker.",
        "HEX, RGB, and HSL codes update automatically — tap any to copy.",
        "Scroll down for shades and harmony suggestions (complementary, analogous, triadic, tetradic) — tap any swatch to copy its code.",
      ],
      example: "Pick a blue → get its complementary orange, triadic set, and 7 shades",
    },
    load: () => import("../tools/color-picker/ColorPicker.svelte"),
  },

  // --- Not built yet (Sprint 4 — needs real file access) ---
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
];

export function getToolsByCategory(categoryId) {
  return tools.filter((t) => t.category === categoryId);
}

export function getToolById(id) {
  return tools.find((t) => t.id === id);
}
