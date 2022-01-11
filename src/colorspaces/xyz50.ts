import * as culori from "culori";
import { ColorspaceConverter } from "./types";
import { getRgbWithCulori } from "./utils";

const culoriXyz = culori.converter("xyz50");
const xyzConverter: ColorspaceConverter = {
  id: "xyz50",
  name: "XYZ50",
  fromColor: (c) => {
    const { x, y, z, alpha } = culoriXyz({ mode: "rgb", ...c });
    return [x, y, z, alpha || c.a];
  },
  toColor: ([x, y, z, alpha]) => {
    return getRgbWithCulori({ mode: "xyz50", x, y, z, alpha });
  },
};

export default xyzConverter;
