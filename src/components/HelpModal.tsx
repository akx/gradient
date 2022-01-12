import React from "react";
import { tw } from "twind";

function HelpContent() {
  return (
    <ul>
      <li>Double-click on the stop slider to add new stops</li>
      <li>Stops can be dragged on the slider too</li>
      <li>
        <a href="https://github.com/akx/gradient">Open source</a>
      </li>
    </ul>
  );
}

const bodyStyle: React.CSSProperties = {
  position: "fixed",
  top: "5vh",
  width: "30em",
  left: "50%",
  marginLeft: "-15em",
  background: "#fff",
  zIndex: 9000,
};

const overlayStyle: React.CSSProperties = {
  background: "rgba(0,0,0,40%)",
  position: "fixed",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  zIndex: 8000,
};

export function HelpModal({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div>
      <div style={overlayStyle} onClick={onClose} />
      <div style={bodyStyle} className={tw`p-4`}>
        <HelpContent />
      </div>
    </div>
  );
}
