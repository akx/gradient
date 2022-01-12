import React from "react";
import { DivProps, InputProps, IsDisabled } from "./types";
import { tw } from "twind";

const RadioGroupContext = React.createContext<{
  isDisabled: boolean;
  onChange?: (s: string) => void;
  value?: string;
}>({
  isDisabled: false,
});
export const Radio = ({
  disabled,
  children,
  ...props
}: Omit<InputProps, "onChange">) => (
  <RadioGroupContext.Consumer>
    {(ctx) => (
      <label className={tw`py-1`}>
        <input
          {...props}
          disabled={ctx.isDisabled ?? disabled}
          onChange={(e) => ctx.onChange?.(e.target.value)}
          checked={ctx.value === props.value}
          type="radio"
          className={tw`mr-2`}
        />
        {children}
      </label>
    )}
  </RadioGroupContext.Consumer>
);
export const RadioGroup = ({
  isDisabled,
  onChange,
  value,
  ...props
}: Omit<DivProps, "onChange"> &
  IsDisabled & { onChange: (s: string) => void; value: string }) => {
  const context = React.useMemo(
    () => ({ isDisabled: !!isDisabled, onChange, value }),
    [isDisabled, onChange, value],
  );
  return (
    <RadioGroupContext.Provider value={context}>
      <div {...props} />
    </RadioGroupContext.Provider>
  );
};
