// [!region import]
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base-ui/tooltip";
import { Button } from "@/components/base-ui/button";
import { Plus } from "lucide-react";
// [!endregion import]

// [!region structure]
<Tooltip>
  <TooltipTrigger></TooltipTrigger>
  <TooltipContent></TooltipContent>
</Tooltip>;
// [!endregion structure]

// [!region usage]
export function TooltipComponent() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
// [!endregion usage]
