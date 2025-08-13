// ========= EXPORTS PRINCIPAIS =========
export { analytics } from './utils/analytics'
export { useAnalytics, useGoogleAnalytics } from './hooks/useGoogleAnalytics'

// ========= EXPORTS DE TIPOS =========
export type {
  AnalyticsEvent,
  NavigationLocation,
  ContactAction,
  SocialPlatform
} from './types/analytics'

// ========= EXPORTS DE COMPATIBILIDADE =========
export {
  initGoogleAnalytics,
  trackProjectClick,
  trackNavigationClick,
  trackContactAction,
  trackSocialClick,
  trackDownload,
  trackSearch,
  trackEvent
} from './utils/analyticsHelpers'
