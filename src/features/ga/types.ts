// ================================
// ANALYTICS TYPES & INTERFACES
// ================================

/**
 * Google Analytics configuration interface
 * Defines the structure for analytics setup and control
 */
export interface AnalyticsConfig {
  /** Google Analytics measurement ID (GA4) */
  measurementId: string
  /** Whether analytics tracking is enabled */
  enabled: boolean
}

/**
 * Page view event data structure
 * Used for tracking navigation and page visits
 */
export interface PageViewEvent {
  /** Title of the current page */
  page_title: string
  /** Full URL of the current page */
  page_location: string
}

/**
 * Custom event data structure
 * Flexible interface for tracking user interactions and behaviors
 */
export interface CustomEvent {
  /** Name of the custom event */
  event_name: string
  /** Additional parameters for the event (optional) */
  event_parameters?: Record<string, any>
}

/**
 * User preferences data structure
 * Tracks user settings and personalization choices
 */
export interface UserPreferences {
  /** Selected theme preference */
  theme: 'light' | 'dark'
  /** Selected language preference */
  language: 'pt' | 'en'
  /** User's location (optional) */
  location?: string
}
