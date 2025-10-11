# 🎯 DSA Tracker

> A full-stack web application to help programmers track, practice, and revise Data Structures & Algorithms problems with AI-powered assistance.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Variables](#️-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [📡 API Reference](#-api-reference)
- [🎨 Frontend Routes](#-frontend-routes--components)
- [💡 Developer Notes](#-developer-notes--suggestions)
- [📄 License](#-license)

---

## ✨ Features

- ✅ **Problem Management** - Add, update, delete, and search DSA problems
- 📊 **Analytics Dashboard** - Track progress with beautiful charts and statistics
- 🔄 **Revision System** - Smart spaced-repetition scheduling (0, 3, 7, 14, 30 days)
- 🤖 **AI Assistant** - Get hints, solutions, and motivational quotes
- 📅 **Calendar Integration** - Visual tracking of daily problem-solving
- 🔐 **Google OAuth** - Secure authentication with Google
- 📝 **Notes & Intuition** - Save problem-solving insights
- 🎯 **Filter & Search** - Find problems by difficulty, topic, or pattern
- 📈 **Progress Tracking** - Real-time statistics and achievements

---

## 🏗️ Project Structure

```
DSA-Tracker/
├── 📄 README.md
├── 📁 backend/
│   ├── 📦 package.json
│   └── 📁 src/
│       ├── 🚀 app.js
│       ├── ⚙️ server.js
│       ├── 🎮 controllers/
│       ├── 📊 models/
│       ├── 🛣️ routes/
│       └── 💾 db/
└── 📁 frontend/
    ├── 📦 package.json
    └── 📁 src/
        ├── 🎯 main.jsx
        ├── 📱 App.jsx
        ├── 📄 pages/
        ├── 🧩 components/
        ├── 🔗 context/
        └── 🎨 assets/
```

**📝 Notes:**
- Backend runs from `backend/src` with `server.js` as entry point
- Frontend is a Vite + React app using Tailwind CSS

---

## ⚡ Tech Stack

### Backend 🔧
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express** - Web framework
- 🍃 **MongoDB** - NoSQL database
- 🔌 **Mongoose** - MongoDB ODM
- 🔐 **Passport** - Google OAuth authentication
- 🎫 **JWT** - Token-based auth
- 🔒 **bcryptjs** - Password hashing

### Frontend 🎨
- ⚛️ **React 19** - UI library
- 🛣️ **React Router v7** - Navigation
- ⚡ **Vite** - Build tool
- 🎨 **TailwindCSS** - Styling
- 📊 **Recharts** - Data visualization

### Development 🛠️
- 🔄 **Nodemon** - Auto-reload
- ✅ **ESLint** - Code linting

---

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 Node.js v18+
- 🍃 MongoDB (local or cloud)
- 📦 npm or yarn

### 📥 Installation

#### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd DsaTracker
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

#### 4️⃣ Configure Environment

Create `backend/.env` (see [Environment Variables](#️-environment-variables))

#### 5️⃣ Start Development Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

#### 6️⃣ Access Application

- 🌐 **Frontend:** `http://localhost:5173`
- 🔌 **Backend:** `http://localhost:3000`

---

## ⚙️ Environment Variables

Create `backend/.env`:

```env
# 🌐 Server Configuration
PORT=3000

# 💾 Database
MONGO_URI=mongodb://localhost:27017/dsatracker

# 🔐 Authentication
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here

# 🔑 Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# 🤖 AI Integration
OPENAI_API_KEY=your_openai_api_key
```

---

## 📜 Available Scripts

### Backend (`backend/package.json`)

| Command | Description | Icon |
|---------|-------------|------|
| `npm run dev` | Start with nodemon (development) | 🔄 |
| `npm start` | Start with node (production) | 🚀 |

### Frontend (`frontend/package.json`)

| Command | Description | Icon |
|---------|-------------|------|
| `npm run dev` | Start Vite dev server | ⚡ |
| `npm run build` | Build for production | 📦 |
| `npm run preview` | Preview production build | 👀 |
| `npm run lint` | Run ESLint | ✅ |

---

## 📡 API Reference

> **Base URL:** `http://localhost:3000`  
> **🔐 Auth:** Protected routes require valid authentication cookies  
> **📦 Response:** All responses use `ApiResponse` helper

---

### 👤 `/api/users` - User Authentication

#### 📝 Register User

```http
POST /api/users/register
```

**🔓 Authentication:** Not required

**📤 Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**📝 Description:** Creates a new user and sets access/refresh tokens in cookies

---

#### 🔑 Login User

```http
POST /api/users/login
```

**🔓 Authentication:** Not required

**📤 Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**📝 Description:** Authenticates user and sets cookies

---

#### 🚪 Logout User

```http
POST /api/users/logout
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

**📝 Description:** Clears tokens and removes refresh token from database

---

### 📝 `/api/problem` - Problem Management

#### ➕ Add Problem

```http
POST /api/problem/add
```

**🔐 Authentication:** Required

**📤 Request Body:**
```json
{
  "title": "Two Sum",
  "difficulty": "Easy",
  "topic": "Array",
  "problemNo": 1,
  "pattern": "Hash Table",
  "url": "https://leetcode.com/problems/two-sum",
  "platform": "LeetCode",
  "problemStatus": "solved"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problem": {
      "_id": "...",
      "title": "Two Sum",
      "difficulty": "Easy",
      "problemNo": 1
    }
  }
}
```

**📝 Description:** Adds a new problem. If status is `solved`, creates revision schedule automatically

---

#### ✏️ Update Problem

```http
PUT /api/problem/update/:problemNo
```

**🔐 Authentication:** Required

**🎯 Path Parameters:** `problemNo` (integer)

**📤 Request Body:** (any subset of fields)
```json
{
  "title": "Two Sum Updated",
  "difficulty": "Medium",
  "url": "https://leetcode.com/problems/two-sum"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problem": { /* updated problem */ }
  }
}
```

**📝 Description:** Updates problem by problemNo

---

#### 🗑️ Delete Problem

```http
DELETE /api/problem/delete/:problemNo
```

**🔐 Authentication:** Required

**🎯 Path Parameters:** `problemNo` (integer)

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problem": { /* deleted problem */ }
  }
}
```

**📝 Description:** Deletes problem and associated status

---

#### 📋 Get All Problems

```http
GET /api/problem/all-problems
```

**🔐 Authentication:** Required

**🔍 Query Parameters:** (optional)
- `difficulty` - Filter by difficulty
- `topic` - Filter by topic
- `pattern` - Filter by pattern
- `problemStatus` - Filter by status

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "_id": "...",
        "title": "Two Sum",
        "difficulty": "Easy",
        "topic": { "name": "Array" },
        "problemNo": 1
      }
    ]
  }
}
```

**📝 Description:** Returns all problems with optional filters

---

#### 🔍 Get Single Problem

```http
GET /api/problem/single-problem
```

**🔐 Authentication:** Required

**🔍 Query Parameters:** (one required)
- `title` - Search by title (partial match)
- `problemNo` - Search by problem number

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problem": { /* problem details */ }
  }
}
```

