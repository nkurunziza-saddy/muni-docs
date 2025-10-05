// [!region import]
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/base-ui/alert";
// [!endregion import]
import { Terminal } from "lucide-react";

// [!region structure]
export function AlertStructure() {
  return (
    <Alert>
      <AlertTitle></AlertTitle>
      <AlertDescription></AlertDescription>
    </Alert>
  );
}
// [!endregion structure]

// [!region usage]
export function AlertComponent() {
  return (
    <div className="flex flex-col gap-y-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
// [!endregion usage]
