import { Container } from "@chakra-ui/react";
import React from "react";
import { ColorStop } from "./types";
import { useArrayOfObjects } from "./hooks/useArrayOfObjects";
import ColorStopsAPIContext from "./contexts/ColorStopsAPIContext";
import { MainAccordion } from "./components/MainAccordion";
import { MainToolbar } from "./components/MainToolbar";
import { getRandomGradient } from "./examplePalettes";
import { useObject } from "./hooks/useObject";
import { CodegenConfig } from "./codegen/types";
import { defaultConfig } from "./codegen/defaults";
import CodegenConfigContext from "./contexts/CodegenConfigContext";

function getInitialGradient() {
  return getRandomGradient(0.1);
}
function getInitialCodegenConfig() {
  return { ...defaultConfig };
}

function App() {
  const colorStopsAPI = useArrayOfObjects<ColorStop>(getInitialGradient);
  const codegenConfigAPI = useObject<CodegenConfig>(getInitialCodegenConfig);
  return (
    <Container maxW="container.xl">
      <ColorStopsAPIContext.Provider value={colorStopsAPI}>
        <CodegenConfigContext.Provider value={codegenConfigAPI}>
          <MainToolbar />
          <MainAccordion />
        </CodegenConfigContext.Provider>
      </ColorStopsAPIContext.Provider>
    </Container>
  );
}

export default App;
