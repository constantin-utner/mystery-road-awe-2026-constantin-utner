import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

type PageName =
  "dashboard" | "evidence" | "people" | "timeline" | "workspace";

const container = document.getElementById("react-root");

if (!container) {
  throw new Error("React mount point #react-root fehlt.");
}

const root = createRoot(container);

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
  root.render(
    <StrictMode>
      <App currentPage={getPageFromHash()} />
    </StrictMode>,
  );
}

// Der URL-Hash hält die aktuelle Seite; Änderungen aktualisieren React.
window.addEventListener("hashchange", renderApp);
renderApp();
