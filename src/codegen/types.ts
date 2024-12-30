export interface CodegenConfig {
  includeAlpha: boolean;
  positionPrecision: number;
  valuePrecision: number;
  hexColors: boolean;
}

export interface JsCodegenConfig extends CodegenConfig {
  arrowFunction: boolean;
}
