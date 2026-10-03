import type { PageName } from "../../app/pageTypes";
import { AppBrand } from "./AppBrand";
import { MainNavigation } from "./MainNavigation";

type AppHeaderProps = {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
};

export function AppHeader({ currentPage, onNavigate }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <AppBrand />
        <MainNavigation currentPage={currentPage} onNavigate={onNavigate} />
      </div>
    </header>
  );
}
