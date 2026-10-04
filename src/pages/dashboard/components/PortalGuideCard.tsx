import type { PageName } from "../../../app/pageTypes";
import { Button } from "../../../components/shared/Button";

type PortalGuideCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  page: PageName;
  onNavigate: (page: PageName) => void;
};

export function PortalGuideCard({
  title,
  description,
  buttonLabel,
  page,
  onNavigate,
}: PortalGuideCardProps) {
  return (
    <div className="howto-item">
      <h4>{title}</h4>
      <p>{description}</p>
      <Button label={buttonLabel} onClick={() => onNavigate(page)} />
    </div>
  );
}
