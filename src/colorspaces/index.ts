import { ColorspaceConverter } from "./types";
import linearRgbConverter from "./linearRgb";
import srgbConverter from "./srgb";
import oklabConverter from "./oklab";
import hslConverter from "./hsl";
import xyz50Converter from "./xyz50";

export const converters: ColorspaceConverter[] = [
  srgbConverter,
  linearRgbConverter,
  oklabConverter,
  hslConverter,
  xyz50Converter,
];
