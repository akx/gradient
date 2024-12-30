import { Color, ColorStop, GradientConfig } from "../types";
import * as prettier from "prettier/standalone"
import parserBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";

import { minify } from "terser";
import { JsCodegenConfig } from "./types";
import { formatNumber } from "./utils";
import { mangleGradient } from "../gradients/mangle";

function formatColorReturn(
  { r, g, b, a }: Color,
  withAlpha: boolean,
  precision: number,
): string {
  const rf = formatNumber(r, precision);
  const gf = formatNumber(g, precision);
  const bf = formatNumber(b, precision);
  if (withAlpha) {
    const af = formatNumber(a, precision);
    return `[${rf},${gf},${bf},${af}]`;
  }
  return `[${rf},${gf},${bf}]`;
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
  return prettier.format(minifiedCode, {
    parser: "babel",
    plugins: [parserBabel, prettierPluginEstree],
    printWidth: 120,
  });
}

function writeJSBody(
  write: (s: string) => void,
  cleanedStops: readonly ColorStop[],
  config: JsCodegenConfig,
) {
  for (let i = 0; i < cleanedStops.length; i++) {
    const stop = cleanedStops[i];
    const nextStop = i < cleanedStops.length - 1 ? cleanedStops[i + 1] : null;
    const colorFmt = formatColorReturn(
      stop.color,
      config.includeAlpha,
      config.valuePrecision,
    );
    const stopPos = parseFloat(
      formatNumber(stop.position, config.positionPrecision),
    );
    const posFmt = formatNumber(stopPos, config.positionPrecision);
    if (i === cleanedStops.length - 1) {
      write(`return ${colorFmt};`);
    } else if (i === 0 && stopPos > 0) {
      write(`if(position <= ${posFmt}) return ${colorFmt};`);
    }
    if (nextStop) {
      const nextPos = parseFloat(
        formatNumber(nextStop.position, config.positionPrecision),
      );
      write(
        `if(position < ${formatNumber(nextPos, config.positionPrecision)})`,
      );
      write(`{`);
      const width = nextPos - stopPos;
      const iWidthFmt = formatNumber(1 / width, config.positionPrecision);

      if (stopPos === 0) {
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
      }
      write(`return [${components.join(",")}];`);
      write(`}`);
    }
  }
}

export function generateRawCode(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  config: JsCodegenConfig,
) {
  const cleanedStops = mangleGradient(stops, gradientConfig);
  const codeBits: string[] = [];
  const write = codeBits.push.bind(codeBits);
  if (config.arrowFunction) {
    write("(position) => {");
  } else {
    write("function getColor(position) {");
  }
  if (cleanedStops.length) {
    writeJSBody(write, cleanedStops, config);
  } else {
    write("return [0, 0, 0, 0]; /* No stops */");
  }

  write("}");

  return codeBits.join("");
}

export async function generateCode(
  stops: readonly ColorStop[],
  gradientConfig: GradientConfig,
  codegenConfig: JsCodegenConfig,
): Promise<string> {
  const code = await formatCode(
    generateRawCode(stops, gradientConfig, codegenConfig),
  );
  const minifyResult = await minify(code, { mangle: false });
  const minifiedCode = minifyResult.code || "";
  return formatCode(minifiedCode);
}

export type GetColor = (i: number) => [number, number, number, number];
