"use client";
import { Button } from "../base-ui/button";
// [!region import]
import {
  ToastProvider,
  ToastViewport,
  useToastManager,
} from "../base-ui/toast";
// [!endregion import]

// [!region structure]
<ToastProvider>
  <ToastViewport />
</ToastProvider>;
// [!endregion structure]

// [!region usage]
function ToastButton() {
  const toastManager = useToastManager();

  const createToast = () => {
    toastManager.add({
      title: "Toast created",
      description: "This is a toast notification with enhanced styling.",
    });
  };

  return <Button onClick={createToast}>Create toast</Button>;
}

export function ToastComponent() {
  return (
    <ToastProvider>
      <ToastViewport />
      <ToastButton />
    </ToastProvider>
  );
}
// [!endregion usage]
