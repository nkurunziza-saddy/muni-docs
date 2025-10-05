// [!region import]
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/base-ui/avatar";
// [!endregion import]

// [!region structure]
<Avatar>
  <AvatarImage />
  <AvatarFallback />
</Avatar>;
// [!endregion structure]

// [!region usage]
export function AvatarComponent() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/not-a-real-user.png" alt="@user" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    </div>
  );
}
// [!endregion usage]
