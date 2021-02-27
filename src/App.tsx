import { Container } from "@chakra-ui/react";
import React from "react";
import { ColorStop } from "./types";
import { useArrayOfObjects } from "./hooks/useArrayOfObjects";
import ColorStopsAPIContext from "./contexts/ColorStopsAPIContext";
import { MainAccordion } from "./components/MainAccordion";
import { MainToolbar } from "./components/MainToolbar";

function getInitialGradient() {
  return [
    { id: "1", position: 0, color: { r: 0, g: 0, b: 0, a: 1 } },
    { id: "2", position: 0.5, color: { r: 0, g: 1, b: 0, a: 1 } },
    { id: "3", position: 1, color: { r: 1, g: 1, b: 1, a: 1 } },
  ];
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
