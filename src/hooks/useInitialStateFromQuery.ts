import { ColorStop } from "../types";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { importState } from "../export";

export function useInitialStateFromQuery(
  replaceColorStops: (value: ColorStop[]) => void,
) {
  const toast = useToast();
  React.useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const stateParam = qs.get("s");
    if (stateParam) {
      try {
        replaceColorStops(importState(stateParam));
      } catch (error) {
        toast({
          status: "error",
          title: "Could not load state from URL",
          description: error.toString(),
        });
      }
    }
  }, [toast, replaceColorStops]);
}
