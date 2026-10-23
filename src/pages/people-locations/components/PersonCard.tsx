import { Link } from "react-router";
import type { Person } from "../../../data";
import { Card } from "../../../components/shared/Card";

type PersonCardProps = {
  person: Person;
};

export function PersonCard({ person }: PersonCardProps) {
  const hasStatement = person.statement.trim().length > 0;

  return (
    <Card className="person-card">
      <div className="person-card-header">
        <img
          className="person-avatar"
          src={`${import.meta.env.BASE_URL}${person.avatar}`}
          alt={`Portrait of ${person.name}`}
        />
        <div>
          <h3>
            <Link to={`/team/people/${person.id}`}>{person.name}</Link>
          </h3>
          <div className="person-role">{person.role}</div>
        </div>
      </div>
      <p>
        <strong>Speciality:</strong> {person.speciality}
      </p>
      <ul>
        {person.responsibilities.map((responsibility) => (
          <li key={responsibility}>{responsibility}</li>
        ))}
      </ul>
      {hasStatement ? (
        <div className="person-statement">&ldquo;{person.statement}&rdquo;</div>
      ) : (
        <p>No statement available.</p>
      )}
    </Card>
  );
}
