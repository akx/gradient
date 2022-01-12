import React from "react";
import ReactDOM from "react-dom";
import { Toast } from "./types";
import { tw } from "twind";

interface ToastWithId extends Toast {
  id: string;
}

interface ToastBoxAPI {
  addToast(t: Toast): void;
}

function ToastView({ toast }: { toast: ToastWithId }) {
  return (
    <div className={tw`mb-1 p-3 rounded-md bg-gray-300 shadow-md`}>
      {toast.title}
    </div>
  );
}

const ToastBox = React.forwardRef<ToastBoxAPI>((props, ref) => {
  const [toasts, setToasts] = React.useState<ToastWithId[]>([]);
  const addToast = React.useCallback(
    (t: Toast) =>
      setToasts((ts) => ts.concat({ ...t, id: Date.now().toString(36) })),
    [],
  );
  React.useImperativeHandle(ref, () => ({ addToast }));
  React.useEffect(() => {
    console.log("???", toasts.length);
    if (!toasts.length) return;
    const timeout = setTimeout(() => setToasts((ts) => ts.slice(1)), 1500);
    return () => clearTimeout(timeout);
  }, [toasts.length]);
  if (!toasts.length) return null;
  return (
    <div style={{ position: "fixed", top: "1em", right: "1em" }}>
      {toasts.map((t) => (
        <ToastView key={t.id} toast={t} />
      ))}
    </div>
  );
});
ToastBox.displayName = "ToastBox";

export class ToastManager {
  private container: HTMLElement | undefined;
  private instance: React.RefObject<ToastBoxAPI> = React.createRef();

  private init() {
    if (!this.container) {
      this.container = document.createElement("toast-box");
      document.body.appendChild(this.container);
      ReactDOM.render(<ToastBox ref={this.instance} />, this.container);
    }
  }

  toast(t: Toast) {
    this.init();
    this.instance.current?.addToast(t);
  }
}
