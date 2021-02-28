import { ColorStop } from "../types";
import { invertColor, toCssRgb, toCssRgba } from "../utils";
import React from "react";
import { useEvent } from "react-use";
import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { sample } from "../gradients/basic";

function getX(event: Event | React.MouseEvent, sliderBody: HTMLDivElement) {
  const x = (event as MouseEvent).clientX;
  const rect = sliderBody.getBoundingClientRect();
  const pos = rect.left;
  const length = rect.width;
  const value = Math.min(1, Math.max(0, (x - pos) / length));
  return value;
}

export function StopsSlider({
  colorStops,
  selectedStopId,
}: {
  colorStops: readonly ColorStop[];
  selectedStopId: string | null;
}) {
  const csApi = useColorStopsAPI();
  const [movingId, setMovingId] = React.useState<string | null>(null);
  const sliderBodyRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const stopId = (event.target as HTMLElement).dataset.stopid;
      if (stopId) {
        setMovingId(stopId);
        csApi.select(stopId);
      }
    },
    [csApi],
  );
  const onMouseUp = React.useCallback(() => {
    setMovingId(null);
  }, []);
  const onMouseMove = React.useCallback(
    (event: Event) => {
      const sliderBody = sliderBodyRef.current;
      if (!(movingId && sliderBody)) {
        return;
      }
      const value = getX(event, sliderBody);
      csApi.changePartial(movingId, { position: value });
    },
    [movingId, csApi],
  );
  useEvent("mouseup", movingId ? onMouseUp : null, window, { capture: true });
  useEvent("mousemove", movingId ? onMouseMove : null, window, {
    capture: true,
  });

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const stopId = (event.target as HTMLElement).dataset.stopid;
      if (stopId) {
        csApi.select(stopId);
        event.stopPropagation();
        event.preventDefault();
      }
    },
    [csApi],
  );
  const handleDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === sliderBodyRef.current) {
        const position = getX(event, sliderBodyRef.current);
        const sampledColor = sample(colorStops, position) || {
          r: 1,
          g: 0,
          b: 1,
          a: 1,
        };
        let id = Math.random().toString(32);
        csApi.add({
          id,
          position,
          color: sampledColor,
        });
        csApi.select(id);
      }
    },
    [csApi, colorStops],
  );
  return (
    <div
      style={{
        position: "relative",
        height: "1em",
        background: "cornsilk",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={sliderBodyRef}
    >
      {colorStops.map((stop) => (
        <div
          key={stop.id}
          data-stopid={stop.id}
          style={{
            position: "absolute",
            left: `${stop.position * 100}%`,
            transform: `translateX(-50%) translateY(-5px)`,
            background: toCssRgba(stop.color),
            color: toCssRgb(invertColor(stop.color)),
            cursor: "move",
            userSelect: "none",
            width: "5ch",
            textAlign: "center",
            border: "1px solid black",
            borderRadius: "3px",
            borderColor: selectedStopId === stop.id ? "black" : "transparent",
            fontSize: "8pt",
          }}
        >
          {(stop.position * 100).toFixed(0)}%
        </div>
      ))}
    </div>
  );
}
