import React from "react";
import { ObjectAPI } from "../hooks/useObject";
import { CodegenConfig } from "../codegen/types";

export type CodegenConfigAPI = ObjectAPI<CodegenConfig>;

const CodegenConfigContext = React.createContext<CodegenConfigAPI>(
  {} as CodegenConfigAPI,
);

export default CodegenConfigContext;
