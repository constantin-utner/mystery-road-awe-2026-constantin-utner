import type { PageName } from "./pageTypes";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";

type AppProps = {
  currentPage: PageName;
};

export function App({ currentPage }: AppProps) {

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
