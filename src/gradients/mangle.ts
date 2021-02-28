import { ColorStop, GradientConfig, InterpolationType } from "../types";
import { sortStops } from "./utils";
import { catmullRomPoints } from "./splineSampling";

export function mangleGradient(
  stops: readonly ColorStop[],
  config: GradientConfig,
): readonly ColorStop[] {
  stops = sortStops(stops);
  if (config.interpolation === InterpolationType.CatmullRom) {
    stops = catmullRomPoints(stops, config.interpolationPoints);
  }
  return stops;
}
