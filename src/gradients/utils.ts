import { ColorStop } from "../types";
import { sortBy } from "lodash";

export function cleanGradient(stops: readonly ColorStop[]): ColorStop[] {
  return sortBy(stops, (cp) => cp.position);
}
