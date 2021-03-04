import { ColorStop, GradientConfig, InterpolationType } from "../types";
import { sortStops } from "./utils";
import { converters } from "../colorspaces";
import srgbConverter from "../colorspaces/srgb";
import { compute5DCatmullRomPoints } from "../math/CatmullRom5";
import { clamp } from "../utils";
import { interpolate } from "./basic";

function computeLinearInterpolation(
  pointsInDestColorSpace: number[][],
  { interpolationPoints }: GradientConfig,
) {
  const positions: number[] = [],
    values: number[][] = [],
    interpolatedPoints: number[][] = [];
  pointsInDestColorSpace.forEach(([position, ...value]) => {
    positions.push(position);
    values.push(value);
  });
  console.log(positions, values);
  for (let i = 0; i < interpolationPoints; i++) {
    const p = i / (interpolationPoints - 1);
    const result = interpolate(positions, values, p);
    if (result) interpolatedPoints.push([p, ...result]);
  }
  return interpolatedPoints;
}

function applyInterpolation(
  pointsInDestColorSpace: number[][],
  config: GradientConfig,
): number[][] {
  switch (config.interpolation) {
    case InterpolationType.CatmullRom:
      return compute5DCatmullRomPoints(
        pointsInDestColorSpace.map(([a, b, c, d, e]) => [a, b, c, d, e]),
        config.interpolationPoints,
      );
    case InterpolationType.Linear:
      return computeLinearInterpolation(pointsInDestColorSpace, config);
    default:
      return pointsInDestColorSpace;
  }
}

export function mangleGradient(
  stops: readonly ColorStop[],
  config: GradientConfig,
): readonly ColorStop[] {
  stops = sortStops(stops);
  const converter =
    converters.find((c) => c.id === config.colorspace) || srgbConverter;
  const pointsInDestColorSpace = stops.map(({ color, position }) =>
    [position].concat(converter.fromColor(color)),
  );
  const interpolatedPoints = applyInterpolation(pointsInDestColorSpace, config);

  console.log("interp", interpolatedPoints);
  const outStops = interpolatedPoints.map(([position, ...rest], i) => ({
    id: `x${i}`,
    position: clamp(position),
    color: converter.toColor(rest),
  }));
  console.log("out", outStops);
  return sortStops(outStops);
}
