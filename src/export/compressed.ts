import * as b64ab from "base64-arraybuffer";
import { ColorStop } from "../types";
import { clamp } from "../utils";

function base64ToURLSafe(s: string): string {
  return s.replace(/\+/g, "_").replace(/\//g, "-").replace(/=+$/, "");
}

export function decodeURLSafeBase64ToArrayBuffer(b64: string): ArrayBuffer {
  return b64ab.decode(b64.replace(/_/g, "+").replace(/-/g, "/"));
}

function getBytesPerStop(version: number) {
  return version === 2 ? 6 : 5;
}

export function exportCompressed(colorStops: readonly ColorStop[]): string {
  const hasAlpha = colorStops.some((s) => s.color.a !== 1);
  const version = hasAlpha ? 2 : 1;
  const bytesPerStop = getBytesPerStop(version);
  const arrayBuffer = new ArrayBuffer(1 + bytesPerStop * colorStops.length);
  const view = new DataView(arrayBuffer);
  view.setUint8(0, version);
  colorStops.forEach((stop, i) => {
    const offset = 1 + i * bytesPerStop;
    view.setUint16(offset, clamp(stop.position) * 65535, true);
    view.setUint8(offset + 2, clamp(stop.color.r) * 255);
    view.setUint8(offset + 3, clamp(stop.color.g) * 255);
    view.setUint8(offset + 4, clamp(stop.color.b) * 255);
    if (hasAlpha) {
      view.setUint8(offset + 5, clamp(stop.color.a) * 255);
    }
  });
  return base64ToURLSafe(b64ab.encode(arrayBuffer));
}

export function importCompressed(stateString: string): ColorStop[] {
  const data = decodeURLSafeBase64ToArrayBuffer(stateString);
  const view = new DataView(data);
  const version = view.getUint8(0);
  if (version < 1 || version > 2) {
    throw new Error(`invalid version ${version}`);
  }
  const bytesPerStop = getBytesPerStop(version);
  const nStops = (data.byteLength - 1) / bytesPerStop;
  const stops: ColorStop[] = [];
  for (let i = 0; i < nStops; i++) {
    const offset = 1 + i * bytesPerStop;
    stops.push({
      id: i.toString(16),
      position: view.getUint16(offset, true) / 65535,
      color: {
        r: view.getUint8(offset + 2) / 255,
        g: view.getUint8(offset + 3) / 255,
        b: view.getUint8(offset + 4) / 255,
        a: version === 2 ? view.getUint8(offset + 5) / 255 : 1.0,
      },
    });
  }
  return stops;
}
