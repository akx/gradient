import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { generateCssGradientStops } from "../codegen/cssCodegen";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import React from "react";
import CodegenSettings from "./CodegenSettings";

export default function GradientCSSCode() {
  const csApi = useColorStopsAPI();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const { object: codegenConfig } = ccApi;
  const css = generateCssGradientStops(colorStops, codegenConfig);
  return (
    <Flex>
      <Textarea
        readOnly
        value={css}
        rows={5}
        style={{
          background: `linear-gradient(to right, ${css})`,
        }}
      />
      <Box minW="15em" ml={4}>
        <CodegenSettings />
      </Box>
    </Flex>
  );
}
