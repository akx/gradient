// Via https://observablehq.com/@mattdesl/perceptually-smooth-multi-color-linear-gradients#CatmullRomSpline

import * as vec4 from "./vec4";
import { dist, Vec4 } from "./vec4";
import {
  calc,
  CubicPoly,
  initCatmullRom,
  initNonuniformCatmullRom,
} from "./cubicPoly";
// Extracted from ThreeJS, modified to plain arrays

/*
  Based on an optimized c++ solution in
   - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
   - http://ideone.com/NoEbVM
  This CubicPoly class could be used for reusing some variables and calculations,
  but for three.js curve use, it could be possible inlined and flatten into a single function call
  which can be placed in CurveUtils.
  */

interface CatmullRomOpts {
  closed: boolean;
  type: "centripetal" | "chordal" | "uniform";
  tension: number;
}

export function getCatmullRomPoint(
  points: readonly Vec4[],
  opts: CatmullRomOpts,
  t: number,
): Vec4 {
  const tmp1: Vec4 = [0, 0, 0, 0];
  const tmp2: Vec4 = [0, 0, 0, 0];

  //const { closed = false, type = "uniform", tension = 0.5 } = opts;
  const { closed, type, tension } = opts;
  const l = points.length;
  const p = (l - (closed ? 0 : 1)) * t;
  let intPoint = Math.floor(p);
  let weight = p - intPoint;

  if (closed) {
    intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;
  } else if (weight === 0 && intPoint === l - 1) {
    intPoint = l - 2;
    weight = 1;
  }

  let p0, p1, p2, p3; // 4 points

  if (closed || intPoint > 0) {
    p0 = points[(intPoint - 1) % l];
  } else {
    // extrapolate first point
    vec4.sub(tmp1, points[0], points[1]);
    vec4.add(tmp1, tmp1, points[0]);
    p0 = tmp1;
  }

  p1 = points[intPoint % l];
  p2 = points[(intPoint + 1) % l];

  if (closed || intPoint + 2 < l) {
    p3 = points[(intPoint + 2) % l];
  } else {
    // extrapolate last point
    vec4.sub(tmp2, points[l - 1], points[l - 2]);
    vec4.add(tmp2, tmp2, points[l - 1]);
    p3 = tmp2;
  }
  let poly0: CubicPoly, poly1: CubicPoly, poly2: CubicPoly, poly3: CubicPoly;

  if (type === "centripetal" || type === "chordal") {
    // init Centripetal / Chordal Catmull-Rom
    let pow = type === "chordal" ? 0.5 : 0.25;
    let dt0 = Math.pow(vec4.distSq(p0, p1), pow);
    let dt1 = Math.pow(vec4.distSq(p1, p2), pow);
    let dt2 = Math.pow(vec4.distSq(p2, p3), pow);

    // safety check for repeated points
    if (dt1 < 1e-4) dt1 = 1.0;
    if (dt0 < 1e-4) dt0 = dt1;
    if (dt2 < 1e-4) dt2 = dt1;

    poly0 = initNonuniformCatmullRom(p0[0], p1[0], p2[0], p3[0], dt0, dt1, dt2);
    poly1 = initNonuniformCatmullRom(p0[1], p1[1], p2[1], p3[1], dt0, dt1, dt2);
    poly2 = initNonuniformCatmullRom(p0[2], p1[2], p2[2], p3[2], dt0, dt1, dt2);
    poly3 = initNonuniformCatmullRom(p0[3], p1[3], p2[3], p3[3], dt0, dt1, dt2);
  } else {
    poly0 = initCatmullRom(p0[0], p1[0], p2[0], p3[0], tension);
    poly1 = initCatmullRom(p0[1], p1[1], p2[1], p3[1], tension);
    poly2 = initCatmullRom(p0[2], p1[2], p2[2], p3[2], tension);
    poly3 = initCatmullRom(p0[3], p1[3], p2[3], p3[3], tension);
  }

  return [
    calc(poly0, weight),
    calc(poly1, weight),
    calc(poly2, weight),
    calc(poly3, weight),
  ];
}

function getUtoTMapping(
  u: number,
  distance: number | null,
  arcLengths: number[],
): number {
  var i = 0,
    il = arcLengths.length;

  var targetArcLength; // The targeted u distance value to get

  if (distance !== null) {
    targetArcLength = distance;
  } else {
    targetArcLength = u * arcLengths[il - 1];
  }

  // binary search for the index with largest value smaller than target u distance

  var low = 0,
    high = il - 1,
    comparison;

  while (low <= high) {
    i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

    comparison = arcLengths[i] - targetArcLength;

    if (comparison < 0) {
      low = i + 1;
    } else if (comparison > 0) {
      high = i - 1;
    } else {
      high = i;
      break;

      // DONE
    }
  }

  i = high;

  if (arcLengths[i] === targetArcLength) {
    return i / (il - 1);
  }

  // we could get finer grain at lengths, or use simple interpolation between two points

  const lengthBefore = arcLengths[i];
  const lengthAfter = arcLengths[i + 1];

  const segmentLength = lengthAfter - lengthBefore;

  // determine where we are between the 'before' and 'after' points

  const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

  // add that fractional amount to t

  const t = (i + segmentFraction) / (il - 1);

  return t;
}

export class CatmullRomSpline {
  private readonly points: Vec4[];
  private readonly opts: CatmullRomOpts;
  private readonly arcLengthDivisions: number;
  constructor(
    points: Vec4[],
    opts: CatmullRomOpts,
    arcLengthDivisions: number = 200,
  ) {
    this.points = points;
    this.opts = opts;
    this.arcLengthDivisions = arcLengthDivisions;
  }

  public getPoints(n: number, spaced: boolean) {
    const arclengths = this.getArcLengths();
    const points = [];
    for (let i = 0; i < n; i++) {
      const t = this.opts.closed ? i / n : i / (n - 1);
      const p = spaced ? this.getSpacedPoint(t, arclengths) : this.getPoint(t);
      points.push(p);
    }
    return points;
  }

  public getPoint(t: number): Vec4 {
    return getCatmullRomPoint(this.points, this.opts, t);
  }

  public getSpacedPoint(u: number, arcLengths: number[]): Vec4 {
    let t = getUtoTMapping(u, null, arcLengths);
    return this.getPoint(t);
  }

  public getArcLengths(): number[] {
    const divisions = this.arcLengthDivisions;
    const out = [];
    var current;
    var last = this.getPoint(0);
    var p;
    var sum = 0;

    out.push(0);

    for (p = 1; p <= divisions; p++) {
      current = this.getPoint(p / divisions);
      sum += dist(current, last);
      out.push(sum);
      last = current;
    }

    return out;
  }
}
