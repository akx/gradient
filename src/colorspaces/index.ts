import { ColorspaceConverter } from "./types";
import linearRgbConverter from "./linearRgb";
import srgbConverter from "./srgb";

export const converters: ColorspaceConverter[] = [
  srgbConverter,
  linearRgbConverter,
];
