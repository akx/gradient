import { ColorspaceConverter } from "./types";

function gammaToLinear(n: number) {
  return n <= 0.0404482362771082
    ? n / 12.92
    : Math.pow((n + 0.055) / 1.055, 2.4);
}

function linearToGamma(n: number) {
  return n <= 0.00313066844250063
    ? n * 12.92
    : 1.055 * Math.pow(n, 1 / 2.4) - 0.055;
}

const linearRgbConverter: ColorspaceConverter = {
  id: "linearRgb",
  name: "Linear RGB",
  fromColor: (c) => [c.r, c.g, c.b].map(gammaToLinear).concat([c.a]),
  toColor: ([r, g, b, a]) => ({
    r: linearToGamma(r),
    g: linearToGamma(g),
    b: linearToGamma(b),
    a,
  }),
};

export default linearRgbConverter;
