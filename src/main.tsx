import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { App } from "./app/App";
import { loadAllData } from "./data";

const container = document.getElementById("react-root");

if (!container) {
  throw new Error("React mount point #react-root fehlt.");
}

const root = createRoot(container);
const data = await loadAllData();

root.render(
  <StrictMode>
    <HashRouter>
      <App data={data} />
    </HashRouter>
  </StrictMode>,
);
