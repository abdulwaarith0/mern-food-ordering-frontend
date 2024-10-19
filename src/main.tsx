import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import './global.css'
import { Auth0Provider_Navigate } from './auth'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Auth0Provider_Navigate>
        <App />
      </Auth0Provider_Navigate>
    </Router>
  </StrictMode>,
)
