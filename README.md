# DSA Tracker

DSA Tracker is a full-stack web application to help programmers track, practice, and revise Data Structures & Algorithms (DSA) problems. This repository contains a Node.js + Express backend and a React + Vite frontend. The project includes features such as problem CRUD, revision scheduling, analytics, AI/assistant stubs, and a dashboard UI.

---

## Table of contents

- Project structure
- Tech stack
- Getting started (local)
	- Backend
	- Frontend
- Environment variables
- Available scripts
- API overview
- Frontend routes & components
- Developer notes & suggestions
- Next steps / roadmap

---

## Project structure

Top-level layout:

```
README.md
backend/
	package.json
	src/
		app.js
		server.js
		controllers/
		models/
		routes/
		db/
frontend/
	package.json
	src/
		main.jsx
		App.jsx
		pages/
		components/
		context/
		assets/
```

Notes:
- Backend code runs from `backend/src` with `server.js` as the entry.
- Frontend code is a Vite + React app in `frontend/` and uses Tailwind for styling.

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB), Passport (Google OAuth), JWT, bcryptjs
- Frontend: React 19, React Router v7, Vite, TailwindCSS, Recharts
- Dev tools: Nodemon (backend dev), Vite (frontend dev)

## Getting started (local development)

Prerequisites:
- Node.js (v18+ recommended)
- MongoDB (local or cloud URI)

1. Clone repository

```bash
git clone <repo-url>
cd DsaTracker
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. Create a `.env` file for the backend (see Environment variables section)

5. Run both servers in development

Backend (dev):

```bash
cd backend
npm run dev
```

Frontend (dev):

```bash
cd frontend
npm run dev
```

Open the frontend in your browser (Vite will print the local URL, usually http://localhost:5173). Backend defaults to http://localhost:3000.

## Environment variables

Create `backend/.env` with values similar to:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/dsatracker
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
OPENAI_API_KEY=your_openai_key
```

The backend reads environment variables in `backend/src/server.js` via `dotenv`.

## Available scripts

Backend (`backend/package.json`):
- `npm run dev` - start backend with nodemon (development)
- `npm start` - start backend with node

Frontend (`frontend/package.json`):
- `npm run dev` - start frontend with Vite
- `npm run build` - build production frontend
- `npm run preview` - preview the built frontend
- `npm run lint` - run ESLint

## API overview (high level)

The backend exposes REST endpoints under `/api`. The repository contains controllers and routes for problems, topics, analytics, revision scheduling, user auth, and AI integration. Common routes (examples — check `backend/src/routes` for exact paths):

- `POST /api/problem/add` - add a problem
- `GET /api/problem/all-problems` - list all problems
- `GET /api/problem/search?query=` - search problems
- `GET /api/revision/revision-schedule` - fetch problems scheduled for revision
- Auth routes: `/api/auth/google` etc. (Google OAuth via Passport)

Inspect `backend/src/routes` for the complete path list and controller logic.

## API Reference (detailed)

