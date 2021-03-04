import { Color, ColorStop } from "../types";
import { sortStops } from "./utils";

type Numbers = number[];

function findStops(
  positions: readonly number[],
  position: number,
): [number, number] {
  const firstStopIndex = 0;
  const firstStopPos = positions[firstStopIndex];
  const lastStopIndex = positions.length - 1;
  const lastStopPos = positions[lastStopIndex];
  if (positions.length > 1) {
    if (position < firstStopPos) return [firstStopIndex, firstStopIndex];
    if (position > lastStopPos) return [lastStopIndex, lastStopIndex];
    for (let i = firstStopIndex; i < lastStopIndex; i++) {
      if (positions[i] <= position && position <= positions[i + 1]) {
        return [i, i + 1];
      }
    }
  }
  return [firstStopIndex, lastStopIndex];
}

export function interpolate(
  positions: readonly number[],
  values: readonly Numbers[],
  position: number,
): Numbers | null {
  if (positions.length === 0) return null;
  const [stop1index, stop2index] = findStops(positions, position);
  const pos1 = positions[stop1index];
  const pos2 = positions[stop2index];
  const delta = pos2 - pos1;
  const alpha = (position - pos1) / (delta === 0 ? 1 : delta);
  const beta = 1.0 - alpha;
  const v1 = values[stop1index];
  const v2 = values[stop2index];
  return v1.map((v1, i) => v1 * beta + v2[i] * alpha);
}

export function sample(
  stops: readonly ColorStop[],
  position: number,
): Color | null {
  // TODO: this is wrong when interpolation isn't linear...
  const cleanedStops = sortStops(stops);
  const positions = cleanedStops.map((s) => s.position);
  const values = cleanedStops.map(({ color: { a, b, g, r } }) => [r, g, b, a]);
  const result = interpolate(positions, values, position);
  if (!result) return null;
  const [r, g, b, a] = result;
  return { r, g, b, a };
}
