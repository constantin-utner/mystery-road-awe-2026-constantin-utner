import type { PageName } from "./pageTypes";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";
import type { AppData } from "../data";

type AppProps = {
  currentPage: PageName;
  data: AppData;
};

export function App({ currentPage, data }: AppProps) {
  function navigateTo(page: PageName) {
    window.location.hash = page;
  }

  return (
    <>
      <AppHeader currentPage={currentPage} onNavigate={navigateTo} />
      <main className="app-main">
        <CurrentPage page={currentPage} data={data} onNavigate={navigateTo} />
      </main>
      <AppFooter />
    </>
  );
}
