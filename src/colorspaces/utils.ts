import { Color } from "../types";
import * as culori from "culori";

const rgbConverter = culori.converter("rgb");
export function getRgbWithCulori(o: any): Color {
  const rgb = rgbConverter(o);
  return { r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.alpha || o.alpha || 1 };
}
