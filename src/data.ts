import { loadBookmarksFromStorage, loadEvidenceReviews } from "./storage";

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
  bookmarked?: boolean;
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

async function loadCorePeopleAndLocations() {
  const caseResponse = await fetch("data/case.json");
  const caseData: CaseData = await caseResponse.json();

  const peopleResponse = await fetch("data/people.json");
  const people: Person[] = await peopleResponse.json();

  const locationsResponse = await fetch("data/locations.json");
  const locations: Location[] = await locationsResponse.json();

  return { caseData, people, locations };
}

async function loadEvidenceData() {
  const response = await fetch("data/evidence.json");
  const evidence: Evidence[] = await response.json();
  const reviews = loadEvidenceReviews();
  const bookmarks = loadBookmarksFromStorage();

  return evidence.map((item) => {
    const review = reviews[item.id];

    return {
      ...item,
      type: item.type.toLowerCase(),
      status: review?.status ?? item.status,
      relevance: review?.relevance ?? item.relevance,
      bookmarked: bookmarks.includes(item.id),
    };
  });
}

async function loadTimelineData() {
  const response = await fetch("data/timeline.json");
  const timeline: TimelineEvent[] = await response.json();
  return timeline;
}

export async function loadAllData() {
  const { caseData, people, locations } = await loadCorePeopleAndLocations();
  const [evidence, timeline] = await Promise.all([
    loadEvidenceData(),
    loadTimelineData(),
  ]);

  return { caseData, people, locations, evidence, timeline };
}
