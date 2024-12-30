import { ColorStop } from "../types";

function sortAndUniq<T>(arr: readonly T[], getter: (item: T) => number): T[] {
  const sorted = [...arr].sort((a, b) => getter(a) - getter(b));
  const result: T[] = [];
  for (const item of sorted) {
    if (result.length === 0 || getter(result[result.length - 1]) !== getter(item)) {
      result.push(item);
    }
  }
  return result;
}

const positionGetter = ({ position }: ColorStop) => position;

export function sortStops(stops: readonly ColorStop[]): ColorStop[] {
  return sortAndUniq(stops, positionGetter);
}

export function reverseColorStops(
  colorStops: readonly ColorStop[],
): ColorStop[] {
  return sortStops(colorStops.map((s) => ({ ...s, position: 1 - s.position })));
}
