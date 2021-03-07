import * as culori from "culori";
import { ColorspaceConverter } from "./types";
import { getRgbWithCulori } from "./utils";

const culoriHsl = culori.converter("hsl");
const hslConverter: ColorspaceConverter = {
  id: "hsl",
  name: "HSL [buggy]",
  fromColor: (c) => {
    const { h, s, l, alpha } = culoriHsl({ mode: "rgb", ...c });
    return [h || 0, s, l, alpha || c.a];
  },
  toColor: ([h, s, l, alpha]) => {
    return getRgbWithCulori({ mode: "hsl", h, s, l, alpha });
  },
};

export default hslConverter;
