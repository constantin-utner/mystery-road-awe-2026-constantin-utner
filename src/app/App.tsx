import { useNavigate } from "react-router";
import type { PageName } from "./pageTypes";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { CurrentPage } from "./CurrentPage";
import { BookmarkProvider } from "../context/BookmarkContext";

export function App() {
  const navigate = useNavigate();

  function navigateTo(page: PageName) {
    const path = page === "people" ? "/team" : `/${page}`;
    navigate(path);
  }

  return (
    <>
      <AppHeader />
      <main className="app-main">
        <BookmarkProvider>
          <CurrentPage onNavigate={navigateTo} />
        </BookmarkProvider>
      </main>
      <AppFooter />
    </>
  );
}
