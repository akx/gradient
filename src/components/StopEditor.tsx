import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Slider,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { ColorStop } from "../types";
import ColorStopsAPIContext from "../contexts/ColorStopsAPIContext";
import * as culori from "culori";
import { modifyHSL } from "../utils";
import { ColorComponentSlider } from "./ColorComponentSlider";

type StopEditorProps = {
  stop: ColorStop;
};

const formatComponentHelp = (value: number) => {
  const intValue = Math.round(value * 255);
  return (
    <>
      {value.toFixed(5)} ({intValue}, {intValue.toString(16)})
    </>
  );
};

export function StopEditor({ stop }: StopEditorProps) {
  const csApi = React.useContext(ColorStopsAPIContext);
  const onChangeComponent = React.useCallback(
    (eventKey: string, value: number) => {
      const newStop = { ...stop };
      const { color } = newStop;
      switch (eventKey) {
        case "red":
          newStop.color = { ...color, r: value };
          break;
        case "green":
          newStop.color = { ...color, g: value };
          break;
        case "blue":
          newStop.color = { ...color, b: value };
          break;
        case "alpha":
          newStop.color = { ...color, a: value };
          break;
        case "hue":
          newStop.color = modifyHSL(color, { h: value });
          break;
        case "saturation":
          newStop.color = modifyHSL(color, { s: value });
          break;
        case "lightness":
          newStop.color = modifyHSL(color, { l: value });
          break;
      }
      csApi.change(newStop);
    },
    [csApi, stop]
  );
  const colorAsHsl = culori.converter("hsl")({ mode: "rgb", ...stop.color });
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <FormControl>
        <FormLabel>Position</FormLabel>
        <Slider
          value={stop.position}
          step={0}
          min={0}
          max={1}
          onChange={(val) => csApi.changePartial(stop.id, { position: val })}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
        <FormHelperText>{(stop.position * 100).toFixed(2)}%</FormHelperText>
      </FormControl>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Box>
          <ColorComponentSlider
            label="Red"
            eventKey="red"
            onChange={onChangeComponent}
            value={stop.color.r}
            min={0}
            max={1}
            colorScheme="red"
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
            colorScheme="green"
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
            colorScheme="blue"
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
            colorScheme="blackAlpha"
            formatHelp={formatComponentHelp}
          />
        </Box>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
      </Grid>
      <Divider py={4} />
      <ButtonGroup pt={4} spacing="6">
        <Button colorScheme="red" onClick={() => csApi.delete(stop.id)}>
          Delete stop
        </Button>
      </ButtonGroup>
    </Box>
  );
}