**📝 Description:** Returns a single matching problem

---

#### 💡 Get AI Hint

```http
POST /api/problem/hint
```

**🔐 Authentication:** Required

**📤 Request Body:**
```json
{
  "prompt": "How do I approach the Two Sum problem?"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "aiReply": "For Two Sum, consider using a hash table..."
  }
}
```

**📝 Description:** Get AI-powered hints for problems

---

### ✅ `/api/status` - Problem Status

#### ✔️ Mark as Solved

```http
POST /api/status/solved/:problemNo
```

**🔐 Authentication:** Required

**🎯 Path Parameters:** `problemNo` (integer)

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "status": {
      "problemId": "...",
      "status": "solved",
      "revisionDate": ["2025-01-11", "2025-01-14", "2025-01-18"]
    }
  }
}
```

**📝 Description:** Marks problem as solved and creates revision schedule [0, 3, 7, 14, 30 days]

---

#### 📊 Get Stats

```http
GET /api/status/stats
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "stats": [
      { "_id": "solved", "count": 45 },
      { "_id": "attempted", "count": 12 },
      { "_id": "unsolved", "count": 8 }
    ]
  }
}
```

**📝 Description:** Returns problem counts grouped by status

---

#### 📈 Get Progress

```http
GET /api/status/progress
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "totalProblems": 65,
    "solvedProblems": 45,
    "progress": "45/65"
  }
}
```

**📝 Description:** Returns overall progress metrics

---

#### 📝 Add Note

```http
POST /api/status/:problemNo/addnote
```

**🔐 Authentication:** Required

**🎯 Path Parameters:** `problemNo` (integer)

**📤 Request Body:**
```json
{
  "intuition": "Use hash table for O(n) solution"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "status": { /* updated status with note */ }
  }
}
```

**📝 Description:** Adds a note/intuition to problem

---

#### 🕒 Get Recent Problems

```http
GET /api/status/recentproblems
```

**🔐 Authentication:** Required

**🔍 Query Parameters:** (optional)
- `limit` - Number of problems (default: 10)

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "problemNo": 1,
        "title": "Two Sum",
        "difficulty": "Easy",
        "updatedAt": "2025-01-11T10:30:00Z"
      }
    ]
  }
}
```

**📝 Description:** Returns recently solved/updated problems

---

#### 📅 Get Solved Problems by Date

```http
GET /api/status/solvedproblems?date=2025-01-11
```

**🔐 Authentication:** Required

