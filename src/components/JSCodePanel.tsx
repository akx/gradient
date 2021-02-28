import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import React from "react";
import { useDebounce } from "react-use";
import { generateCode } from "../codegen/jsCodegen";
import { defaultJsConfig } from "../codegen/defaults";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import CodegenSettings from "./CodegenSettings";

export default function GradientJSCodePanel() {
  const csApi = useColorStopsAPI();
  const ccApi = useCodegenConfig();
  const { objects: colorStops } = csApi;
  const { object: codegenConfig } = ccApi;
  const [js, setJS] = React.useState("");

  useDebounce(
    () => {
      generateCode(colorStops, { ...defaultJsConfig, ...codegenConfig }).then(
        setJS,
      );
    },
    100,
    [codegenConfig, colorStops],
  );
  return (
    <Flex>
      <Textarea readOnly value={js} rows={15} mt={2} />
      <Box minW="15em" ml={4}>
        <CodegenSettings />
      </Box>
    </Flex>
  );
}
