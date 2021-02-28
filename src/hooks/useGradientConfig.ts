import React from "react";
import GradientConfigContext from "../contexts/GradientConfigContext";

export function useGradientConfig() {
  return React.useContext(GradientConfigContext);
}
