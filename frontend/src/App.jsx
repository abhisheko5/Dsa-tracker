import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import NotesPage from './pages/NotesPage.jsx';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home.jsx'
import ChatwithAi from './pages/Ai.jsx'
import Problems from './pages/Problems.jsx'
import AddProblem from './pages/AddProblem.jsx'
import Revision from './pages/Revision.jsx'
import Recentsolved from './pages/RecentProblems.jsx'


import Settings from './pages/settings.jsx'
import {Routes, Route} from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
            <Toaster position="top-right" />

    <Routes>
         <Route path="/" element={ <Login/>} ></Route>

      <Route path="/" element={<Layout/>}>
   <Route path="/home" element={ <Home/>} ></Route>
   <Route path="/Problem" element={ <Problems/>} ></Route>
   <Route path="/add-problem" element={ <AddProblem/>} ></Route>
   <Route path="/notes" element={<NotesPage />} />
   <Route path="/revision" element={ <Revision/>} ></Route>
   <Route path="/settings" element={ <Settings/>} ></Route>
   <Route path="/chat-with-ai" element={ <ChatwithAi/>} ></Route>
   <Route path="/recent" element={ <Recentsolved/>} ></Route>
</Route>
</Routes>
   </div>
  )
}

export default App;
