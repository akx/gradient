import React from "react";
import { ObjectAPI } from "../hooks/useObject";
import { GradientConfig } from "../types";

export type GradientConfigAPI = ObjectAPI<GradientConfig>;

const GradientConfigContext = React.createContext<GradientConfigAPI>(
  {} as GradientConfigAPI,
);

export default GradientConfigContext;
