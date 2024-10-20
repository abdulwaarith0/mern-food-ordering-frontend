import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import './global.css'
import { Auth0Provider_Navigate } from './auth'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'


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
          <Toaster
            visibleToasts={1}
            position="top-right"
            richColors
          />
        </Auth0Provider_Navigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
)
