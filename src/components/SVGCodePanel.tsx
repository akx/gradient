import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import React from "react";
import { useDebounce } from "react-use";
import { generateSVGGradient } from "../codegen/svgCodegen";
import { defaultConfig } from "../codegen/defaults";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import CodegenSettings from "./CodegenSettings";
import { useGradientConfig } from "../hooks/useGradientConfig";

export default function GradientSVGCodePanel() {
  const csApi = useColorStopsAPI();
  const gcApi = useGradientConfig();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const svg = generateSVGGradient(colorStops, gcApi.object, ccApi.object);
  return (
    <Flex>
      <Textarea readOnly value={svg} rows={15} mt={2} />
      <Box minW="15em" ml={4}>
        <CodegenSettings />
      </Box>
    </Flex>
  );
}
