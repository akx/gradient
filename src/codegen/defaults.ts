import { CodegenConfig, JsCodegenConfig } from "./types";

export const defaultConfig: CodegenConfig = {
  includeAlpha: true,
  positionPrecision: 3,
  valuePrecision: 4,
  hexColors: false,
};

export const defaultJsConfig: JsCodegenConfig = {
  ...defaultConfig,
  arrowFunction: false,
};
