export interface CodegenConfig {
  includeAlpha: boolean;
  positionPrecision: number;
  valuePrecision: number;
}

export interface JsCodegenConfig extends CodegenConfig {
  arrowFunction: boolean;
}
