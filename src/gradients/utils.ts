import { ColorStop } from "../types";
import { sortBy, sortedUniqBy } from "lodash";

const positionGetter = ({ position }: ColorStop) => position;

export function sortStops(stops: readonly ColorStop[]): ColorStop[] {
  return sortedUniqBy(sortBy(stops, positionGetter), positionGetter);
}

export function reverseColorStops(
  colorStops: readonly ColorStop[],
): ColorStop[] {
  return sortStops(colorStops.map((s) => ({ ...s, position: 1 - s.position })));
}
