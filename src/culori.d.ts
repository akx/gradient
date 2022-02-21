declare module "culori/fn" {
  type Color = { alpha?: number };
  type HSL = Color & {
    h: number | undefined;
    s: number;
    l: number;
  };
  type RGB = Color & { r: number; g: number; b: number };
  type LAB = Color & { l: number; a: number; b: number };
  type XYZ = Color & {
    x: number;
    y: number;
    z: number;
  };
  export function convertHslToRgb(hsl: HSL): RGB;
  export function convertXyz50ToRgb(xyz: XYZ): RGB;
  export function convertOklabToRgb(lab: LAB): RGB;
  export function convertRgbToHsl(rgb: RGB): HSL;
  export function convertRgbToOklab(rgb: RGB): LAB;
  export function convertRgbToXyz50(rgb: RGB): XYZ;
}
