// ================================
// IMPORTS
// ================================
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './gtag'

// ================================
// TYPES
// ================================

/**
 * Analytics hook configuration options
 */
interface UseAnalyticsOptions {
  /** Whether to track page views automatically */
  trackPageViews?: boolean
  /** Custom page title override */
  pageTitle?: string
}

// ================================
// HOOKS
// ================================

/**
 * Hook to automatically track route changes and page views
 * Integrates with React Router to monitor navigation events
 *
 * @param {UseAnalyticsOptions} options - Configuration options for analytics tracking
 */
export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const location = useLocation()
  const { trackPageViews = true, pageTitle } = options

  useEffect(() => {
    if (!trackPageViews) return

    trackPageView({
      page_title: pageTitle || document.title,
      page_location: window.location.href
    })
  }, [location.pathname, trackPageViews, pageTitle])
}
