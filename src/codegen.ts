import { Color, ColorStop } from "./types";
import { cleanGradient } from "./gradients";
import { format } from "prettier";
import parser from "prettier/parser-babel";
import { minify } from "terser";

function formatColorReturn({ r, g, b, a }: Color): string {
  let rf = formatColorNum(r);
  let gf = formatColorNum(g);
  let bf = formatColorNum(b);
  let af = formatColorNum(a);
  return `[${rf},${gf},${bf},${af}]`;
}

function formatPosition(val: number): string {
  if (val === Math.round(val)) return val.toFixed(0);
  return val.toFixed(3);
}

function formatColorNum(val: number): string {
  if (val === Math.round(val)) return val.toFixed(0);
  return val.toFixed(4);
}

function formatLerpComponent(a: number, b: number): string {
  if (Math.abs(a - b) < 0.001) return formatColorNum(a);
  return `${formatColorNum(a)} * beta + ${formatColorNum(b)} * alpha`;
}

export async function generateCode(
  stops: readonly ColorStop[]
): Promise<string> {
  const cleanedStops = cleanGradient(stops);
  const codeBits: string[] = [];
  const write = codeBits.push.bind(codeBits);
  write("function getColor(position) {");

  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];
    const nextStop = i < cleanedStops.length - 1 ? cleanedStops[i + 1] : null;
    const colorFmt = formatColorReturn(stop.color);
    let posFmt = formatPosition(stop.position);
    if (i === 0) {
      write(`if(position <= ${posFmt}) return ${colorFmt};`);
    } else if (i === cleanedStops.length - 1) {
      write(`return ${colorFmt};`);
    }
    if (nextStop) {
      write(`if(position < ${formatPosition(nextStop.position)})`);
      write(`{`);
      let width = formatPosition(nextStop.position - stop.position);
      write(
        `const beta = (position - ${posFmt}) / ${width}, alpha = 1 - beta;`
      );
      write(`return [
      ${formatLerpComponent(stop.color.r, nextStop.color.r)},
      ${formatLerpComponent(stop.color.g, nextStop.color.g)},
      ${formatLerpComponent(stop.color.b, nextStop.color.b)},
      ${formatLerpComponent(stop.color.a, nextStop.color.a)},
      ];`);
      write(`}`);
    }
  }

  write("}");

  const code = codeBits.join("");
  const minifiedCode = (await minify(code, { mangle: false })).code || "";
  return format(minifiedCode, {
    parser: parser.parsers["babel"].parse,
    printWidth: 120,
  });
}
