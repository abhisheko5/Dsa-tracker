import { useState } from 'react'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/home.jsx'
import Problems from './pages/problems.jsx'
import AddProblem from './pages/AddProblem.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Routes>
         <Route path="/" element={ <Login/>} ></Route>

      <Route path="/" element={<Layout/>}>
   <Route path="/home" element={ <Home/>} ></Route>
   <Route path="/Problem" element={ <Problems/>} ></Route>
   <Route path="/add-problem" element={ <AddProblem/>} ></Route>
</Route>
</Routes>
   </div>
  )
}

export default App;
