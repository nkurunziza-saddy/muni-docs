// [!region import]
import { Textarea } from "@/components/base-ui/textarea";
import { Label } from "@/components/base-ui/label";
import { Button } from "@/components/base-ui/button";
// [!endregion import]

// [!region structure]
<Textarea />;
// [!endregion structure]

// [!region usage]
export function TextareaComponent() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
// [!endregion usage]
