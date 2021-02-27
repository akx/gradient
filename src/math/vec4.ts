export type Vec4 = [number, number, number, number];

export function add(o: Vec4, a: Vec4, b: Vec4) {
  o[0] = a[0] + b[0];
  o[1] = a[1] + b[1];
  o[2] = a[2] + b[2];
  o[3] = a[3] + b[3];
  return o;
}

export function sub(o: Vec4, a: Vec4, b: Vec4) {
  o[0] = a[0] - b[0];
  o[1] = a[1] - b[1];
  o[2] = a[2] - b[2];
  o[3] = a[3] - b[3];
  return o;
}

export function distSq(a: Vec4, b: Vec4) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const dq = b[3] - a[3];
  return dx * dx + dy * dy + dz * dz + dq * dq;
}

export function dist(a: Vec4, b: Vec4) {
  return Math.sqrt(distSq(a, b));
}
