import { convertRgbToOklab, convertOklabToRgb } from "culori/fn";
import { ColorspaceConverter } from "./types";

const oklabConverter: ColorspaceConverter = {
  id: "oklab",
  name: "Oklab",
  fromColor: (c) => {
    const { l, a, b, alpha } = convertRgbToOklab(c);
    return [l, a, b, alpha || c.a];
  },
  toColor: ([l, a, b, alpha]) => {
    return { ...convertOklabToRgb({ l, a, b }), a: alpha };
  },
};

export default oklabConverter;
