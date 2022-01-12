import React from "react";
import {
  DivProps,
  InputProps,
  IsDisabled,
  SpanProps,
  TextareaProps,
} from "./types";
import { tw } from "twind";

export const NumberInput = ({
  isDisabled,
  onChange,
  ...props
}: Omit<InputProps, "onChange"> & {
  onChange: (v: string, vNum: number) => void;
} & IsDisabled) => {
  return (
    <input
      {...props}
      disabled={isDisabled}
      onChange={(e) => onChange(e.target.value, e.target.valueAsNumber)}
      type="number"
      className={tw(props.className, "border-1", "p-2", "w-full")}
    />
  );
};
export const Slider = ({
  isDisabled,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...props
}: InputProps & IsDisabled) => (
  <input {...props} disabled={isDisabled} type="range" />
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Textarea = ({ children, ...props }: TextareaProps) => (
  <textarea {...props} className={tw(props.className, "border-1", "p-2")} />
);

export function Checkbox({
  isChecked,
  onChange,
  children,
}: React.PropsWithChildren<{
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={tw`mr-2`}
      />
      {children}
    </label>
  );
}

export const Input = (props: InputProps) => (
  <input {...props} className={tw(props.className, "border-1", "p-2")} />
);
export const FormControl = (props: DivProps) => <div {...props} />;
export const FormHelperText = (props: SpanProps) => <span {...props} />;
export const FormLabel = (props: DivProps) => (
  <div {...props} className={tw(props.className, `font-medium pb-1`)} />
);
