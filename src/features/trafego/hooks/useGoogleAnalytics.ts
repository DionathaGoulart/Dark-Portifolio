import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useGoogleAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

    if (typeof window.gtag !== 'undefined' && GA_MEASUREMENT_ID) {
      // Rastrear mudança de página
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title
      })

      // Log em desenvolvimento
      if (import.meta.env.DEV) {
      }
    }
  }, [location])
}
