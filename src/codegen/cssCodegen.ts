import { ColorStop } from "../types";
import { cleanGradient } from "../gradients";
import { CodegenConfig } from "./types";
import { clamp, toCssRgb, toCssRgba } from "../utils";
import { formatNumber } from "./utils";

export function generateCssGradientStops(
  stops: readonly ColorStop[],
  config: CodegenConfig,
) {
  const cleanedStops = cleanGradient(stops);
  const includeAlpha =
    config.includeAlpha && cleanedStops.some((s) => s.color.a !== 1);

  const cssStops: string[] = [];

  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];

    const cssColor = includeAlpha
      ? toCssRgba(stop.color)
      : toCssRgb(stop.color);
    const posFmt = formatNumber(
      stop.position * 100,
      clamp(config.positionPrecision - 2, 0, 10),
    );
    cssStops.push(`${cssColor} ${posFmt}%`);
  }
  return cssStops.join(", ");
}
