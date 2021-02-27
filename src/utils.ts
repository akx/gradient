import { Color } from "./types";
import * as culori from "culori";
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
  const colorAsHsl = culori.converter("hsl")({ mode: "rgb", ...color });
  Object.assign(colorAsHsl, mod);
  const colorAsRgb = culori.converter("rgb")(colorAsHsl);

  return { ...color, r: colorAsRgb.r, g: colorAsRgb.g, b: colorAsRgb.b };
}
