import { Container } from "@chakra-ui/react";
import React from "react";
import { ColorStop, GradientConfig, InterpolationType } from "./types";
import { useArrayOfObjects } from "./hooks/useArrayOfObjects";
import ColorStopsAPIContext from "./contexts/ColorStopsAPIContext";
import { MainAccordion } from "./components/MainAccordion";
import { MainToolbar } from "./components/MainToolbar";
import { getRandomGradient } from "./examplePalettes";
import { useObject } from "./hooks/useObject";
import { CodegenConfig } from "./codegen/types";
import { defaultConfig } from "./codegen/defaults";
import CodegenConfigContext from "./contexts/CodegenConfigContext";
import GradientConfigContext from "./contexts/GradientConfigContext";
import { useInitialStateFromQuery } from "./hooks/useInitialStateFromQuery";

function getInitialGradient() {
  return getRandomGradient(0.1);
}

function getInitialCodegenConfig() {
  return { ...defaultConfig };
}

function getInitialGradientConfig(): GradientConfig {
  return {
    interpolation: InterpolationType.Linear,
    interpolationPoints: 10,
  };
}

function App() {
  const colorStopsAPI = useArrayOfObjects<ColorStop>(getInitialGradient);
  const codegenConfigAPI = useObject<CodegenConfig>(getInitialCodegenConfig);
  const gradientConfigAPI = useObject<GradientConfig>(getInitialGradientConfig);
  useInitialStateFromQuery(colorStopsAPI.replace);
  return (
    <Container maxW="container.xl">
      <ColorStopsAPIContext.Provider value={colorStopsAPI}>
        <CodegenConfigContext.Provider value={codegenConfigAPI}>
          <GradientConfigContext.Provider value={gradientConfigAPI}>
            <MainToolbar />
            <MainAccordion />
          </GradientConfigContext.Provider>
        </CodegenConfigContext.Provider>
      </ColorStopsAPIContext.Provider>
    </Container>
  );
}

export default App;
