import {
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { clamp } from "../utils";

export default function CodegenSettings() {
  const codegenConfigAPI = useCodegenConfig();
  const codegenConfig = codegenConfigAPI.object;
  return (
    <Grid templateRows="repeat(3, 1fr)" gap={6}>
      <FormControl>
        <FormLabel>Value precision</FormLabel>
        <NumberInput
          value={codegenConfig.valuePrecision}
          min={0}
          step={1}
          onChange={(_, v) =>
            codegenConfigAPI.change({ valuePrecision: clamp(v, 0, 10) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Position precision</FormLabel>
        <NumberInput
          value={codegenConfig.positionPrecision}
          min={1}
          step={1}
          onChange={(_, v) =>
            codegenConfigAPI.change({ positionPrecision: clamp(v, 0, 10) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Alpha</FormLabel>
        <Checkbox
          isChecked={codegenConfig.includeAlpha}
          onChange={(e) =>
            codegenConfigAPI.change({ includeAlpha: e.target.checked })
          }
        >
          Include alpha
        </Checkbox>
      </FormControl>
    </Grid>
  );
}
