import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import GradientJSCodePanel from "./JSCodePanel";
import GradientCSSCodePanel from "./CSSCodePanel";
import ImportExportPanel from "./ImportExportPanel";

export function GradientCode() {
  return (
    <Tabs flex={1} isLazy>
      <TabList>
        <Tab>JavaScript</Tab>
        <Tab>CSS</Tab>
        <Tab>JSON (import/export)</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GradientJSCodePanel />
        </TabPanel>
        <TabPanel>
          <GradientCSSCodePanel />
        </TabPanel>
        <TabPanel>
          <ImportExportPanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
