import {
  FormControl,
  FormLabel,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useGradientConfig } from "../hooks/useGradientConfig";
import { clamp } from "../utils";
import { InterpolationType } from "../types";

export default function GradientConfigPanel() {
  const gradientConfigAPI = useGradientConfig();
  const gradientConfig = gradientConfigAPI.object;
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <FormControl>
        <FormLabel>Interpolation</FormLabel>
        <RadioGroup
          onChange={(value) =>
            gradientConfigAPI.change({
              interpolation: value as InterpolationType,
            })
          }
          value={gradientConfig.interpolation}
        >
          <Stack direction="row">
            <Radio value={InterpolationType.Linear}>Linear</Radio>
            <Radio value={InterpolationType.CatmullRom}>Catmull-Rom 5D</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl
        isDisabled={gradientConfig.interpolation === InterpolationType.Linear}
      >
        <FormLabel>Interpolation points</FormLabel>
        <NumberInput
          isDisabled={gradientConfig.interpolation === InterpolationType.Linear}
          value={gradientConfig.interpolationPoints}
          min={2}
          step={1}
          onChange={(_, v) =>
            gradientConfigAPI.change({ interpolationPoints: clamp(v, 2, 100) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Grid>
  );
}
