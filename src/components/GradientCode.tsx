import React from "react";
import GradientJSCodePanel from "./JSCodePanel";
import GradientCSSCodePanel from "./CSSCodePanel";
import GradientSVGCodePanel from "./SVGCodePanel";
import ImportExportPanel from "./ImportExportPanel";
import { ExportFormat } from "../export";
import { tw } from "twind";
import { Tab } from "@headlessui/react";

const Stab: React.FC = ({ children }) => (
  <Tab
    className={({ selected }) =>
      tw(
        "py-2 px-3 border-b-2",
        selected ? "text-blue-700 border-blue-700" : "border-transparent",
      )
    }
    style={{ marginBottom: "-2px" }}
  >
    {children}
  </Tab>
);

function GradientCode() {
  return (
    <div className={tw`flex-1`}>
      <Tab.Group>
        <Tab.List className={tw`mb-2 border-b-2`}>
          <Stab>JavaScript</Stab>
          <Stab>CSS</Stab>
          <Stab>SVG</Stab>
          <Stab>JSON (import/export)</Stab>
          <Stab>Compressed (import/export)</Stab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <GradientJSCodePanel />
          </Tab.Panel>
          <Tab.Panel>
            <GradientCSSCodePanel />
          </Tab.Panel>
          <Tab.Panel>
            <GradientSVGCodePanel />
          </Tab.Panel>
          <Tab.Panel>
            <ImportExportPanel format={ExportFormat.JSON} />
          </Tab.Panel>
          <Tab.Panel>
            <ImportExportPanel format={ExportFormat.Compressed} autoUpdate />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default GradientCode;
