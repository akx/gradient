import { Color, ColorStop } from "../types";
import { cleanGradient } from "../gradients";
import { format } from "prettier";
import parser from "prettier/parser-babel";
import { minify } from "terser";
import { JsCodegenConfig } from "./types";

function formatColorReturn(
  { r, g, b, a }: Color,
  withAlpha: boolean,
  precision: number,
): string {
  let rf = formatNumber(r, precision);
  let gf = formatNumber(g, precision);
  let bf = formatNumber(b, precision);
  if (withAlpha) {
    let af = formatNumber(a, precision);
    return `[${rf},${gf},${bf},${af}]`;
  }
  return `[${rf},${gf},${bf}]`;
}

function formatNumber(val: number, precision: number): string {
  return val === Math.round(val) ? val.toFixed(0) : val.toFixed(precision);
}

function formatABMultiplication(
  n: number,
  precision: number,
  multiplier: string,
): string {
  if (n === 0) return "0";
  if (n === 1) return multiplier;
  return `${formatNumber(n, precision)} * ${multiplier}`;
}

function formatLerpComponent(a: number, b: number, precision: number): string {
  if (Math.abs(a - b) < 0.001) return formatNumber(a, precision);
  const aMul = formatABMultiplication(a, precision, "b");
  const bMul = formatABMultiplication(b, precision, "a");
  if (a === 0) return bMul;
  if (b === 0) return aMul;
  return `${aMul} + ${bMul}`;
}

function formatCode(minifiedCode: string) {
  return format(minifiedCode, {
    parser: parser.parsers["babel"].parse,
    printWidth: 120,
  });
}

export function generateRawCode(
  stops: readonly ColorStop[],
  config: JsCodegenConfig,
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
    const colorFmt = formatColorReturn(
      stop.color,
      config.includeAlpha,
      config.valuePrecision,
    );
    const posFmt = formatNumber(stop.position, config.positionPrecision);
    if (i === 0 && stop.position > 0) {
      write(`if(position <= ${posFmt}) return ${colorFmt};`);
    } else if (i === cleanedStops.length - 1) {
      write(`return ${colorFmt};`);
    }
    if (nextStop) {
      write(
        `if(position < ${formatNumber(
          nextStop.position,
          config.positionPrecision,
        )})`,
      );
      write(`{`);
      let width = nextStop.position - stop.position;
      const iWidthFmt = formatNumber(1 / width, config.positionPrecision);

      if (stop.position === 0) {
        write(`const a = position * ${iWidthFmt}, b = 1 - a;`);
      } else {
        write(`const a = (position - ${posFmt}) * ${iWidthFmt}, b = 1 - a;`);
      }
      const components = [
        formatLerpComponent(
          stop.color.r,
          nextStop.color.r,
          config.valuePrecision,
        ),
        formatLerpComponent(
          stop.color.g,
          nextStop.color.g,
          config.valuePrecision,
        ),
        formatLerpComponent(
          stop.color.b,
          nextStop.color.b,
          config.valuePrecision,
        ),
      ];
      if (config.includeAlpha) {
        components.push(
          formatLerpComponent(
            stop.color.a,
            nextStop.color.a,
            config.valuePrecision,
          ),
        );
        write(`return [${components.join(",")}];`);
      }
      write(`}`);
    }
  }

  write("}");

  return formatCode(codeBits.join(""));
}

export async function generateCode(
  stops: readonly ColorStop[],
  config: JsCodegenConfig,
): Promise<string> {
  const code = generateRawCode(stops, config);
  const minifyResult = await minify(code, { mangle: false });
  const minifiedCode = minifyResult.code || "";
  return formatCode(minifiedCode);
}

export type GetColor = (i: number) => [number, number, number, number];
