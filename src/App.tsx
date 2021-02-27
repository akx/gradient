import { Container } from "@chakra-ui/react";
import React from "react";
import { ColorStop } from "./types";
import { useArrayOfObjects } from "./hooks/useArrayOfObjects";
import ColorStopsAPIContext from "./contexts/ColorStopsAPIContext";
import { MainAccordion } from "./components/MainAccordion";
import { MainToolbar } from "./components/MainToolbar";
import { getRandomGradient } from "./examplePalettes";

function getInitialGradient() {
  return getRandomGradient(0.1);
}

function App() {
  const colorStopsAPI = useArrayOfObjects<ColorStop>(getInitialGradient);
  return (
    <Container maxW="container.xl">
      <ColorStopsAPIContext.Provider value={colorStopsAPI}>
        <MainToolbar />
        <MainAccordion />
      </ColorStopsAPIContext.Provider>
    </Container>
  );
}

export default App;
