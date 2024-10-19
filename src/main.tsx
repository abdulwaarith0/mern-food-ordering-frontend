import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import './global.css'
import { Auth0Provider_Navigate } from './auth'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider_Navigate>
          <App />
        </Auth0Provider_Navigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
