import { ColorStop } from "../types";
import React from "react";
import { renderGradient } from "../gradients";

export function GradientCanvas({
  colorStops,
}: {
  colorStops: readonly ColorStop[];
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (context) {
      renderGradient(context, colorStops);
    }
  }, [colorStops]);
  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={150}
      style={{ width: "100%" }}
    />
  );
}
