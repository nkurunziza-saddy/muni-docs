// [!region import]
import { Checkbox } from "@/components/base-ui/checkbox";
import { Label } from "@/components/base-ui/label";
import { CheckboxGroup } from "@/components/base-ui/checkbox-group";
// [!endregion import]

// [!region structure]
<div>
  <Checkbox />
  <Label />
</div>;
// [!endregion structure]

// [!region usage]
export function CheckboxComponent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>

      <h3 className="text-lg font-semibold text-foreground">Checkbox Group</h3>
      <CheckboxGroup defaultValue={["newsletter"]}>
        <div className="flex items-center gap-2">
          <Checkbox value="newsletter" id="newsletter" />
          <Label htmlFor="newsletter">Subscribe to newsletter</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox value="promotions" id="promotions" />
          <Label htmlFor="promotions">Receive promotional emails</Label>
        </div>
      </CheckboxGroup>
    </div>
  );
}
// [!endregion usage]
