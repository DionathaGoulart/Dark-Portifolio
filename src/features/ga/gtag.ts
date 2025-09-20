// ================================
// IMPORTS
// ================================
import { ANALYTICS_CONFIG } from './config'
import type { PageViewEvent, CustomEvent, UserPreferences } from './types'

// ================================
// GLOBAL DECLARATIONS
// ================================

/**
 * Global gtag declaration for Google Analytics
 */
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Checks if Google Analytics is ready and available
 * @returns {boolean} True if gtag is available and analytics is enabled
 */
const isAnalyticsReady = (): boolean => {
  return ANALYTICS_CONFIG.enabled && typeof window.gtag !== 'undefined'
}

/**
 * Creates and appends a script element to document head
 * @param {string} src - Script source URL (optional)
 * @param {string} content - Script inline content (optional)
 */
const createScript = (src?: string, content?: string): void => {
  const script = document.createElement('script')

  if (src) {
    script.async = true
    script.src = src
  }

  if (content) {
    script.innerHTML = content
  }

  document.head.appendChild(script)
}

// ================================
// MAIN FUNCTIONS
// ================================

/**
 * Initializes Google Analytics with GA4 configuration
 * Sets up tracking scripts and basic configuration
 */
export const initializeAnalytics = (): void => {
  if (!ANALYTICS_CONFIG.enabled) return

  // Add GA4 tracking script
  createScript(
    `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.measurementId}`
  )

  // Add configuration script
  const configScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${ANALYTICS_CONFIG.measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true
    });
  `
  createScript(undefined, configScript)
}

/**
 * Tracks page view events
 * @param {PageViewEvent} data - Page view event data
 */
export const trackPageView = (data: PageViewEvent): void => {
  if (!isAnalyticsReady()) return

  window.gtag('event', 'page_view', {
    page_title: data.page_title,
    page_location: data.page_location
  })
}

/**
 * Tracks custom events
 * @param {CustomEvent} data - Custom event data with name and parameters
 */
export const trackEvent = (data: CustomEvent): void => {
  if (!isAnalyticsReady()) return

  window.gtag('event', data.event_name, data.event_parameters)
}

/**
 * Tracks user preferences changes
 * @param {UserPreferences} preferences - User preference data
 */
export const trackUserPreferences = (preferences: UserPreferences): void => {
  if (!ANALYTICS_CONFIG.enabled) return

  trackEvent({
    event_name: 'user_preferences',
    event_parameters: {
      theme: preferences.theme,
      language: preferences.language,
      location: preferences.location || 'unknown'
    }
  })
}

/**
 * Tracks theme change events
 * @param {'light' | 'dark'} theme - Selected theme
 */
export const trackThemeChange = (theme: 'light' | 'dark'): void => {
  trackEvent({
    event_name: 'theme_change',
    event_parameters: {
      theme
    }
  })
}

/**
 * Tracks language change events
 * @param {'pt' | 'en'} language - Selected language
 */
export const trackLanguageChange = (language: 'pt' | 'en'): void => {
  trackEvent({
    event_name: 'language_change',
    event_parameters: {
      language
    }
  })
}
