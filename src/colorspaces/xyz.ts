import * as culori from "culori";
import { ColorspaceConverter } from "./types";
import { getRgbWithCulori } from "./utils";

const culoriXyz = culori.converter("xyz");
const xyzConverter: ColorspaceConverter = {
  id: "xyz",
  name: "XYZ",
  fromColor: (c) => {
    const { x, y, z, alpha } = culoriXyz({ mode: "rgb", ...c });
    return [x, y, z, alpha || c.a];
  },
  toColor: ([x, y, z, alpha]) => {
    return getRgbWithCulori({ mode: "xyz", x, y, z, alpha });
  },
};

export default xyzConverter;
