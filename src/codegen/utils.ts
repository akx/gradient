import { CodegenConfig } from "./types";
import { Color, ColorStop } from "../types";
import { colorToRGBAHex, colorToRGBHex, toCssRgb, toCssRgba } from "../utils";

export function formatNumber(val: number, precision: number): string {
  return val === Math.round(val) ? val.toFixed(0) : val.toFixed(precision);
}

export function getCSSColorStringifier(
  codegenConfig: Readonly<CodegenConfig>,
  cleanedStops: readonly ColorStop[],
): (color: Color) => string {
  const includeAlpha =
    codegenConfig.includeAlpha && cleanedStops.some((s) => s.color.a !== 1);
  const { hexColors } = codegenConfig;

  if (hexColors) {
    return includeAlpha ? colorToRGBAHex : colorToRGBHex;
  } else {
    return includeAlpha ? toCssRgba : toCssRgb;
  }
}
