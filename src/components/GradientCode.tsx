import React from "react";
import { ColorStop } from "../types";
import { Textarea } from "@chakra-ui/react";
import { generateCode } from "../codegen";

export function GradientCode({
  colorStops,
}: {
  colorStops: readonly ColorStop[];
}) {
  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    generateCode(colorStops).then(setCode);
  }, [colorStops]);
  return <Textarea readOnly value={code} rows={15} />;
}
