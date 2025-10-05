// [!region import]
import { Separator } from "@/components/base-ui/separator";
// [!endregion import]

// [!region structure]
<Separator />;
// [!endregion structure]

// [!region usage]
export function SeparatorComponent() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
// [!endregion usage]
