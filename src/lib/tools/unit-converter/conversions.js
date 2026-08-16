// Pure conversion logic, kept separate from the .svelte component so
// it can be unit tested directly with plain Node.
//
// V1 covers Length, Weight, and Temperature — the three most commonly
// needed (Area/Volume/Speed/Storage from the Project Plan's list are
// straightforward to add the same way later; not included now to
// avoid shipping a half-finished 7-category picker for this batch).
export const categories = {
  length: {
    label: "Length",
    units: {
      m: { label: "Meters", factor: 1 },
      km: { label: "Kilometers", factor: 1000 },
      cm: { label: "Centimeters", factor: 0.01 },
      mm: { label: "Millimeters", factor: 0.001 },
      mi: { label: "Miles", factor: 1609.344 },
      yd: { label: "Yards", factor: 0.9144 },
      ft: { label: "Feet", factor: 0.3048 },
      in: { label: "Inches", factor: 0.0254 },
    },
  },
  weight: {
    label: "Weight",
    units: {
      kg: { label: "Kilograms", factor: 1 },
      g: { label: "Grams", factor: 0.001 },
      lb: { label: "Pounds", factor: 0.45359237 },
      oz: { label: "Ounces", factor: 0.028349523125 },
    },
  },
  temperature: {
    label: "Temperature",
    // No `factor` — temperature needs an offset, not just scaling,
    // so it's handled separately in convert() below.
    units: {
      c: { label: "Celsius" },
      f: { label: "Fahrenheit" },
      k: { label: "Kelvin" },
    },
  },
};

export function convert(categoryId, value, fromUnit, toUnit) {
  if (Number.isNaN(value)) return NaN;
  if (categoryId === "temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }
  const units = categories[categoryId].units;
  const meters = value * units[fromUnit].factor;
  return meters / units[toUnit].factor;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;

  let celsius;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15; // from === "k"

  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15; // to === "k"
}

export function formatNumber(value) {
  if (Number.isNaN(value)) return "";
  // Up to 4 decimal places, trimmed of trailing zeros.
  return String(Math.round(value * 10000) / 10000);
}
