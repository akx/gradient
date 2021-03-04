import { ColorspaceConverter } from "./types";

const srgbConverter: ColorspaceConverter = {
  id: "srgb",
  name: "sRGB (identity)",
  fromColor: (c) => [c.r, c.g, c.b, c.a],
  toColor: ([r, g, b, a]) => ({ r, g, b, a }),
};

export default srgbConverter;
