declare module "culori" {
  type Color = { mode: string; alpha?: number };
  type HSL = Color & {
    mode: "hsl";
    h: number | undefined;
    s: number;
    l: number;
  };
  type RGB = Color & { mode: "rgb"; r: number; g: number; b: number };
  type LAB = Color & { mode: "lab"; l: number; a: number; b: number };
  type Converter<TOut extends Color = Color> = (color: any) => TOut;
  export function converter(mode: string): Converter;
  export function converter(mode: "hsl"): Converter<HSL>;
  export function converter(mode: "rgb"): Converter<RGB>;
  export function converter(mode: "oklab"): Converter<LAB>;
}
