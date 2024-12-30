import { Color } from "./types";
import { convertHslToRgb, convertRgbToHsl } from "culori/fn";
import { formatNumber } from "./codegen/utils";

export function toCssRgba(color: Color): string {
  const ri = Math.round(color.r * 255);
  const gi = Math.round(color.g * 255);
  const bi = Math.round(color.b * 255);
  const ar = formatNumber(color.a * 100, 2);
  return `rgba(${ri}, ${gi}, ${bi}, ${ar}%)`;
}

export function toCssRgb(color: Color): string {
  const ri = Math.round(color.r * 255);
  const gi = Math.round(color.g * 255);
  const bi = Math.round(color.b * 255);
  return `rgb(${ri}, ${gi}, ${bi})`;
}

export function invertColor(color: Color): Color {
  return { r: 1 - color.r, g: 1 - color.g, b: 1 - color.b, a: color.a };
}

export function modifyHSL(
  color: Color,
  mod: Partial<Record<"h" | "s" | "l", number>>,
): Color {
  const colorAsHsl = convertRgbToHsl(color);
  Object.assign(colorAsHsl, mod);
  const { r, g, b } = convertHslToRgb(colorAsHsl);
  return { ...color, r, g, b };
}

export function clamp(n: number, min: number = 0, max: number = 1): number {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export function hexToColor(hex: string, a: number = 1): Color | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return null;
  }
  return {
    a,
    r: parseInt(result[1], 16) / 255.0,
    g: parseInt(result[2], 16) / 255.0,
    b: parseInt(result[3], 16) / 255.0,
  };
}

function toHexlet(c: number) {
  return Math.round(c * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

export function colorToRGBHex(c: Color): string {
  return `#${toHexlet(c.r)}${toHexlet(c.g)}${toHexlet(c.b)}`;
}

export function colorToRGBAHex(c: Color): string {
  return `#${toHexlet(c.r)}${toHexlet(c.g)}${toHexlet(c.b)}${toHexlet(c.a)}`;
}
