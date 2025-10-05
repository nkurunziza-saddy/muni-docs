"use client";
// [!region import]
import React, { useState } from "react";
import { Switch } from "../base-ui/switch";
// [!endregion import]

// [!region structure]
<Switch />;
// [!endregion structure]

// [!region usage]
export function SwitchComponent() {
  const [switchState, setSwitchState] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-x-2">
        <Switch checked={switchState} onCheckedChange={setSwitchState} />
        <label className="text-sm font-medium">Enable notifications</label>
      </div>
      <div className="flex items-center gap-x-2">
        <Switch defaultChecked />
        <label className="text-sm font-medium">Dark mode</label>
      </div>
    </div>
  );
}
// [!endregion usage]