Below is a complete, annotated list of the backend API endpoints exposed by the server (base URL: http://localhost:3000 by default). Each entry lists the HTTP method, full path, whether authentication is required, expected parameters / body, and a short description of the response.

Notes:
- All protected routes require a valid authenticated user (the server uses cookie-based tokens in this project).
- Responses are wrapped using the project's `ApiResponse` helper; successful responses typically contain data in the `data` field.

Base route prefixes used in the app:
- /api/users - user authentication
- /api/problem - problem CRUD + AI hint endpoint
- /api/status - problem status (solve, notes, progress, recent)
- /api/revision - revision scheduling endpoints
- /api/stats - analytics endpoints
- /api/ai - AI helper endpoints (random problems, quote, response)

-- /api/users

- POST /api/users/register
	- Auth: no
	- Body: { name, email, password }
	- Description: Creates a new user, persists refresh/access tokens in cookies, returns created user object.

- POST /api/users/login
	- Auth: no
	- Body: { email, password }
	- Description: Authenticates user, sets access/refresh cookies, returns user object.

- POST /api/users/logout
	- Auth: yes
	- Body: none
	- Description: Clears tokens/cookies and removes refresh token from DB for the logged-in user.

-- /api/problem

- POST /api/problem/add
	- Auth: yes
	- Body: { title, difficulty, topic, problemNo, pattern?, url?, platform?, problemStatus? }
	- Description: Adds a new problem for the authenticated user. If problemStatus is `solved`, the server also creates ProblemStatus with revision dates.
	- Response: created problem object.

- PUT /api/problem/update/:problemNo
	- Auth: yes
	- Path params: problemNo
	- Body: any subset of updatable fields (title, difficulty, problemNo, url, platform, topic, pattern, problemStatus)
	- Description: Updates a user's problem by problemNo. Topic and pattern are resolved by name to object IDs.
	- Response: updated problem object.

- DELETE /api/problem/delete/:problemNo
	- Auth: yes
	- Path params: problemNo
	- Description: Deletes the problem owned by the user and its associated ProblemStatus document.
	- Response: deleted problem object.

- GET /api/problem/all-problems
	- Auth: yes
	- Query params (optional): difficulty, topic, pattern, problemStatus
	- Description: Returns all problems for the authenticated user. Filters apply when present. Populates topic, pattern, problemStatus and user fields.

- GET /api/problem/single-problem
	- Auth: yes
	- Query params: title (partial match, case-insensitive) OR problemNo
	- Description: Returns a single problem that matches title or problemNo for the logged-in user.

- POST /api/problem/hint
	- Auth: yes
	- Body: { prompt }
	- Description: Forwards the prompt to the AI helper and returns an `aiReply` (used for hints/chat responses related to a problem).

-- /api/status

- POST /api/status/solved/:problemNo
	- Auth: yes
	- Path params: problemNo
	- Description: Marks a problem as `solved` if it belongs to the user. Updates lastAttempted and computes revision dates [0,3,7,14,30].
	- Response: ProblemStatus document for the problem.

- GET /api/status/stats
	- Auth: yes
	- Description: Aggregated counts of problems grouped by status (solved/attempted/unsolved) for the user.

- GET /api/status/progress
	- Auth: yes
	- Description: Returns totalProblems, solvedProblems and a `progress` string (e.g., "3/10"). Useful for dashboard progress bars.

- POST /api/status/:problemNo/addnote
	- Auth: yes
	- Path params: problemNo
	- Body: { intuition }
	- Description: Saves a one-liner/intuition note on the problem's ProblemStatus document.

- GET /api/status/recentproblems
	- Auth: yes
	- Query params (optional): limit (integer)
	- Description: Returns recently updated/solved problems for the user (selects problemNo, title, difficulty, updatedAt).

- GET /api/status/solvedproblems
	- Auth: yes
	- Query params: date (ISO date string)
	- Description: Returns problems solved on a particular day (filtered by ProblemStatus.updatedAt). Response contains problem metadata.

-- /api/revision

- POST /api/revision/:problemNo/revisiondone
	- Auth: yes
	- Path params: problemNo
	- Description: Marks today's scheduled revision as completed by removing today's entry from the revisionDate array on ProblemStatus.

- GET /api/revision/revision-schedule
	- Auth: yes
	- Description: Returns today's revision schedule for the authenticated user (problem title, difficulty, problemNo, url, status).

Note: The controllers also export an `upcomingRevisionSchedule` helper (to fetch future revisions) but the current routes only expose the two endpoints above.

-- /api/stats

- GET /api/stats/getstats
	- Auth: yes
	- Description: Returns overall counts (solved, attempted, unsolved) for the user.

- GET /api/stats/getstatsbydiff
	- Auth: yes
	- Description: Returns counts of problems grouped by difficulty for the user.

- GET /api/stats/getstatsbytopic
	- Auth: yes
	- Description: Returns a list of topics with solved counts (topic name and count) for the user.

-- /api/ai

- POST /api/ai/random
	- Auth: no
	- Body: none
	- Description: Asks the AI helper to generate exactly five random DSA problem statements. Returns { numberedItems: ["1. ...","2. ...", ...] }.

- POST /api/ai/Quote
	- Auth: no
	- Body: none
	- Description: Generates a short motivational quote using the AI helper.

- POST /api/ai/response
	- Auth: yes
	- Body: { prompt }
	- Description: Returns an AI-generated response to a prompt (used by the chatbot/hint feature). Response contains `{ aiReply }`.

Quick notes on error handling and shapes
- Most controllers throw `ApiError` on bad requests (status-codes and messages). The error middleware in the server converts these to proper JSON responses.
- For accurate request/response JSON shapes, refer to the controller implementations under `backend/src/controllers/*` (the README above links to the routes folder).


## Frontend routes & components

Key pages (under `frontend/src/pages`):
- `Home` - dashboard with charts, calendar, recent problems and the chatbot
- `Problems` - list problems table
- `AddProblem` - form to add a new problem
- `Revision` - revision dashboard
- `Settings`, `Login`, `AI` - additional pages

Important components:
- `ProblemForm` / `ProblemsAdd.jsx` - form to create problems
- `Problemtable.jsx` - table that renders fetched problems
- `Recentproblems.jsx` - small widget listing recent problems
- `Chatbot.jsx` - floating chat assistant
- `Calendar.jsx` - calendar integration using `react-calendar`

There's a `ProblemContext.jsx` provider used to share problem state between components.

## Developer notes & suggestions

- The frontend uses Tailwind classes; ensure Tailwind is configured in `tailwind.config.js` (search in the repo).
- Several components render static placeholder data (AI assistant responses, recent problems). Connect those to backend endpoints for dynamic data.
- Confirm that `Problemtable` accepts `problems` prop (frontend pages fetch problems and pass data to components).