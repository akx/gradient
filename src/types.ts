export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorStop {
  id: string;
  position: number;
  color: Color;
}

export interface GradientConfig {
  interpolationColorspace: "linear";
}

export interface CodegenConfig {
  arrowFunction: boolean;
  includeAlpha: boolean;
  positionPrecision: number;
  valuePrecision: number;
}
