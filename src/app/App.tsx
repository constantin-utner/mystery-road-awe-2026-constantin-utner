import { useNavigate } from "react-router";
import type { PageName } from "./pageTypes";
import type { AppData } from "../data";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";

type AppProps = {
  data: AppData;
};

export function App({ data }: AppProps) {
  const navigate = useNavigate();

  function navigateTo(page: PageName) {
    const path = page === "people" ? "/team" : `/${page}`;
    navigate(path);
  }

  return (
    <>
      <AppHeader />
      <main className="app-main">
        <CurrentPage data={data} onNavigate={navigateTo} />
      </main>
      <AppFooter />
    </>
  );
}
