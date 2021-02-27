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
