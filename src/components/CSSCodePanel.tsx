import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { generateCssGradientStops } from "../codegen/cssCodegen";
import React from "react";
import CodegenSettings from "./CodegenSettings";
import { useGradientConfig } from "../hooks/useGradientConfig";
import { tw } from "twind";
import { Textarea } from "../om/forms";
import { Box, Flex } from "../om/layout";

export default function GradientCSSCode() {
  const csApi = useColorStopsAPI();
  const gcApi = useGradientConfig();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const css = generateCssGradientStops(colorStops, gcApi.object, ccApi.object);
  return (
    <Flex>
      <Textarea
        readOnly
        value={css}
        rows={5}
        style={{
          background: `linear-gradient(to right, ${css})`,
        }}
        className={tw`flex-1`}
      />
      <Box className={tw`ml-3`} style={{ minWidth: "15em" }}>
        <CodegenSettings />
      </Box>
    </Flex>
  );
}
