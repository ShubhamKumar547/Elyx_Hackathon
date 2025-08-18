# Neural Nomad — Elyx Life Hackathon
Team Members: 1.Shubham Kumar 2.Aditya Padhi
         
## Demo Login Credentials

**Username:** alex_admin  
**Password:** Admin@Secure123

**Username:** sarah_admin  
**Password:** S@rahPass2025

**Username:** michael_admin  
**Password:** M1ch@elAdm!n

---

**Chats** - [View chats.txt](./backend/Data/chats.txt)
Submission for the Elyx Life Hackathon 2025 by Team Neural Nomad.

A web app that visualizes a member’s health journey and operationalizes multidisciplinary care with transparent, data-driven decisions.

## Demo Working (Screenshots)

<p align="center">
  
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 005758.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 012759.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 052712.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 052726.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 052744.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 052801.png" width="400" />
  <img src="frontend/src/assets/snapshots/Screenshot 2025-08-18 052813.png" width="400" />
</p>

---

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

- **Frontend:** React, Vite,HTML,CSS,JS
- **Backend:** Node.js (Express)
- **Database:** JSON files (demo) +local browser storage
- **Auth:** JWT token Based authentication with userid and password

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


---