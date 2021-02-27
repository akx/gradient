export function formatNumber(val: number, precision: number): string {
  return val === Math.round(val) ? val.toFixed(0) : val.toFixed(precision);
}
