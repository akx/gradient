import { ColorStop } from "../types";
import { compute5DCatmullRomPoints } from "../math/CatmullRom5";
import { clamp } from "../utils";

export function catmullRomPoints(
  stops: readonly ColorStop[],
  n: number,
): ColorStop[] {
  const points = compute5DCatmullRomPoints(
    stops.map(({ color: { a, b, g, r }, position }) => [position, r, g, b, a]),
    n,
  );
  return points.map(([position, r, g, b, a], i) => ({
    id: `x${i}`,
    position: clamp(position),
    color: {
      r: clamp(r),
      g: clamp(g),
      b: clamp(b),
      a: clamp(a),
    },
  }));
}