**🔍 Query Parameters:**
- `date` - ISO date string (YYYY-MM-DD)

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "problems": [ /* problems solved on that date */ ]
  }
}
```

**📝 Description:** Returns problems solved on specific date

---

### 🔄 `/api/revision` - Revision System

#### ✅ Mark Revision Done

```http
POST /api/revision/:problemNo/revisiondone
```

**🔐 Authentication:** Required

**🎯 Path Parameters:** `problemNo` (integer)

**📥 Response:**
```json
{
  "success": true,
  "message": "Revision marked as complete"
}
```

**📝 Description:** Removes today's date from revision schedule

---

#### 📅 Get Revision Schedule

```http
GET /api/revision/revision-schedule
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "title": "Two Sum",
        "difficulty": "Easy",
        "problemNo": 1,
        "url": "https://leetcode.com/problems/two-sum",
        "status": "pending"
      }
    ]
  }
}
```

**📝 Description:** Returns today's revision schedule

---

### 📊 `/api/stats` - Analytics

#### 📈 Get Overall Stats

```http
GET /api/stats/getstats
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "solved": 45,
    "attempted": 12,
    "unsolved": 8
  }
}
```

**📝 Description:** Returns overall problem statistics

---

#### 📊 Get Stats by Difficulty

```http
GET /api/stats/getstatsbydiff
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "stats": [
      { "difficulty": "Easy", "count": 20 },
      { "difficulty": "Medium", "count": 18 },
      { "difficulty": "Hard", "count": 7 }
    ]
  }
}
```

**📝 Description:** Returns problem counts by difficulty

---

#### 📊 Get Stats by Topic

```http
GET /api/stats/getstatsbytopic
```

**🔐 Authentication:** Required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "stats": [
      { "topic": "Array", "count": 15 },
      { "topic": "Tree", "count": 12 },
      { "topic": "Graph", "count": 8 }
    ]
  }
}
```

**📝 Description:** Returns solved problem counts by topic

---

### 🤖 `/api/ai` - AI Assistant

#### 🎲 Generate Random Problems

```http
POST /api/ai/random
```

**🔓 Authentication:** Not required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "numberedItems": [
      "1. Implement a function to reverse a linked list",
      "2. Find the longest common subsequence",
      "3. Design a LRU Cache",
      "4. Implement binary search in a rotated array",
      "5. Find all anagrams in a string"
    ]
  }
}
```

**📝 Description:** Generates 5 random DSA problem statements

---

#### 💬 Get Motivational Quote

```http
POST /api/ai/Quote
```

**🔓 Authentication:** Not required

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "quote": "Every expert was once a beginner. Keep coding!"
  }
}
```

**📝 Description:** Returns a motivational quote

---

#### 💡 Get AI Response

```http
POST /api/ai/response
```

**🔐 Authentication:** Required

**📤 Request Body:**
```json
{
  "prompt": "Explain dynamic programming"
}
```

**📥 Response:**
```json
{
  "success": true,
  "data": {
    "aiReply": "Dynamic programming is a method for solving..."
  }
}
```

**📝 Description:** Get AI-powered responses to queries

---

## 🎨 Frontend Routes & Components

### 📄 Key Pages

| Route | Component | Description | Icon |
|-------|-----------|-------------|------|
| `/` | `Home` | Dashboard with charts, calendar, chatbot | 🏠 |
| `/problems` | `Problems` | Problem list table | 📝 |
| `/add` | `AddProblem` | Add new problem form | ➕ |
| `/revision` | `Revision` | Revision dashboard | 🔄 |
| `/settings` | `Settings` | User settings | ⚙️ |
| `/login` | `Login` | Authentication page | 🔐 |
| `/ai` | `AI` | AI assistant interface | 🤖 |

### 🧩 Important Components

#### 📝 ProblemForm / ProblemsAdd
- Form to create new problems
- Validation and error handling
- Topic and pattern selection

#### 📊 Problemtable
- Renders problem list table
- Sorting and filtering
- Action buttons (edit, delete)

#### 🕒 Recentproblems
- Widget showing recent problems
- Quick access to recent work
- Status indicators

#### 💬 Chatbot
- Floating AI assistant
- Problem hints and explanations
- Motivational quotes

#### 📅 Calendar
- Visual daily progress tracking
- Uses `react-calendar`
- Marks solved problem dates

#### 🔗 ProblemContext
- Global state management
- Shares problem data across components
- Reduces prop drilling

---

## 💡 Developer Notes & Suggestions

### 🎨 Styling
- ✅ Tailwind CSS configured in `tailwind.config.js`
- ✅ Custom classes for components
- ✅ Responsive design patterns

### 🔌 API Integration
- ⚠️ Connect placeholder data to backend endpoints
- ⚠️ Implement error boundaries
- ⚠️ Add loading states

### 📊 Data Flow
- ✅ `ProblemContext` for state management
- ✅ Props passed to `Problemtable`
- ⚠️ Consider adding Redux/Zustand for complex state

### 🔐 Security
- ✅ JWT authentication implemented
- ✅ Cookie-based sessions
- ⚠️ Add CSRF protection
- ⚠️ Implement rate limiting

### 🚀 Performance
- ⚠️ Implement pagination for problem lists
- ⚠️ Add debouncing for search
- ⚠️ Consider lazy loading components

### 🧪 Testing
- ⚠️ Add unit tests for components
- ⚠️ API endpoint testing
- ⚠️ E2E testing with Playwright

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for the DSA Community**

⭐ Star this repo if you find it helpful!

</div>