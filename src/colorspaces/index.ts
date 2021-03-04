import { ColorspaceConverter } from "./types";
import linearRgbConverter from "./linearRgb";
import srgbConverter from "./srgb";
import oklabConverter from "./oklab";

export const converters: ColorspaceConverter[] = [
  srgbConverter,
  linearRgbConverter,
  oklabConverter,
];
