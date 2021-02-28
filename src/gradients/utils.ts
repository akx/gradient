import { ColorStop } from "../types";
import { sortBy } from "lodash";

export function sortStops(stops: readonly ColorStop[]): ColorStop[] {
  return sortBy(stops, (cp) => cp.position);
}

export function reverseColorStops(
  colorStops: readonly ColorStop[],
): ColorStop[] {
  return sortStops(colorStops.map((s) => ({ ...s, position: 1 - s.position })));
}
