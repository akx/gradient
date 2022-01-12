import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import React from "react";
import { generateSVGGradient } from "../codegen/svgCodegen";
import CodegenSettings from "./CodegenSettings";
import { useGradientConfig } from "../hooks/useGradientConfig";
import { tw } from "twind";
import { Textarea } from "../om/forms";
import { Flex } from "../om/layout";

export default function GradientSVGCodePanel() {
  const csApi = useColorStopsAPI();
  const gcApi = useGradientConfig();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const svg = generateSVGGradient(colorStops, gcApi.object, ccApi.object);
  return (
    <Flex>
      <Textarea readOnly value={svg} rows={15} className={tw`flex-1`} />
      <div className={tw`ml-4`} style={{ minWidth: "15em" }}>
        <CodegenSettings />
      </div>
    </Flex>
  );
}
