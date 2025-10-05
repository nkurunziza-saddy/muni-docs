// [!region import]
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/base-ui/collapsible";
// [!endregion import]

// [!region structure]
<Collapsible>
  <CollapsibleTrigger></CollapsibleTrigger>
  <CollapsiblePanel></CollapsiblePanel>
</Collapsible>;
// [!endregion structure]

// [!region usage]
export function CollapsibleComponent() {
  return (
    <Collapsible className="w-full min-h-0">
      <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="p-4 bg-muted rounded-md mt-2">
          This is the collapsible content. It can contain any other elements.
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
// [!endregion usage]
