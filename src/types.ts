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

export enum InterpolationType {
  Linear = "Linear",
  CatmullRom = "CatmullRom",
}

export interface GradientConfig {
  interpolation: InterpolationType;
  interpolationPoints: number;
}
