import { ColorStop } from "../types";
import React from "react";
import background from "../graphy.png";
import noisyBackground from "../nois.gif";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { defaultJsConfig } from "../codegen/defaults";
import { renderGradient } from "../gradients/render";
import { useGradientConfig } from "../hooks/useGradientConfig";

function GradientCanvas({ colorStops }: { colorStops: readonly ColorStop[] }) {
  const codegenConfig = useCodegenConfig().object;
  const gradientConfig = useGradientConfig().object;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (context) {
      renderGradient(context, colorStops, gradientConfig, {
        ...defaultJsConfig,
        ...codegenConfig,
      });
    }
  }, [colorStops, codegenConfig, gradientConfig]);
  const backgroundStyle: Partial<React.CSSProperties> =
    colorStops.length > 0
      ? { background: `url(${background})` }
      : {
          backgroundImage: `url(${noisyBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        };
  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={150}
      style={{ width: "100%", ...backgroundStyle }}
    />
  );
}

export default GradientCanvas;
