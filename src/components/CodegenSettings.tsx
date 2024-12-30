import React from "react";
import { useCodegenConfig } from "../hooks/useCodegenConfig";
import { clamp } from "../utils";
import { tw } from "twind";
import { Checkbox, FormControl, FormLabel, NumberInput } from "../om/forms";

export default function CodegenSettings() {
  const codegenConfigAPI = useCodegenConfig();
  const codegenConfig = codegenConfigAPI.object;
  return (
    <div className={tw`flex flex-col gap-2`}>
      <FormControl>
        <FormLabel>Value precision</FormLabel>
        <NumberInput
          value={codegenConfig.valuePrecision}
          min={0}
          step={1}
          onChange={(_, v) =>
            codegenConfigAPI.change({ valuePrecision: clamp(v, 0, 10) })
          }
        />
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
        />
      </FormControl>
      <FormControl>
        <Checkbox
          isChecked={codegenConfig.includeAlpha}
          onChange={(e) =>
            codegenConfigAPI.change({ includeAlpha: e.target.checked })
          }
        >
          Include alpha
        </Checkbox>
      </FormControl>
      <FormControl>
        <Checkbox
          isChecked={codegenConfig.hexColors}
          onChange={(e) =>
            codegenConfigAPI.change({ hexColors: e.target.checked })
          }
        >
          Use hex colors
        </Checkbox>
      </FormControl>
    </div>
  );
}
