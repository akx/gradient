import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import React from "react";
import { exportState, importState } from "../export";
import { Button, ButtonGroup, Textarea } from "@chakra-ui/react";

export default function ImportExportPanel() {
  const csApi = useColorStopsAPI();
  const { objects: colorStops } = csApi;
  const [exportData, setExportData] = React.useState("");

  const tryLoadData = React.useCallback(() => {
    try {
      const newStops = importState(exportData);
      csApi.replace(newStops);
    } catch (error) {
      alert(error);
    }
  }, [csApi, exportData]);
  return (
    <>
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
    </>
  );
}
