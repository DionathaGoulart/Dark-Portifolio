import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@styles'
import App from './App'
import { I18nProvider } from './shared/contexts/I18nContext'
import { initGoogleAnalytics } from './features/trafego'

// Inicializar Google Analytics
initGoogleAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>
)
