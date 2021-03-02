import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import React from "react";
import { ExportFormat, exportInFormat, importState } from "../export";
import { Button, ButtonGroup, Textarea, useToast } from "@chakra-ui/react";

export default function ImportExportPanel({
  format,
  autoUpdate,
}: {
  format: ExportFormat;
  autoUpdate?: boolean;
}) {
  const toast = useToast();
  const csApi = useColorStopsAPI();
  const { objects: colorStops } = csApi;
  const [exportData, setExportData] = React.useState("");

  const tryLoadData = React.useCallback(() => {
    try {
      const newStops = importState(exportData);
      csApi.replace(newStops);
      toast({
        status: "success",
        title: "Import successful",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Import failed",
        description: error.toString(),
      });
    }
  }, [csApi, exportData, toast]);
  const exportCurrent = React.useCallback(() => {
    setExportData(exportInFormat(colorStops, format));
  }, [colorStops, format]);
  const copyLink = React.useCallback(async () => {
    const data = exportInFormat(colorStops, format);
    const link = new URL(window.location.href);
    link.search = new URLSearchParams([["s", data]]).toString();
    try {
      await navigator.clipboard.writeText(link.toString());
      toast({
        status: "success",
        title: "Link copied",
        description: link.toString(),
      });
    } catch (err) {
      toast({ status: "error", title: err.toString() });
    }
  }, [colorStops, format, toast]);
  React.useEffect(() => {
    if (autoUpdate) exportCurrent();
  }, [colorStops, autoUpdate, exportCurrent]);
  React.useEffect(() => {
    exportCurrent();
  }, [exportCurrent]);
  return (
    <>
      <Textarea
        value={exportData}
        onChange={(e) => setExportData(e.target.value)}
        rows={format === "json" ? 15 : 3}
      />
      <ButtonGroup pt={4} spacing="6">
        <Button onClick={exportCurrent}>Export current state</Button>
        <Button onClick={tryLoadData}>Load state</Button>
        {format === "compressed" ? (
          <Button onClick={copyLink}>Copy link</Button>
        ) : null}
      </ButtonGroup>
    </>
  );
}
