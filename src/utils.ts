import { Color } from "./types";
import * as culori from "culori";

export function toCssRgba(color: Color): string {
  return `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${
    color.a * 100
  }%)`;
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
