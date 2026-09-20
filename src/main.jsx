import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Wake up the backend as soon as the app loads
const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
fetch(`${apiUrl}/wakeup`).catch(err => console.error("Failed to wake up backend:", err));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
