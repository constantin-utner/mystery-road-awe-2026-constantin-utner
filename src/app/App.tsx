import { useEffect, useState } from "react";
import type { PageName } from "./pageTypes";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";

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

export function App() {
  const [currentPage, setCurrentPage] = useState<PageName>(getPageFromHash);

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getPageFromHash());
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function navigateTo(page: PageName) {
    window.location.hash = page;
  }

  return (
    <>
      <AppHeader currentPage={currentPage} onNavigate={navigateTo} />
      <main className="app-main">
        <CurrentPage page={currentPage} />
      </main>
      <AppFooter />
    </>
  );
}
