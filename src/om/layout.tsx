import { DivProps } from "./types";
import { tw } from "twind";
import React from "react";

export const Box = ({ p, ...props }: DivProps & { p?: number }) => (
  <div {...props} className={tw(props.className, p ? `p-${p}` : null)} />
);
export const Flex = ({ className, ...props }: DivProps) => (
  <div {...props} className={tw("flex", className)} />
);
export const Spacer = () => <div className={tw`flex flex-grow`} />;
export const Stack = ({
  direction,
  ...props
}: { direction: "row" | "column" } & DivProps) => (
  <div
    {...props}
    className={tw(props.className, "flex", {
      "flex-col": direction === "column",
      "flex-row": direction === "row",
    })}
  />
);
