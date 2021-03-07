import { ColorspaceConverter } from "./types";
import linearRgbConverter from "./linearRgb";
import srgbConverter from "./srgb";
import oklabConverter from "./oklab";
import hslConverter from "./hsl";
import xyzConverter from "./xyz";

export const converters: ColorspaceConverter[] = [
  srgbConverter,
  linearRgbConverter,
  oklabConverter,
  hslConverter,
  xyzConverter,
];
