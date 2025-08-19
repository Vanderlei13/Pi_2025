import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './style/main.css'
import Cadastro from './pages/cadastro.jsx'
import Sim from './pages/compra_de_item.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
