import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@styles/global.css'
import App from './App'
import { I18nProvider } from '../shared/contexts/I18nContext'
import { validateEnvironment } from '@/shared/utils/envValidation'
import { initializeAnalytics } from '@/features/ga'

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
