import { ColorStop } from "../types";
import React from "react";
import { ArrayOfObjectsAPI } from "../hooks/useArrayOfObjects";

export type ColorStopsAPI = ArrayOfObjectsAPI<ColorStop>;

const ColorStopsAPIContext = React.createContext<ColorStopsAPI>(
  {} as ColorStopsAPI,
);

export default ColorStopsAPIContext;
