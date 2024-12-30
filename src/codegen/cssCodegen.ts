import { ColorStop, GradientConfig } from "../types";
import { CodegenConfig } from "./types";
import { clamp } from "../utils";
import { formatNumber, getCSSColorStringifier } from "./utils";
import { mangleGradient } from "../gradients/mangle";

export function generateCssGradientStops(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  codegenConfig: CodegenConfig,
) {
  const cleanedStops = mangleGradient(stops, gradientConfig);
  const toCssColor = getCSSColorStringifier(codegenConfig, cleanedStops);
  return cleanedStops
    .map((stop) => {
      const posFmt = formatNumber(
        stop.position * 100,
        clamp(codegenConfig.positionPrecision - 2, 0, 10),
      );
      return `${toCssColor(stop.color)} ${posFmt}%`;
    })
    .join(", ");
}
