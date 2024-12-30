import { ColorStop, GradientConfig } from "../types";
import { CodegenConfig } from "./types";
import { clamp } from "../utils";
import { formatNumber, getCSSColorStringifier } from "./utils";
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
  const toCssColor = getCSSColorStringifier(codegenConfig, cleanedStops);
  return cleanedStops
    .map((stop) => {
      const posFmt = formatNumber(
        stop.position * 100,
        clamp(codegenConfig.positionPrecision - 2, 0, 10),
      );
      return `    <stop offset="${posFmt}%" stop-color="${toCssColor(stop.color)}" />`;
    })
    .join("\n");
}
