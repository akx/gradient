import { ColorStop } from "../types";
import { exportJSON, importJSON } from "./json";
import { exportCompressed, importCompressed } from "./compressed";

export enum ExportFormat {
  JSON = "json",
  Compressed = "compressed",
}

export function importState(stateString: string): ColorStop[] {
  if (stateString.startsWith("[") || stateString.startsWith("{")) {
    return importJSON(JSON.parse(stateString));
  }
  return importCompressed(stateString);
}

export function exportInFormat(
  colorStops: readonly ColorStop[],
  format: ExportFormat,
): string {
  switch (format) {
    case ExportFormat.Compressed:
      return exportCompressed(colorStops);
    case ExportFormat.JSON:
      return exportJSON(colorStops);
  }
  throw new Error();
}
