import { Color, ColorStop } from "../types";
import { cleanGradient } from "./utils";

function findStops(stops: readonly ColorStop[], position: number) {
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];
  if (stops.length > 1) {
    if (position < firstStop.position) return [firstStop, firstStop];
    if (position > lastStop.position) return [lastStop, lastStop];
    for (var i = 0; i < stops.length - 1; i++) {
      if (stops[i].position <= position && position <= stops[i + 1].position) {
        return [stops[i], stops[i + 1]];
      }
    }
  }
  return [firstStop, lastStop];
}

function interpolate(
  stops: readonly ColorStop[],
  position: number,
): Color | null {
  if (stops.length === 0) return null;
  const [stop1, stop2] = findStops(stops, position);
  const delta = stop2.position - stop1.position;
  const alpha = (position - stop1.position) / (delta === 0 ? 1 : delta);
  const beta = 1.0 - alpha;
  const color1 = stop1.color;
  const color2 = stop2.color;

  return {
    r: color1.r * beta + color2.r * alpha,
    g: color1.g * beta + color2.g * alpha,
    b: color1.b * beta + color2.b * alpha,
    a: color1.a * beta + color2.a * alpha,
  };
}

export function sample(
  stops: readonly ColorStop[],
  position: number,
): Color | null {
  const cleanedStops = cleanGradient(stops);
  return interpolate(cleanedStops, position);
}
