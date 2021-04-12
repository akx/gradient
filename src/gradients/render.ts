import { ColorStop, GradientConfig } from "../types";
import { JsCodegenConfig } from "../codegen/types";
import { generateRawCode, GetColor } from "../codegen/jsCodegen";

export function renderGradient(
  ctx: CanvasRenderingContext2D,
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  jsCodegenConfig: JsCodegenConfig,
) {
  ctx.canvas.width = 0 | ctx.canvas.width;
  if (stops.length === 0) {
    return;
  }
  // can't be 1 px height because drawImage does interpolation (at least on Chrome)
  const imageData = new ImageData(ctx.canvas.width, 4);
  const code = generateRawCode(stops, gradientConfig, {
    ...jsCodegenConfig,
    arrowFunction: true,
  });
  // eslint-disable-next-line no-eval
  const getColor: GetColor = eval(code);
  const { width, height } = imageData;
  for (let x = 0; x < width; x++) {
    const position = x / (width - 1);
    const [r, g, b, a] = getColor(position);
    const rc = Math.round(r * 255);
    const gc = Math.round(g * 255);
    const bc = Math.round(b * 255);
    const ac = Math.round((a === undefined ? 1 : a) * 255);
    for (let y = 0; y < height; y++) {
      const offset = (y * width + x) * 4;
      imageData.data[offset] = rc;
      imageData.data[offset + 1] = gc;
      imageData.data[offset + 2] = bc;
      imageData.data[offset + 3] = ac;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(ctx.canvas, 0, 0, width, 2, 0, 0, width, ctx.canvas.height);
}
