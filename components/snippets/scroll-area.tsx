// [!region import]
import { ScrollArea } from "@/components/base-ui/scroll-area";
import { Separator } from "@/components/base-ui/separator";
// [!endregion import]

// [!region structure]
<ScrollArea>
  <div></div>
</ScrollArea>;
// [!endregion structure]

// [!region usage]
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaComponent() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm py-2">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
// [!endregion usage]
