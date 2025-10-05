// [!region import]
import { Button } from "@/components/base-ui/button";
// [!endregion import]
import { Check, Copy } from "lucide-react";

// [!region structure]
<Button>This is a button</Button>;
// [!endregion structure]

// [!region usage]
export function ButtonComponent() {
  return <Button>Default</Button>;
}
// [!endregion usage]

// [!region destructive]
export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>;
}
// [!endregion destructive]

// [!region outline]
export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>;
}
// [!endregion outline]

// [!region secondary]
export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>;
}
// [!endregion secondary]

// [!region ghost]
export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>;
}
// [!endregion ghost]

// [!region link]
export function ButtonLink() {
  return <Button variant="link">Link</Button>;
}
// [!endregion link]

// [!region small]
export function ButtonSmall() {
  return <Button size="sm">Small</Button>;
}
// [!endregion small]

// [!region icon]
export function ButtonIcon() {
  return (
    <Button size="icon">
      <Check />
    </Button>
  );
}
// [!endregion icon]

// [!region with-icon]
export function ButtonWithIcon() {
  return (
    <Button>
      <Copy />
      Copy
    </Button>
  );
}
// [!endregion with-icon]

// [!region disabled]
export function ButtonDisabled() {
  return <Button disabled>Disabled</Button>;
}
// [!endregion disabled]
