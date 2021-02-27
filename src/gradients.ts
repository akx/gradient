import { Color, ColorStop } from "./types";
import { sortBy } from "lodash";

function cleanGradient(stops: readonly ColorStop[]): ColorStop[] {
  return sortBy(stops, (cp) => cp.position);
}

function findStops(stops: readonly ColorStop[], position: number) {
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];
  if (stops.length > 1) {
    if (position < firstStop.position) return [firstStop, firstStop];
    if (position > lastStop.position) return [lastStop, lastStop];
    for (var i = 0; i < stops.length - 1; i++) {
      if (stops[i].position <= position && position <= stops[i + 1].position) {
        return [stops[i], stops[i + 1]];
      }
    }
  }
  return [firstStop, lastStop];
}

function interpolate(
  stops: readonly ColorStop[],
  position: number
): Color | null {
  if (stops.length === 0) return null;
  const [stop1, stop2] = findStops(stops, position);
  var delta = stop2.position - stop1.position;
  var alpha = (position - stop1.position) / (delta === 0 ? 1 : delta);
  var beta = 1.0 - alpha;
  const color1 = stop1.color;
  const color2 = stop2.color;

  return {
    r: color1.r * beta + color2.r * alpha,
    g: color1.g * beta + color2.g * alpha,
    b: color1.b * beta + color2.b * alpha,
    a: color1.a * beta + color2.a * alpha,
  };
}

export function renderGradient(
  ctx: CanvasRenderingContext2D,
  stops: readonly ColorStop[]
) {
  ctx.canvas.width = 0 | ctx.canvas.width;
  // can't be 1 px height because drawImage does interpolation (at least on Chrome)
  const imageData = new ImageData(ctx.canvas.width, 4);
  const cleanedStops = cleanGradient(stops);
  for (let x = 0; x < imageData.width; x++) {
    const i = x / (imageData.width - 1);
    const color = interpolate(cleanedStops, i);
    if (color === null) {
      break;
    }
    for (let y = 0; y < imageData.height; y++) {
      const offset = (y * imageData.width + x) * 4;
      imageData.data[offset] = Math.round(color.r * 255);
      imageData.data[offset + 1] = Math.round(color.g * 255);
      imageData.data[offset + 2] = Math.round(color.b * 255);
      imageData.data[offset + 3] = Math.round(color.a * 255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(
    ctx.canvas,
    0,
    0,
    imageData.width,
    2,
    0,
    0,
    imageData.width,
    ctx.canvas.height
  );
}

export function sample(
  stops: readonly ColorStop[],
  position: number
): Color | null {
  const cleanedStops = cleanGradient(stops);
  return interpolate(cleanedStops, position);
}
