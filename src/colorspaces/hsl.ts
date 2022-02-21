import { convertHslToRgb, convertRgbToHsl } from "culori/fn";
import { ColorspaceConverter } from "./types";

const hslConverter: ColorspaceConverter = {
  id: "hsl",
  name: "HSL [buggy]",
  fromColor: (c) => {
    const { h, s, l, alpha } = convertRgbToHsl(c);
    return [h || 0, s, l, alpha || c.a];
  },
  toColor: ([h, s, l, alpha]) => {
    return { ...convertHslToRgb({ h, s, l }), a: alpha };
  },
};

export default hslConverter;
