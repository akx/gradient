export type Point5D = [number, number, number, number, number];

export function sub(a: Point5D, b: Point5D): Point5D {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3], a[4] - b[4]];
}

export function add(a: Point5D, b: Point5D): Point5D {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4]];
}

export function distanceToSquared(a: Point5D, b: Point5D): number {
  const [p0, p1, p2, p3, p4] = sub(a, b);
  return p0 * p0 + p1 * p1 + p2 * p2 + p3 * p3 + p4 * p4;
}
