import { useState } from "react";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home.jsx";
import ChatwithAi from "./pages/Ai.jsx";
import Problems from "./pages/Problems.jsx";
import AddProblem from "./pages/AddProblem.jsx";
import Revision from "./pages/Revision.jsx";
import Recentsolved from "./pages/RecentProblems.jsx";
import RoadmapPage from "./pages/roadmap.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Settings from "./pages/Settings.jsx";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
        <AuthProvider>

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/Problem" element={<ProtectedRoute><Problems/></ProtectedRoute>}></Route>
          <Route path="/add-problem" element={<ProtectedRoute><AddProblem /></ProtectedRoute>}></Route>
          <Route path="/notes" element={<ProtectedRoute><NotesPage/></ProtectedRoute>} />
          <Route path="/revision" element={<ProtectedRoute><Revision/></ProtectedRoute>}></Route>
          <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
          <Route path="/chat-with-ai" element={<ProtectedRoute><ChatwithAi/></ProtectedRoute>}></Route>
          <Route path="/recent" element={<ProtectedRoute><Recentsolved/></ProtectedRoute>}></Route>
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage/></ProtectedRoute>} />
        </Route>
      </Routes>
        </AuthProvider>

  );
}

export default App;
