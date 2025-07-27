import { useState } from 'react'
import Login from './pages/Login.jsx'
import Home from './pages/home.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Routes>
   <Route path="/" element={ <Login/>} ></Route>
   <Route path="/home" element={ <Home/>} ></Route>

</Routes>
   </div>
  )
}

export default App;
