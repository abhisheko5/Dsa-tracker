import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProblemProvider } from './context/ProblemContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
<BrowserRouter>
  <StrictMode>
    <ProblemProvider>
  <App />
</ProblemProvider>

  </StrictMode>
  </BrowserRouter>
)
