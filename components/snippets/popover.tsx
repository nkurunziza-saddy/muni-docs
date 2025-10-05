// [!region import]
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "../base-ui/popover";
import { Bell, Settings } from "lucide-react";
// [!endregion import]

// [!region structure]
<Popover>
  <PopoverTrigger></PopoverTrigger>
  <PopoverContent>
    <PopoverTitle></PopoverTitle>
    <PopoverDescription></PopoverDescription>
  </PopoverContent>
</Popover>;
// [!endregion structure]

// [!region usage]
export function PopoverComponent() {
  return (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger>
          <Bell className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            You are all caught up. Good job!
          </PopoverDescription>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Settings className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Quick Settings</PopoverTitle>
          <PopoverDescription>Adjust your preferences here.</PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  );
}
// [!endregion usage]
