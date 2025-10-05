"use client";
// [!region import]
import React, { useState } from "react";
import { Slider } from "../base-ui/slider";
// [!endregion import]

// [!region structure]
<Slider />;
// [!endregion structure]

// [!region usage]
export function SliderComponent() {
  const [progress, setProgress] = useState(20);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Volume: {progress}%</label>
        <Slider
          value={[progress]}
          onValueChange={(value) =>
            setProgress(Array.isArray(value) ? value[0] : value)
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Brightness</label>
        <Slider defaultValue={[50]} />
      </div>
    </div>
  );
}
// [!endregion usage]
