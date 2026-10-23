import { AppBrand } from "./AppBrand";
import { MainNavigation } from "./MainNavigation";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <AppBrand />
        <MainNavigation />
      </div>
    </header>
  );
}
