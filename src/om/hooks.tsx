import React from "react";
import { Toast } from "./types";
import { ToastManager } from "./toaster";

let toastManager: ToastManager | undefined;

const doToast = (t: Toast) => {
  if (!toastManager) toastManager = new ToastManager();
  toastManager.toast(t);
};

export function useToast() {
  return doToast;
}

export function useDisclosure() {
  const [isOpen, setIsOpen] = React.useState(false);
  return {
    onOpen: () => setIsOpen(true),
    isOpen,
    onClose: () => setIsOpen(false),
  };
}
