import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './style/main.css'
import Sim from './pages/cadastro.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sim />
  </StrictMode>
)
