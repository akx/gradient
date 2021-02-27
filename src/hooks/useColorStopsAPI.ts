import React from "react";
import ColorStopsAPIContext from "../contexts/ColorStopsAPIContext";

export function useColorStopsAPI() {
  return React.useContext(ColorStopsAPIContext);
}
