App
├── AppHeader
│ ├── AppBrand
│ └── MainNavigation
│ └── NavButton × 5
│
├── CurrentPage
│ │
│ ├── DashboardPage
│ │ ├── HowToUsePortal
│ │ │ └── PortalGuideCard × 4
│ │ │ └── Button
│ │ ├── CaseSummaryCard
│ │ ├── StatsSection
│ │ │ └── StatCard × 5
│ │ ├── ReviewProgress
│ │ ├── RecentEvidence
│ │ │ └── EvidenceListItem × n
│ │ │ └── StatusBadge
│ │ └── RecentTimeline
│ │ └── TimelineListItem × n
│ │
│ ├── EvidencePage
│ │ ├── EvidenceFilters
│ │ │ ├── SearchField
│ │ │ ├── SelectField × n
│ │ │ └── Button
│ │ ├── EvidenceGrid
│ │ │ └── EvidenceCard × n
│ │ │ ├── BookmarkButton
│ │ │ ├── StatusBadge × n
│ │ │ └── TagBadge × n
│ │ └── EvidenceDetail
│ │ ├── CriticalNotice
│ │ ├── TagBadge × n
│ │ ├── SelectField × 2
│ │ └── NoteEditor
│ │ ├── TextAreaField
│ │ ├── Button
│ │ └── NotePreview
│ │
│ ├── PeopleLocationsPage
│ │ ├── PeopleLocationsTabs
│ │ │ └── TabButton × 2
│ │ ├── PeopleView
│ │ │ └── PersonCard × n
│ │ │ └── PersonEvidenceLink
│ │ └── LocationsView
│ │ └── LocationCard × n
│ │
│ ├── TimelinePage
│ │ ├── TimelineFilters
│ │ │ └── SelectField × n
│ │ └── TimelineList
│ │ └── TimelineItem × n
│ │ ├── StatusBadge
│ │ └── EvidencePreviewButton × n
│ │
│ └── WorkspacePage
│ ├── BookmarkedEvidenceSection
│ │ └── BookmarkedEvidenceItem × n
│ │ └── OpenEvidenceButton
│ ├── PersonalNotesSection
│ │ └── PersonalNoteItem × n
│ └── HypothesisDraftForm
│ ├── SelectField × 2
│ ├── EvidenceMultiSelect
│ ├── ConfidenceSlider
│ ├── TextAreaField × 2
│ └── Button
│
├── EvidencePreviewModal
│ ├── CloseButton
│ └── OpenFullEvidenceButton
│
└── AppFooter
