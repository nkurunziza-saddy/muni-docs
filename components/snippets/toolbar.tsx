// [!region import]
import React from "react";
import {
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarSelect,
  ToolbarSelectItem,
} from "../base-ui/toolbar";
import { AlignLeft, AlignRight, DollarSign, Percent } from "lucide-react";
// [!endregion import]

// [!region structure]
<Toolbar>
  <ToolbarGroup>
    <ToolbarButton></ToolbarButton>
  </ToolbarGroup>
</Toolbar>;
// [!endregion structure]

// [!region usage]
export function ToolbarComponent() {
  return (
    <Toolbar className="flex gap-1.5 items-center">
      <ToolbarGroup aria-label="Alignment">
        <ToolbarButton
          render={<ToolbarToggleButton />}
          aria-label="Align left"
          value="align-left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          render={<ToolbarToggleButton />}
          aria-label="Align right"
          value="align-right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Numerical format">
        <ToolbarButton aria-label="Format as currency">
          <DollarSign className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton aria-label="Format as percent">
          <Percent className="h-4 w-4" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarSelect defaultValue="Helvetica">
        <ToolbarSelectItem value="Helvetica">Helvetica</ToolbarSelectItem>
        <ToolbarSelectItem value="Arial">Arial</ToolbarSelectItem>
        <ToolbarSelectItem value="Times">Times New Roman</ToolbarSelectItem>
      </ToolbarSelect>
      <ToolbarSeparator />
      <ToolbarLink href="#">Edited 51m ago</ToolbarLink>
    </Toolbar>
  );
}
// [!endregion usage]
