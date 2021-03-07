import { ColorspaceConverter } from "./types";
import linearRgbConverter from "./linearRgb";
import srgbConverter from "./srgb";
import oklabConverter from "./oklab";
import hslConverter from "./hsl";

export const converters: ColorspaceConverter[] = [
  srgbConverter,
  linearRgbConverter,
  oklabConverter,
  hslConverter,
];
