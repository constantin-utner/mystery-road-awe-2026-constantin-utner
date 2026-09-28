export type EvidenceStatus = "unreviewed" | "reviewed" | "flagged";

export type EvidenceRelevance = "unknown" | "relevant" | "irrelevant";

export type TimelineCertainty = "confirmed" | "contradictory" | "reported";

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
  status: EvidenceStatus;
  relevance: EvidenceRelevance;
  bookmarked?: boolean;
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

export type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
  certainty: TimelineCertainty;
  personIds: string[];
  locationIds: string[];
  evidenceIds: string[];
};

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
