export type ButtonProps = JSX.IntrinsicElements["button"];
export type DivProps = JSX.IntrinsicElements["div"];
export type SpanProps = JSX.IntrinsicElements["span"];
export type InputProps = JSX.IntrinsicElements["input"];
export type TextareaProps = JSX.IntrinsicElements["textarea"];
export type IsDisabled = { isDisabled?: boolean };

export interface Toast {
  status: string;
  title: string;
  description?: string;
}
