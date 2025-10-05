// [!region import]
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "../base-ui/preview-card";
// [!endregion import]

// [!region structure]
<PreviewCard>
  <PreviewCardTrigger></PreviewCardTrigger>
  <PreviewCardContent></PreviewCardContent>
</PreviewCard>;
// [!endregion structure]

// [!region usage]
export function PreviewCardComponent() {
  return (
    <div className="flex gap-4">
      <PreviewCard>
        <PreviewCardTrigger className="text-blue-600 hover:text-blue-800 underline">
          Hover for preview
        </PreviewCardTrigger>
        <PreviewCardContent>
          <div className="space-y-2">
            <h3 className="font-semibold">Preview Title</h3>
            <p className="text-sm text-muted-foreground">
              This is a preview card with enhanced styling and animations.
            </p>
          </div>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  );
}
// [!endregion usage]
