import type { PageName } from "./pageTypes";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";

export function App() {
  const currentPage: PageName = "dashboard";

  return (
    <>
      <AppHeader currentPage={currentPage} />
      <main className="app-main">
        <CurrentPage page={currentPage} />
      </main>
      <AppFooter />
    </>
  );
}
