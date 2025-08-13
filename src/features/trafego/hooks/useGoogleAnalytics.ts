import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '../utils/analytics'

// ========= REACT HOOK =========
export const useAnalytics = () => {
  const location = useLocation()

  // Inicializar analytics na primeira execução
  useEffect(() => {
    analytics.init()
  }, [])

  // Rastrear mudanças de rota
  useEffect(() => {
    const path = location.pathname + location.search
    analytics.trackPageView(path)
  }, [location])

  return analytics
}

// Hook original para compatibilidade
export const useGoogleAnalytics = useAnalytics
