"use client";
// [!region import]
import React from "react";
import { Progress, ProgressLabel } from "../base-ui/progress";
// [!endregion import]

// [!region structure]
<Progress value={5}>
  <ProgressLabel></ProgressLabel>
</Progress>;
// [!endregion structure]

// [!region usage]
export function ProgressComponent() {
  const [progress, setProgress] = React.useState(25);
  return (
    <div className="flex flex-col gap-4">
      <Progress value={progress}>
        <ProgressLabel>Export data</ProgressLabel>
      </Progress>
      <Progress value={75}>
        <ProgressLabel>Upload files</ProgressLabel>
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Complete</ProgressLabel>
      </Progress>
    </div>
  );
}
// [!endregion usage]
