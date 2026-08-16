// Matches the Project Plan's Quick Actions example. Guide content
// follows the same What it does / How to use / Example shape as the
// Project Plan's Guide/Help section — actual tool logic is still
// Phase 3, this only proves the Guide popup pattern end to end.
export const quickActions = [
  {
    id: "compress",
    label: "Compress",
    glyph: "C",
    guide: {
      whatItDoes:
        "Reduce an image's file size while keeping good visual quality.",
      steps: [
        "Select an image.",
        "Choose the quality.",
        "Tap Compress.",
        "Save the result.",
      ],
      example: "12 MB → 3 MB",
    },
  },
  {
    id: "convert",
    label: "Convert",
    glyph: "⇄",
    guide: {
      whatItDoes: "Change a file from one format to another, like PNG to JPG.",
      steps: [
        "Select a file.",
        "Choose the output format.",
        "Tap Convert.",
        "Save the result.",
      ],
      example: "photo.png → photo.jpg",
    },
  },
  {
    id: "image-to-pdf",
    label: "PDF",
    glyph: "PDF",
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
