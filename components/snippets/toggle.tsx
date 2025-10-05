// [!region import]
import { Toggle } from "@/components/base-ui/toggle";
import { ToggleGroup } from "@/components/base-ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
// [!endregion import]

// [!region structure]
<Toggle></Toggle>;
// [!endregion structure]

// [!region usage]
export function ToggleComponent() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
// [!endregion usage]

// [!region outline]
export function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
// [!endregion outline]

// [!region with-text]
export function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4 mr-2" />
      Bold
    </Toggle>
  );
}
// [!endregion with-text]

// [!region small]
export function ToggleSmall() {
  return (
    <Toggle size="sm" aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
// [!endregion small]

// [!region large]
export function ToggleLarge() {
  return (
    <Toggle size="lg" aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
// [!endregion large]

// [!region disabled]
export function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle bold" disabled>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
// [!endregion disabled]

// [!region group]
export function ToggleGroupComponent() {
  return (
    <ToggleGroup toggleMultiple>
      <Toggle value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
}
// [!endregion group]
