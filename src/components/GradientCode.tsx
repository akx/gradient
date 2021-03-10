import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import GradientJSCodePanel from "./JSCodePanel";
import GradientCSSCodePanel from "./CSSCodePanel";
import GradientSVGCodePanel from "./SVGCodePanel";
import ImportExportPanel from "./ImportExportPanel";
import { ExportFormat } from "../export";

function GradientCode() {
  return (
    <Tabs flex={1} isLazy>
      <TabList>
        <Tab>JavaScript</Tab>
        <Tab>CSS</Tab>
        <Tab>SVG</Tab>
        <Tab>JSON (import/export)</Tab>
        <Tab>Compressed (import/export)</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GradientJSCodePanel />
        </TabPanel>
        <TabPanel>
          <GradientCSSCodePanel />
        </TabPanel>
        <TabPanel>
          <GradientSVGCodePanel />
        </TabPanel>
        <TabPanel>
          <ImportExportPanel format={ExportFormat.JSON} />
        </TabPanel>
        <TabPanel>
          <ImportExportPanel format={ExportFormat.Compressed} autoUpdate />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default GradientCode;
