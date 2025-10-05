// [!region import]
import { Label } from "@/components/base-ui/label";
import { RadioGroup } from "@/components/base-ui/radio-group";
import { Radio } from "../base-ui/radio";
// [!endregion import]

// [!region structure]
<RadioGroup>
  <div>
    <Radio value={"0.4M"} />
    <Label />
  </div>
</RadioGroup>;
// [!endregion structure]

// [!region usage]
export function RadioGroupComponent() {
  return (
    <RadioGroup defaultValue="comfortable" className={"flex flex-col gap-4"}>
      <div className="flex items-center space-x-2">
        <Radio value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Radio value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
// [!endregion usage]
