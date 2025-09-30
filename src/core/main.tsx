import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { initializeAnalytics } from '@/features/analytics'
import { I18nProvider, validateEnvironment } from '@/shared'
import App from './App'
import '@/styles/global.css'

validateEnvironment()

initializeAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>
)
