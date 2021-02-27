import React from "react";
import { ColorStop } from "../types";
import {
  Input,
  Tab,
  TabList,
  Tabs,
  Textarea,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { generateCode } from "../codegen/jsCodegen";
import { defaultConfig, defaultJsConfig } from "../codegen/defaults";
import { generateCssGradientStops } from "../codegen/cssCodegen";

export function GradientCode({
  colorStops,
}: {
  colorStops: readonly ColorStop[];
}) {
  const [js, setJS] = React.useState("");
  React.useEffect(() => {
    generateCode(colorStops, defaultJsConfig).then(setJS);
  }, [colorStops]);
  const css = generateCssGradientStops(colorStops, defaultConfig);
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>JavaScript</Tab>
          <Tab>CSS</Tab>
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
        </TabPanels>
      </Tabs>
    </>
  );
}
