import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import './styles/generic/Register.module.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Navbar/> */}
    <App />
  </StrictMode>,
)
