export type CubicPoly = [number, number, number, number];

/*
 * Compute coefficients for a cubic polynomial
 *   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
 * such that
 *   p(0) = x0, p(1) = x1
 *  and
 *   p'(0) = t0, p'(1) = t1.
 */
function init(x0: number, x1: number, t0: number, t1: number): CubicPoly {
  const c0 = x0;
  const c1 = t0;
  const c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
  const c3 = 2 * x0 - 2 * x1 + t0 + t1;
  return [c0, c1, c2, c3];
}

export function initCatmullRom(
  x0: number,
  x1: number,
  x2: number,
  x3: number,
  tension: number,
) {
  return init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));
}

export function initNonuniformCatmullRom(
  x0: number,
  x1: number,
  x2: number,
  x3: number,
  dt0: number,
  dt1: number,
  dt2: number,
) {
  // compute tangents when parameterized in [t1,t2]
  let t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
  let t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;

  // rescale tangents for parametrization in [0,1]
  t1 *= dt1;
  t2 *= dt1;

  return init(x1, x2, t1, t2);
}

export function calc([c0, c1, c2, c3]: CubicPoly, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return c0 + c1 * t + c2 * t2 + c3 * t3;
}
