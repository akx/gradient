import React from "react";
import { tw } from "twind";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  NumberInput,
  Slider,
} from "../om/forms";
import { Flex } from "../om/layout";

interface ColorComponentSliderProps {
  label: string;
  onChange: (eventKey: string, n: number) => void;
  value: number;
  eventKey: string;
  min: number;
  max: number;
  formatHelp?: (value: number) => React.ReactNode;
  trackColor?: string;
}

function ColorComponentSlider({
  onChange,
  label,
  value,
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
          className={tw`flex-1 mr-1`}
          style={{ accentColor: trackColor }}
          value={value}
          step="any"
          onChange={(e) => onChange(eventKey, e.target.valueAsNumber)}
          min={min}
          max={max}
        />
        <NumberInput
          style={{ width: "7rem" }}
          min={min}
          max={max}
          step={(max - min) / 100}
          value={value}
          onChange={(valStr, val) => onChange(eventKey, val)}
        />
      </Flex>
      {formatHelp ? <FormHelperText>{formatHelp(value)}</FormHelperText> : null}
    </FormControl>
  );
}

export default React.memo(ColorComponentSlider);
