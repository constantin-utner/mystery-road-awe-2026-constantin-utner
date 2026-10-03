import type { PageName } from "../../app/pageTypes";
import { AppBrand } from "./AppBrand";
import { MainNavigation } from "./MainNavigation";

type AppHeaderProps = {
  currentPage: PageName;
};

export function AppHeader({ currentPage }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <AppBrand />
        <MainNavigation currentPage={currentPage} />
      </div>
    </header>
  );
}
