import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

type ColorComponentSliderProps = {
  label: string;
  onChange: (eventKey: string, n: number) => void;
  value: number;
  colorScheme?: string;
  eventKey: string;
  min: number;
  max: number;
  formatHelp?: (value: number) => React.ReactNode;
  trackColor?: string;
};

export function ColorComponentSlider({
  onChange,
  label,
  value,
  colorScheme,
  eventKey,
  min,
  max,
  formatHelp,
  trackColor,
}: ColorComponentSliderProps) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Slider
        colorScheme={colorScheme}
        value={value}
        step={0}
        onChange={(val) => onChange(eventKey, val)}
        min={min}
        max={max}
      >
        <SliderTrack>
          <SliderFilledTrack bg={trackColor} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      {formatHelp ? <FormHelperText>{formatHelp(value)}</FormHelperText> : null}
    </FormControl>
  );
}
