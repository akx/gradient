import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import React from "react";
import { useDebounce } from "react-use";
import { generateCode } from "../codegen/jsCodegen";
import { defaultJsConfig } from "../codegen/defaults";
import CodegenSettings from "./CodegenSettings";
import { useGradientConfig } from "../hooks/useGradientConfig";
import { tw } from "twind";
import { Textarea } from "../om/forms";
import { Flex } from "../om/layout";

export default function GradientJSCodePanel() {
  const csApi = useColorStopsAPI();
  const gcApi = useGradientConfig();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const { object: codegenConfig } = ccApi;
  const { object: gradientConfig } = gcApi;
  const [js, setJS] = React.useState("");

  useDebounce(
    () => {
      generateCode(colorStops, gradientConfig, {
        ...defaultJsConfig,
        ...codegenConfig,
      }).then(setJS);
    },
    100,
    [gradientConfig, codegenConfig, colorStops],
  );
  return (
    <Flex>
      <Textarea readOnly value={js} rows={15} className={tw`flex-1`} />
      <div className={tw`ml-4`} style={{ minWidth: "15em" }}>
        <CodegenSettings />
      </div>
    </Flex>
  );
}
