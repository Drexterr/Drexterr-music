import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Trackcontextprovider from './context/Trackcontextprovider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Trackcontextprovider>
    <App />
    </Trackcontextprovider>
  </StrictMode>,
)
