import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Contato from './pages/contato.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contato />
  </StrictMode>
)
