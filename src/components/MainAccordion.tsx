import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import GradientCanvas from "./GradientCanvas";
import StopsSlider from "./StopsSlider";
import StopEditor from "./StopEditor";
import GradientCode from "./GradientCode";
import React from "react";
import GradientConfigPanel from "./GradientConfigPanel";
import { Accordion } from "../om/accordion";

export function MainAccordion() {
  const { objects: colorStops, selectedId } = useColorStopsAPI();
  const selectedStop = colorStops.find((s) => s.id === selectedId);
  return (
    <div>
      <Accordion title="Editor">
        <GradientCanvas colorStops={colorStops} />
        <StopsSlider colorStops={colorStops} selectedStopId={selectedId} />
        {selectedStop ? <StopEditor stop={selectedStop} /> : null}
      </Accordion>
      <Accordion title="Configuration">
        <GradientConfigPanel />
      </Accordion>
      <Accordion title="Code">
        <GradientCode />
      </Accordion>
    </div>
  );
}
