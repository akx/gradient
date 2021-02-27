import React from "react";
import { ColorStop } from "../types";
import {
  Tab,
  TabList,
  Tabs,
  Textarea,
  TabPanel,
  TabPanels,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { generateCode } from "../codegen/jsCodegen";
import { defaultConfig, defaultJsConfig } from "../codegen/defaults";
import { generateCssGradientStops } from "../codegen/cssCodegen";
import { exportState, importState } from "../export";
import ColorStopsAPIContext from "../contexts/ColorStopsAPIContext";

export function GradientCode({
  colorStops,
}: {
  colorStops: readonly ColorStop[];
}) {
  const csApi = React.useContext(ColorStopsAPIContext);
  const [js, setJS] = React.useState("");
  const [exportData, setExportData] = React.useState("");
  React.useEffect(() => {
    generateCode(colorStops, defaultJsConfig).then(setJS);
  }, [colorStops]);
  const tryLoadData = React.useCallback(() => {
    const newStops = importState(exportData);
    csApi.replace(newStops);
  }, [csApi, exportData]);
  const css = generateCssGradientStops(colorStops, defaultConfig);
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>JavaScript</Tab>
          <Tab>CSS</Tab>
          <Tab>JSON (import/export)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>
              <Textarea readOnly value={js} rows={15} />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <Textarea
                readOnly
                value={css}
                rows={5}
                style={{
                  background: `linear-gradient(to right, ${css})`,
                }}
              />
            </p>
          </TabPanel>
          <TabPanel>
            <Textarea
              value={exportData}
              onChange={(e) => setExportData(e.target.value)}
              rows={15}
            />
            <ButtonGroup pt={4} spacing="6">
              <Button onClick={() => setExportData(exportState(colorStops))}>
                Export current state
              </Button>
              <Button onClick={tryLoadData}>Load state</Button>
            </ButtonGroup>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
