// [!region import]
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../base-ui/dropdown-menu";
import { ChevronDown, Music, Play } from "lucide-react";
// [!endregion import]

// [!region structure]
<DropdownMenu>
  <DropdownMenuTrigger></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
// [!endregion structure]

// [!region usage]
export function DropdownComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"flex gap-2"}>
        Song <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Music className="mr-2 size-4" />
          Add to Library
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Play className="mr-2 size-4" />
          Add to Playlist
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Play Next</DropdownMenuItem>
        <DropdownMenuItem>Play Last</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Download</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
// [!endregion usage]

// [!region with-groups]
export function DropdownWithGroups() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"flex gap-2"}>
        Settings <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Preferences</DropdownMenuGroupLabel>
          <DropdownMenuCheckboxItem checked>Dark Mode</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Notifications</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Theme</DropdownMenuGroupLabel>
          <DropdownMenuRadioGroup value="system">
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
// [!endregion with-groups]
