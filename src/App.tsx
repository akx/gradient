import { Container } from "@chakra-ui/react";
import React from "react";
import { ColorStop } from "./types";
import { StopsSlider } from "./components/StopsSlider";
import { StopEditor } from "./components/StopEditor";
import { useArrayOfObjects } from "./hooks/useArrayOfObjects";
import ColorStopsAPIContext from "./contexts/ColorStopsAPIContext";
import { GradientCanvas } from "./components/GradientCanvas";

function getInitialGradient() {
  return [
    { id: "1", position: 0, color: { r: 0, g: 0, b: 0, a: 1 } },
    { id: "2", position: 0.5, color: { r: 0, g: 1, b: 0, a: 1 } },
    { id: "3", position: 1, color: { r: 1, g: 1, b: 1, a: 1 } },
  ];
}

function App() {
  const colorStopsAPI = useArrayOfObjects<ColorStop>(getInitialGradient);
  const { objects: colorStops, selectedId } = colorStopsAPI;

  const selectedStop = colorStops.find((s) => s.id === selectedId);
  return (
    <Container maxW="container.xl">
      <ColorStopsAPIContext.Provider value={colorStopsAPI}>
        <GradientCanvas colorStops={colorStops} />
        <StopsSlider colorStops={colorStops} selectedStopId={selectedId} />
        {selectedStop ? <StopEditor stop={selectedStop} /> : null}
      </ColorStopsAPIContext.Provider>
    </Container>
  );
}

export default App;
