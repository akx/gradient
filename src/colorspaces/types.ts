import { Color } from "../types";

export interface ColorspaceConverter {
  id: string;
  name: string;
  fromColor: (c: Color) => number[];
  toColor: (c: number[]) => Color;
}
