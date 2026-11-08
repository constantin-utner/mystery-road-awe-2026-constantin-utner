import { loadEvidenceReviews } from "./storage";

export type CaseData = {
  caseId: string;
  title: string;
  subtitle: string;
  status: string;
  opened: string;
  summary: string;
  location: string;
  leadInvestigator: string;
  notes: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  speciality: string;
  responsibilities: string[];
  statement: string;
  background: string;
  avatar: string;
};

export type Location = {
  id: string;
  name: string;
  description: string;
  contains: string[];
};

export type Evidence = {
  id: string;
  type: string;
  title: string;
  timestamp: string;
  summary: string;
  content: string;
  personIds: string[];
  locationIds: string[];
  tags: string[];
  status: string;
  relevance: string;
};

export type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
  certainty: string;
  personIds: string[];
  locationIds: string[];
  evidenceIds: string[];
};

export type SharedData = {
  people: Person[];
  locations: Location[];
  evidence: Evidence[];
  timeline: TimelineEvent[];
};

function normalizeCategory(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function prepareEvidenceForDisplay(evidence: Evidence[]): Evidence[] {
  const reviews = loadEvidenceReviews();

  return evidence.map((item): Evidence => {
    const review = reviews[item.id];
    const type = normalizeCategory(item.type);
    const status = normalizeCategory(review?.status ?? item.status);
    const relevance = normalizeCategory(review?.relevance ?? item.relevance);

    return {
      ...item,
      type: type || "unknown",
      status: ["unreviewed", "reviewed", "flagged"].includes(status)
        ? status
        : "unreviewed",
      relevance: ["unknown", "relevant", "irrelevant"].includes(relevance)
        ? relevance
        : "unknown",
    };
  });
}
