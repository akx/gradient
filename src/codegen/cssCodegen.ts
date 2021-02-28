import { ColorStop, GradientConfig } from "../types";
import { CodegenConfig } from "./types";
import { clamp, toCssRgb, toCssRgba } from "../utils";
import { formatNumber } from "./utils";
import { mangleGradient } from "../gradients/mangle";

export function generateCssGradientStops(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  codegenConfig: CodegenConfig,
) {
  const cleanedStops = mangleGradient(stops, gradientConfig);
  const includeAlpha =
    codegenConfig.includeAlpha && cleanedStops.some((s) => s.color.a !== 1);

  const cssStops: string[] = [];

  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];

    const cssColor = includeAlpha
      ? toCssRgba(stop.color)
      : toCssRgb(stop.color);
    const posFmt = formatNumber(
      stop.position * 100,
      clamp(codegenConfig.positionPrecision - 2, 0, 10),
    );
    cssStops.push(`${cssColor} ${posFmt}%`);
  }
  return cssStops.join(", ");
}
