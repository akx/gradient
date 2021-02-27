import { Color, ColorStop } from "./types";
import { cleanGradient } from "./gradients";
import { format } from "prettier";
import parser from "prettier/parser-babel";
import { minify } from "terser";

interface CodegenConfig {
  arrowFunction?: boolean;
}

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

function formatCode(minifiedCode: string) {
  return format(minifiedCode, {
    parser: parser.parsers["babel"].parse,
    printWidth: 120,
  });
}

export function generateRawCode(
  stops: readonly ColorStop[],
  config: CodegenConfig,
) {
  const cleanedStops = cleanGradient(stops);
  const codeBits: string[] = [];
  const write = codeBits.push.bind(codeBits);
  if (config.arrowFunction) {
    write("(position) => {");
  } else {
    write("function getColor(position) {");
  }

  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];
    const nextStop = i < cleanedStops.length - 1 ? cleanedStops[i + 1] : null;
    const colorFmt = formatColorReturn(stop.color);
    const posFmt = formatPosition(stop.position);
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
        `const alpha = (position - ${posFmt}) / ${width}, beta = 1 - alpha;`,
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

  return formatCode(codeBits.join(""));
}

export async function generateCode(
  stops: readonly ColorStop[],
  config: CodegenConfig,
): Promise<string> {
  const code = generateRawCode(stops, config);
  const minifyResult = await minify(code, { mangle: false });
  const minifiedCode = minifyResult.code || "";
  return formatCode(minifiedCode);
}

export type GetColor = (i: number) => [number, number, number, number];
