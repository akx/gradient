import { ColorStop, GradientConfig } from "../types";
import { CodegenConfig } from "./types";
import { clamp, toCssRgb, toCssRgba } from "../utils";
import { formatNumber } from "./utils";
import { mangleGradient } from "../gradients/mangle";

export function generateSVGGradient(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  codegenConfig: CodegenConfig,
): string {
  return [
    '<linearGradient x1="0%" y1="0%" x2="100%" y2="0%">',
    generateSVGGradientStops(stops, gradientConfig, codegenConfig),
    "</linearGradient>",
  ].join("\n");
}

export function generateSVGGradientStops(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  codegenConfig: CodegenConfig,
): string {
  const cleanedStops = mangleGradient(stops, gradientConfig);
  const includeAlpha =
    codegenConfig.includeAlpha && cleanedStops.some((s) => s.color.a !== 1);

  const svgStops: string[] = [];
  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];

    const cssColor = includeAlpha
      ? toCssRgba(stop.color)
      : toCssRgb(stop.color);
    const posFmt = formatNumber(
      stop.position * 100,
      clamp(codegenConfig.positionPrecision - 2, 0, 10),
    );
    svgStops.push(`    <stop offset="${posFmt}%" stop-color="${cssColor}" />`);
  }

  return svgStops.join("\n");
}
