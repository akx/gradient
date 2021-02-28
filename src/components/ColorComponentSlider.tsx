import React from "react";
import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
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
      <Flex>
        <Slider
          flex={1}
          mr="1rem"
          colorScheme={colorScheme}
          value={value}
          step={0}
          onChange={(val) => onChange(eventKey, val)}
          min={min}
          max={max}
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack bg={trackColor} />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <NumberInput
          maxW="4rem"
          size="xs"
          min={min}
          max={max}
          value={value}
          onChange={(valStr, val) => onChange(eventKey, val)}
        >
          <NumberInputField />
        </NumberInput>
      </Flex>
      {formatHelp ? <FormHelperText>{formatHelp(value)}</FormHelperText> : null}
    </FormControl>
  );
}
