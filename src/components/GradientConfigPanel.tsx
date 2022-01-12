import React from "react";
import { useGradientConfig } from "../hooks/useGradientConfig";
import { clamp } from "../utils";
import { InterpolationType } from "../types";
import { converters } from "../colorspaces";
import { tw } from "twind";
import { FormControl, FormLabel, NumberInput } from "../om/forms";
import { Radio, RadioGroup } from "../om/radio";
import { Stack } from "../om/layout";

export default function GradientConfigPanel() {
  const gradientConfigAPI = useGradientConfig();
  const gradientConfig = gradientConfigAPI.object;
  const colorspaceName =
    converters.find((c) => c.id === gradientConfig.colorspace)?.name ?? "???";
  return (
    <div className={tw`grid grid-cols-3 gap-2`}>
      <FormControl>
        <FormLabel>Color Space</FormLabel>
        <RadioGroup
          isDisabled={gradientConfig.interpolation === InterpolationType.Plain}
          onChange={(colorspace) =>
            gradientConfigAPI.change({
              colorspace: colorspace.toString(),
            })
          }
          value={gradientConfig.colorspace}
        >
          <Stack direction="column">
            {converters.map((c) => (
              <Radio key={c.id} value={c.id}>
                {c.name}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>
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
          <Stack direction="column">
            <Radio value={InterpolationType.Plain}>Plain (Linear)</Radio>
            <Radio value={InterpolationType.Linear}>
              Linear in {colorspaceName}
            </Radio>
            <Radio value={InterpolationType.CatmullRom}>
              Catmull-Rom 5D in {colorspaceName}
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Interpolation points</FormLabel>
        <NumberInput
          isDisabled={gradientConfig.interpolation === InterpolationType.Plain}
          value={gradientConfig.interpolationPoints}
          min={2}
          step={1}
          onChange={(_, v) =>
            gradientConfigAPI.change({ interpolationPoints: clamp(v, 2, 100) })
          }
        />
      </FormControl>
    </div>
  );
}
