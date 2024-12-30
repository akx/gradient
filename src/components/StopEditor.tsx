import React from "react";
import { ColorStop } from "../types";
import { convertRgbToHsl } from "culori/fn";
import { clamp, colorToRGBHex, hexToColor, modifyHSL } from "../utils";
import ColorComponentSlider from "./ColorComponentSlider";
import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { tw } from "twind";
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  Slider,
} from "../om/forms";
import { Button, ButtonGroup } from "../om/button";
import { Box, Flex } from "../om/layout";

type StopEditorProps = {
  stop: ColorStop;
};

const formatComponentHelp = (value: number) => {
  const intValue = Math.round(value * 255);
  return <>{intValue}</>;
};

function StopEditor({ stop }: StopEditorProps) {
  const csApi = useColorStopsAPI();
  const onChangeComponent = React.useCallback(
    (eventKey: string, value: number) => {
      const newStop = { ...stop };
      const { color } = newStop;
      switch (eventKey) {
        case "red":
          newStop.color = { ...color, r: clamp(value) };
          break;
        case "green":
          newStop.color = { ...color, g: clamp(value) };
          break;
        case "blue":
          newStop.color = { ...color, b: clamp(value) };
          break;
        case "alpha":
          newStop.color = { ...color, a: clamp(value) };
          break;
        case "hue":
          newStop.color = modifyHSL(color, { h: value });
          break;
        case "saturation":
          newStop.color = modifyHSL(color, { s: clamp(value) });
          break;
        case "lightness":
          newStop.color = modifyHSL(color, { l: clamp(value) });
          break;
      }
      csApi.change(newStop);
    },
    [csApi, stop],
  );
  const colorAsHsl = convertRgbToHsl(stop.color);
  const onChangeHex = React.useCallback(
    (event) => {
      const color = hexToColor(event.target.value, stop.color.a);
      if (color) {
        csApi.change({ ...stop, color });
      }
    },
    [csApi, stop],
  );
  return (
    <Box className={tw`border-1 rounded-lg`} p={6}>
      <FormControl>
        <FormLabel>Position</FormLabel>
        <Flex>
          <Slider
            className={tw`mr-2 flex-1`}
            value={stop.position}
            step="any"
            min={0}
            max={1}
            onChange={(e) =>
              csApi.changePartial(stop.id, {
                position: clamp(e.target.valueAsNumber),
              })
            }
          />
          <NumberInput
            style={{ width: "7rem" }}
            min={0}
            max={1}
            step={0.01}
            value={stop.position}
            onChange={(_, val) =>
              csApi.changePartial(stop.id, { position: clamp(val) })
            }
          />
        </Flex>
      </FormControl>
      <div className={tw`grid grid-cols-4 gap-2`}>
        <Box>
          <ColorComponentSlider
            label="Red"
            eventKey="red"
            onChange={onChangeComponent}
            value={stop.color.r}
            min={0}
            max={1}
            trackColor="red"
            formatHelp={formatComponentHelp}
          />
        </Box>
        <Box>
          <ColorComponentSlider
            label="Green"
            eventKey="green"
            onChange={onChangeComponent}
            value={stop.color.g}
            min={0}
            max={1}
            trackColor="green"
            formatHelp={formatComponentHelp}
          />
        </Box>
        <Box>
          <ColorComponentSlider
            label="Blue"
            eventKey="blue"
            onChange={onChangeComponent}
            value={stop.color.b}
            min={0}
            max={1}
            trackColor="blue"
            formatHelp={formatComponentHelp}
          />
        </Box>
        <Box>
          <ColorComponentSlider
            label="Alpha"
            eventKey="alpha"
            onChange={onChangeComponent}
            value={stop.color.a}
            min={0}
            max={1}
            formatHelp={formatComponentHelp}
          />
        </Box>
      </div>
      <div className={tw`grid grid-cols-3 gap-2`}>
        <Box>
          <ColorComponentSlider
            label="Hue"
            eventKey="hue"
            onChange={onChangeComponent}
            value={colorAsHsl.h || 0}
            min={0}
            max={360}
            trackColor={`hsl(${(colorAsHsl.h || 0).toFixed(1)}deg, 100%, 50%)`}
          />
        </Box>
        <Box>
          <ColorComponentSlider
            label="Saturation"
            eventKey="saturation"
            onChange={onChangeComponent}
            value={colorAsHsl.s}
            min={0}
            max={1}
            trackColor={`hsl(${(colorAsHsl.h || 0).toFixed(1)}deg, ${(
              colorAsHsl.s * 100
            ).toFixed(1)}%, 50%)`}
          />
        </Box>
        <Box>
          <ColorComponentSlider
            label="Lightness"
            eventKey="lightness"
            onChange={onChangeComponent}
            value={colorAsHsl.l}
            min={0}
            max={1}
            trackColor={`hsl(0deg, 0%, ${(colorAsHsl.l * 100).toFixed(1)}%)`}
          />
        </Box>
      </div>
      <div className={tw`grid grid-cols-3 gap-2`}>
        <Box>
          <FormLabel>Hex value</FormLabel>
          <Input value={colorToRGBHex(stop.color)} onChange={onChangeHex} />
        </Box>
      </div>
      <ButtonGroup className={tw`pt-4`} spacing={6}>
        <Button
          className={tw`bg-red-400`}
          onClick={() => csApi.delete(stop.id)}
        >
          Delete stop
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default StopEditor;
