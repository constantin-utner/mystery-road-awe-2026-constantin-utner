# Architektur – Mystery Road

## 1. Überblick

Die React-Anwendung ist nach Funktionen und Aufgabenbereichen (Features) organisiert. Anstatt alle Dateien in einem einzigen Ordner abzulegen, werden zusammengehörige Komponenten gruppiert.

Dadurch bleibt der Code übersichtlich und einzelne Bereiche können leichter erweitert oder angepasst werden.

## 2. Ordnerstruktur

Die wichtigsten Ordner im `src/`-Verzeichnis sind:

```text
src/
├── app/
│   ├── App.tsx
│   ├── CurrentPage.tsx
│   └── pageTypes.ts
│
├── components/
│   ├── layout/
│   └── shared/
│
├── pages/
│   ├── dashboard/
│   │   ├── components/
│   │   └── DashboardPage.tsx
│   ├── people-locations/
│   ├── timeline/
│   ├── evidence/
│   └── workspace/
│
├── data.ts
├── storage.ts
├── utils.ts
└── main.tsx
```

### app/

Enthält die grundlegende Steuerung der React-Anwendung.

- `App.tsx`: Zentrale Anwendungskomponente.
- `CurrentPage.tsx`: Zeigt die aktuell ausgewählte Seite an.
- `pageTypes.ts`: Definiert die verfügbaren Seitentypen.

### components/

Enthält Komponenten, die von mehreren Bereichen verwendet werden können.

- `layout/`: Gemeinsames Seitenlayout mit Header, Navigation, Footer und Branding.
- `shared/`: Wiederverwendbare UI-Komponenten wie `Button` und `StatusBadge`.

### pages/

Enthält die einzelnen Funktionsbereiche der Anwendung.

- `dashboard/`: Dashboard mit Übersichten, Statistiken und eigenen Unterkomponenten.
- `people-locations/`: Darstellung von Personen und Orten.
- `timeline/`: Zeitlicher Ablauf der Ereignisse.
- `evidence/`: Darstellung der Beweismittel.
- `workspace/`: Arbeitsbereich zur Fallbearbeitung.

Jeder Bereich besitzt seine eigene Seitenkomponente. Zusätzliche Komponenten, die nur zu diesem Bereich gehören, können direkt im jeweiligen Ordner abgelegt werden.

### Weitere Dateien

- `data.ts`: Stellt Daten für die Anwendung bereit.
- `storage.ts`: Enthält Funktionen zur Datenspeicherung.
- `utils.ts`: Enthält allgemeine Hilfsfunktionen.
- `main.tsx`: Einstiegspunkt der React-Anwendung.

## 3. Shared vs. Feature-Local

Die Entscheidung, wo eine Komponente abgelegt wird, hängt davon ab, wo sie benötigt wird.

**Shared Components:**

Komponenten, die in mehreren Bereichen verwendet werden können, gehören in `components/shared/`.

Beispiel: Ein allgemeiner Button kann im Dashboard und in der Timeline verwendet werden.

**Feature-Local Components:**

Komponenten, die nur für eine bestimmte Funktion benötigt werden, bleiben im jeweiligen Feature-Ordner.

Beispiel: `CaseSummaryCard` wird für das Dashboard verwendet und liegt deshalb unter `pages/dashboard/components/`.

**Grundregel:** Eine Komponente bleibt zunächst bei ihrem Feature. Erst wenn sie von mehreren Bereichen benötigt wird, wird sie in den gemeinsamen `components/`-Ordner verschoben.

## 4. Dashboard und App-Shell

Das Dashboard und die App-Shell aus Exercise 3 sind ebenfalls in die Struktur eingebunden.

- Das Dashboard befindet sich unter `pages/dashboard/`. Seine spezifischen Komponenten liegen im Unterordner `components/`.
- Die App-Shell besteht aus gemeinsamen Layout-Komponenten wie Header, Navigation und Footer.
- Die Navigation und die Auswahl der aktuellen Seite werden zentral über `app/` gesteuert.

Dadurch verwenden die verschiedenen Seiten dasselbe Grundlayout, während ihre jeweiligen Inhalte unabhängig voneinander organisiert bleiben.

## 5. Ziel der Struktur

Die feature-orientierte Struktur soll:

- den Code übersichtlicher machen,
- zusammengehörige Dateien an einem Ort halten,
- doppelte Komponenten vermeiden,
- die Wartung und Erweiterung erleichtern.

So können neue Funktionen ergänzt werden, ohne die gesamte Anwendung umstrukturieren zu müssen.
