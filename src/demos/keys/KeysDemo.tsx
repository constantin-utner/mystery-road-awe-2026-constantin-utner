type DemoPerson = {
  id: string;
  name: string;
};

type DemoPersonCardProps = {
  person: DemoPerson;
};

type DemoPeopleViewProps = {
  people: DemoPerson[];
  stableKeys: boolean;
};

type KeysDemoProps = {
  reversed: boolean;
  stableKeys: boolean;
};

const demoPeople: DemoPerson[] = [
  { id: "nova-byte", name: "Nova Byte" },
  { id: "patch-vector", name: "Patch Vector" },
];

function DemoPersonCard({ person }: DemoPersonCardProps) {
  return (
    <details className="person-card">
      <summary>{person.name}</summary>
      <p>Details zu {person.name}</p>
    </details>
  );
}

function DemoPeopleView({ people, stableKeys }: DemoPeopleViewProps) {
  // Absichtlich falsch im Index-Modus: Der Key folgt der Position.
  // Im ID-Modus folgt er derselben Person, auch wenn sie verschoben wird.
  return (
    <div className="people-grid">
      {people.map((person, index) => (
        <DemoPersonCard key={stableKeys ? person.id : index} person={person} />
      ))}
    </div>
  );
}

export function KeysDemo({ reversed, stableKeys }: KeysDemoProps) {
  const people = reversed ? [...demoPeople].reverse() : demoPeople;
  const mode = stableKeys ? "id" : "index";

  return (
    <main>
      <h1>Demo 4: Stable keys und Listenidentität</h1>
      <p>
        <a href="#dashboard">Zurück zur App</a>
      </p>
      <p>
        <a href="#keys-demo?mode=index">1. Fehler zeigen: Index-Keys</a>
        {" | "}
        <a href="#keys-demo?mode=id">2. Lösung zeigen: stabile IDs</a>
      </p>
      <h2>{stableKeys ? "key={person.id}" : "key={index}"}</h2>
      <ol>
        <li>Originalreihenfolge wählen und nur Nova Byte aufklappen.</li>
        <li>
          Auf „Umgekehrte Reihenfolge“ klicken, ohne die Seite neu zu laden.
        </li>
        <li>
          {stableKeys
            ? "Nova bleibt geöffnet und wandert an die zweite Position."
            : "Jetzt ist Patch geöffnet: Der Öffnungszustand bleibt an Position 1."}
        </li>
      </ol>
      <p>
        Beim Wechsel zwischen Index- und ID-Modus werden die Karten bewusst
        zurückgesetzt. Innerhalb eines Modus bleiben sie beim Sortieren
        erhalten.
      </p>
      <p>
        <a href={`#keys-demo?mode=${mode}`}>Originalreihenfolge</a>
        {" | "}
        <a href={`#keys-demo?mode=${mode}&reversed=1`}>
          Umgekehrte Reihenfolge
        </a>
      </p>
      <p>Reihenfolge: {reversed ? "Patch, Nova" : "Nova, Patch"}</p>
      <DemoPeopleView key={mode} people={people} stableKeys={stableKeys} />
    </main>
  );
}
