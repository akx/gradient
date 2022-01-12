import { ButtonProps, DivProps } from "./types";
import { tw } from "twind";
import React from "react";

export const Button = (props: ButtonProps) => (
  <button
    {...props}
    className={tw(
      props.className,
      "rounded-md",
      "px-4 py-2",
      "bg-gray(200 300(hover:& focus:&)",
    )}
  />
);
export const ButtonGroup = ({
  spacing,
  ...props
}: DivProps & { spacing: number }) => (
  <div {...props} className={tw(props.className, "flex", `gap-${spacing}`)} />
);
