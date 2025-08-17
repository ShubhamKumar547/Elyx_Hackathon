
# Neural Nomad — Elyx Life Hackathon

Submission for the Elyx Life Hackathon 2025 by Team Neural Nomad.

A web app that visualizes a member’s health journey and operationalizes multidisciplinary care with transparent, data-driven decisions.

## Core Features

- **Trends Graph (Success Metrics)**
	- Visualizes longitudinal health KPIs and operational outcomes.
	- Highlights trends, deltas, and context-aware episodes.

- **Decision Chatbot**
	- Answers “why was this done?” for any intervention.
	- Cites chats, clinician notes, diagnostics, and metric snapshots.

- **Engagement Metrics**
	- Displays utilization, response times, SLA adherence, and consult throughput.

- **Persona Journey (ELYX)**
	- Persona-aware timeline of the patient journey with preferences, context, and travel-aware overlays.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Headless UI, Zustand
- **Backend:** Node.js (Express)
- **Database:** JSON files (demo)
- **Packaging:** Docker, docker-compose (optional)
- **Auth:** Simple session/localStorage (demo)

## How to Run

## LocalHost based
# Frontend: http://localhost:5173
# API: http://localhost:5000
```

### Manual

#### Backend
```sh
cd backend
npm install
npm start
# API: http://localhost:5000
```

#### Frontend
```sh
cd frontend
npm install
npm run dev
# Frontend: http://localhost:5173
```

## Backend Structure

- `index.js` — Main Express server
- `routes/` — API routes (`auth.js`, `data.js`, `pipeline.js`)
- `controllers/` — Route handlers
- `Data/` — JSON and JS files for demo data

## Frontend Structure

- `src/` — React components, pages, and assets
- `public/` — Static files

## Team

Team Neural Nomad — Elyx Life Hackathon 2025
Members: 1.Shubham Kumar 2.Aditya Padhi

---