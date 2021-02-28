import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import GradientCanvas from "./GradientCanvas";
import StopsSlider from "./StopsSlider";
import StopEditor from "./StopEditor";
import GradientCode from "./GradientCode";
import React from "react";
import GradientConfigPanel from "./GradientConfigPanel";

const AccordionHeader: React.FC = ({ children }) => (
  <h2>
    <AccordionButton>
      <Box flex="1" textAlign="left">
        {children}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
);

export function MainAccordion() {
  const { objects: colorStops, selectedId } = useColorStopsAPI();
  const selectedStop = colorStops.find((s) => s.id === selectedId);
  return (
    <Accordion defaultIndex={[0, 1]} allowMultiple reduceMotion>
      <AccordionItem>
        <AccordionHeader>Editor</AccordionHeader>
        <AccordionPanel pb={4}>
          <GradientCanvas colorStops={colorStops} />
          <StopsSlider colorStops={colorStops} selectedStopId={selectedId} />
          {selectedStop ? <StopEditor stop={selectedStop} /> : null}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Configuration</AccordionHeader>
        <AccordionPanel pb={4}>
          <GradientConfigPanel />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>Code</AccordionHeader>
        <AccordionPanel pb={4}>
          <GradientCode />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
