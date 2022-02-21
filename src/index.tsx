import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { setup } from "twind";
import "culori/all";

setup({
  preflight: true,
  mode: "warn",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
