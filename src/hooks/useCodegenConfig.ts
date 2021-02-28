import React from "react";
import CodegenConfigContext from "../contexts/CodegenConfigContext";

export function useCodegenConfig() {
  return React.useContext(CodegenConfigContext);
}
