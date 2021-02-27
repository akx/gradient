import { ColorStop } from "./types";
import { cleanGradient } from "./gradients";
import * as z from "zod";

const stateSchema = z.array(
  z.object({
    id: z.string().optional(),
    position: z.number(),
    color: z
      .object({
        r: z.number(),
        g: z.number(),
        b: z.number(),
        a: z.number(),
      })
      .partial(),
  }),
);

export function exportState(colorStops: readonly ColorStop[]): string {
  return JSON.stringify(
    cleanGradient(colorStops).map((stop) => {
      const c: Record<string, any> = { ...stop };
      delete c.id;
      return c;
    }),
    null,
    2,
  );
}

export function importState(stateJSON: string): ColorStop[] {
  const state = JSON.parse(stateJSON);
  if (!Array.isArray(state)) {
    throw new Error("not an array");
  }
  const data = stateSchema.parse(state);
  return data.map((e, i) => ({
    id: e.id || `${i}`,
    position: e.position,
    color: { r: 0, g: 0, b: 0, a: 1, ...e.color },
  }));
}
