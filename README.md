# Project ReMotion – Investigation Portal

A browser-based investigation platform for uncovering the cause of an incident involving an AI-assisted rehabilitation robot.

## About

Project ReMotion is a fictional investigation application in which a rehabilitation robot loads an incorrect calibration profile and triggers an emergency stop.

Users can explore evidence, people, locations, and events to reconstruct the incident and develop hypotheses.

Originally built with vanilla JavaScript, the application is being refactored, migrated to React, and extended as part of the **Advanced Web Engineering** course.

## Getting Started

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

- **Vanilla JS:** Open the URL provided by Vite.
- **React:** Append `/react.html` to the URL.

Both applications currently load data from local JSON files.

### Local Development API

Start the Express API in a second terminal:

```bash
npm run dev:api
```

The API runs at `http://127.0.0.1:3001` and provides five GET endpoints:

`/api/case`, `/api/evidence`, `/api/people`, `/api/locations`, `/api/timeline`

All endpoints support optional parameters:

- `?delay=1500` – Simulates a delayed response (up to 5000 ms).
- `?error=true` – Simulates an HTTP 500 error.

Example:

```bash
curl -i 'http://127.0.0.1:3001/api/evidence?delay=1500'
```

The API runs independently of the frontend and is only used for local development.

### Build & Deployment

```bash
npm run build
```

The frontend is built into `dist/` and deployed to GitHub Pages. The Express API is not deployed.

## Features

- **Dashboard:** Case overview and statistics.
- **Evidence:** Search, filter, sort, and bookmark evidence.
- **People & Locations:** Explore people and locations.
- **Timeline:** Chronological overview of events.
- **Workspace:** Manage bookmarks, notes, and hypotheses using `localStorage`.

## Project Status

Active development as part of the **Advanced Web Engineering** course, focusing on refactoring, React migration, and modern web development practices.
