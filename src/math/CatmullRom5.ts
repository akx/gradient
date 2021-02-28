// Adapted from THREE.js's CatmullRomCurve 3... but in 5 dimensions.
// THREE.js is MIT licensed, https://github.com/mrdoob/three.js/blob/dev/LICENSE

import * as cubicPoly from "./cubicPoly";
import { CubicPoly } from "./cubicPoly";
import { add, distanceToSquared, Point5D, sub } from "./Point5D";

export function compute5DCatmullRomPoints(
  points: readonly Point5D[],
  n: number,
  closed = false,
  curveType: string = "centripetal",
  tension = 0.5,
): readonly Point5D[] {
  const outPoints: Point5D[] = [];
  const cps: [CubicPoly, CubicPoly, CubicPoly, CubicPoly, CubicPoly] = [
    cubicPoly.zero(),
    cubicPoly.zero(),
    cubicPoly.zero(),
    cubicPoly.zero(),
    cubicPoly.zero(),
  ];

  const l = points.length;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const p = (l - (closed ? 0 : 1)) * t;
    let intPoint = Math.floor(p);
    let weight = p - intPoint;

    if (closed) {
      intPoint +=
        intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
    } else if (weight === 0 && intPoint === l - 1) {
      intPoint = l - 2;
      weight = 1;
    }

    let p0, p3; // 4 points (p1 & p2 defined below)

    if (closed || intPoint > 0) {
      p0 = points[(intPoint - 1) % l];
    } else {
      // extrapolate first point
      p0 = add(sub(points[0], points[1]), points[0]);
    }

    const p1 = points[intPoint % l];
    const p2 = points[(intPoint + 1) % l];

    if (closed || intPoint + 2 < l) {
      p3 = points[(intPoint + 2) % l];
    } else {
      // extrapolate last point
      p3 = add(sub(points[l - 1], points[l - 2]), points[l - 1]);
    }

    if (curveType === "centripetal" || curveType === "chordal") {
      // init Centripetal / Chordal Catmull-Rom
      const pow = curveType === "chordal" ? 0.5 : 0.25;
      let dt0 = Math.pow(distanceToSquared(p0, p1), pow);
      let dt1 = Math.pow(distanceToSquared(p1, p2), pow);
      let dt2 = Math.pow(distanceToSquared(p2, p3), pow);

      // safety check for repeated points
      if (dt1 < 1e-4) dt1 = 1.0;
      if (dt0 < 1e-4) dt0 = dt1;
      if (dt2 < 1e-4) dt2 = dt1;
      for (let i = 0; i < 5; i++) {
        cps[i] = cubicPoly.initNonuniformCatmullRom(
          p0[i],
          p1[i],
          p2[i],
          p3[i],
          dt0,
          dt1,
          dt2,
        );
      }
    } else if (curveType === "catmullrom") {
      for (let i = 0; i < 5; i++) {
        cps[i] = cubicPoly.initCatmullRom(p0[i], p1[i], p2[i], p3[i], tension);
      }
    }

    outPoints.push([
      cubicPoly.calc(cps[0], weight),
      cubicPoly.calc(cps[1], weight),
      cubicPoly.calc(cps[2], weight),
      cubicPoly.calc(cps[3], weight),
      cubicPoly.calc(cps[4], weight),
    ]);
  }
  return outPoints;
}
