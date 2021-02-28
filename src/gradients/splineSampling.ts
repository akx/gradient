import * as THREE from "three";
import { ColorStop } from "../types";

function getCurvePoints(
  stops: readonly ColorStop[],
  getter: (s: ColorStop) => number,
  n: number,
): [number, number][] {
  const points = stops.map((s) => new THREE.Vector3(s.position, getter(s), 0));
  const curve = new THREE.CatmullRomCurve3(points);
  return curve.getPoints(n).map((p) => [p.x, p.y]);
}

export function catmullRomPoints(
  stops: readonly ColorStop[],
  n: number,
): ColorStop[] {
  const rPoints = getCurvePoints(stops, (s) => s.color.r, n);
  const gPoints = getCurvePoints(stops, (s) => s.color.g, n);
  const bPoints = getCurvePoints(stops, (s) => s.color.b, n);
  const aPoints = getCurvePoints(stops, (s) => s.color.a, n);
  const outStops: ColorStop[] = [];
  for (let i = 0; i < n; i++) {
    const [rx, r] = rPoints[i];
    const [gx, g] = gPoints[i];
    const [bx, b] = bPoints[i];
    const [ax, a] = aPoints[i];
    console.log(i, rx, gx, bx, ax);
    outStops.push({
      id: `x${i}`,
      position: (rx + gx + bx + ax) / 4,
      color: {
        r,
        g,
        b,
        a,
      },
    });
  }
  return outStops;
}
// x
