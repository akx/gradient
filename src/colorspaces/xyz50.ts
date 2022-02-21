import { convertXyz50ToRgb, convertRgbToXyz50 } from "culori/fn";

import { ColorspaceConverter } from "./types";

const xyzConverter: ColorspaceConverter = {
  id: "xyz50",
  name: "XYZ50",
  fromColor: (c) => {
    const { x, y, z, alpha } = convertRgbToXyz50(c);
    return [x, y, z, alpha || c.a];
  },
  toColor: ([x, y, z, a]) => {
    return { ...convertXyz50ToRgb({ x, y, z }), a };
  },
};

export default xyzConverter;
