import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { loadAllData } from "./data";
import type { PageName } from "./app/pageTypes";
import { KeysDemo } from "./demos/keys/KeysDemo";

const container = document.getElementById("react-root");

if (!container) {
  throw new Error("React mount point #react-root fehlt.");
}

const root = createRoot(container);

// Erst die Daten laden, danach die App rendern.
const data = await loadAllData();

function getPageFromHash(): PageName {
  switch (window.location.hash) {
    case "#evidence":
      return "evidence";
    case "#people":
      return "people";
    case "#timeline":
      return "timeline";
    case "#workspace":
      return "workspace";
    default:
      return "dashboard";
  }
}

function renderApp() {
  // Temporäre Demo: Der vorhandene hashchange-Listener rendert dieselbe Root.
  if (window.location.hash.split("?")[0] === "#keys-demo") {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    root.render(
      <StrictMode>
        <KeysDemo
          reversed={params.get("reversed") === "1"}
          stableKeys={params.get("mode") === "id"}
        />
      </StrictMode>,
    );
    return;
  }

  root.render(
    <StrictMode>
      <App currentPage={getPageFromHash()} data={data} />
    </StrictMode>,
  );
}

// Bei einem Seitenwechsel erneut rendern.
window.addEventListener("hashchange", renderApp);
renderApp();
