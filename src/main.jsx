import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Add this import
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Add the BrowserRouter wrapper here */}
    <BrowserRouter basename="/onlineTutor">
      <App />
    </BrowserRouter>
  </StrictMode>,
)