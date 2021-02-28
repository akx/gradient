import { ColorStop } from "../types";
import React from "react";
import { renderGradient } from "../gradients";
import background from "../graphy.png";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { defaultJsConfig } from "../codegen/defaults";

export function GradientCanvas({
  colorStops,
}: {
  colorStops: readonly ColorStop[];
}) {
  const codegenConfig = useCodegenConfig().object;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (context) {
      renderGradient(context, colorStops, {
        ...defaultJsConfig,
        ...codegenConfig,
      });
    }
  }, [colorStops, codegenConfig]);
  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={150}
      style={{ width: "100%", background: `url(${background})` }}
    />
  );
}
