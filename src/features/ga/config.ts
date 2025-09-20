// ================================
// IMPORTS
// ================================
import { validateAnalyticsEnv } from '@/shared/utils/envValidation'
import { AnalyticsConfig } from './types'

// ================================
// CONFIGURATION
// ================================

/**
 * Google Analytics configuration using environment variables
 * Ensures no sensitive information is exposed in the code
 */
export const ANALYTICS_CONFIG: AnalyticsConfig = {
  measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  enabled: import.meta.env.PROD && validateAnalyticsEnv()
}

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Validates if the necessary environment variables are defined
 * @returns {boolean} True if analytics environment is properly configured
 */
export const validateAnalyticsConfig = (): boolean => {
  return validateAnalyticsEnv()
}
