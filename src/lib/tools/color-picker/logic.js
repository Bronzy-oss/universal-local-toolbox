// Builds on the existing Color Converter's conversion math (imported,
// not duplicated) to add: shades/tints and standard color-theory
// harmonies (complementary, analogous, triadic, tetradic) — the
// "advanced" part developers reach for htmlcolorcodes.com/the color
// wheel for, when picking colors for a design.
import { hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from "../color-converter/logic.js";

function rotateHue(hsl, degrees) {
  return { ...hsl, h: (((hsl.h + degrees) % 360) + 360) % 360 };
}

function hexFromHsl(hsl) {
  return rgbToHex(hslToRgb(hsl));
}

export function getHarmonies(hex) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return {
    complementary: [0, 180].map((d) => hexFromHsl(rotateHue(hsl, d))),
    analogous: [-30, 0, 30].map((d) => hexFromHsl(rotateHue(hsl, d))),
    triadic: [0, 120, 240].map((d) => hexFromHsl(rotateHue(hsl, d))),
    tetradic: [0, 90, 180, 270].map((d) => hexFromHsl(rotateHue(hsl, d))),
  };
}

export function getShades(hex) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return [15, 30, 45, hsl.l, 60, 75, 90].map((l) => hexFromHsl({ ...hsl, l }));
}

export function toRgbString(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

export function toHslString(hex) {
  const { h, s, l } = rgbToHsl(hexToRgb(hex));
  return `hsl(${h}, ${s}%, ${l}%)`;
}
