import * as culori from "culori";
import { ColorspaceConverter } from "./types";
import { getRgbWithCulori } from "./utils";

const culoriOklab = culori.converter("oklab");
const oklabConverter: ColorspaceConverter = {
  id: "oklab",
  name: "Oklab",
  fromColor: (c) => {
    const { l, a, b, alpha } = culoriOklab({ mode: "rgb", ...c });
    return [l, a, b, alpha || c.a];
  },
  toColor: ([l, a, b, alpha]) => {
    return getRgbWithCulori({ mode: "oklab", l, a, b, alpha });
  },
};

export default oklabConverter;
