// ================================
// TYPES & INTERFACES
// ================================

/**
 * Environment variables validation configuration
 * Defines required and optional environment variables
 */
interface EnvConfig {
  /** List of required environment variables */
  required: string[]
  /** List of optional environment variables */
  optional: string[]
}

/**
 * Validation result structure
 */
interface ValidationResult {
  /** List of validation errors */
  errors: string[]
  /** List of validation warnings */
  warnings: string[]
}

// ================================
// CONFIGURATION
// ================================

/**
 * Complete project environment variables configuration
 * Centralizes all environment variable requirements
 */
const ENV_CONFIG: EnvConfig = {
  required: [
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY'
  ],
  optional: ['VITE_GA_MEASUREMENT_ID']
}

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Validates if an environment variable is defined and not empty
 * @param {string | undefined} value - Environment variable value
 * @returns {boolean} True if variable is valid
 */
const isValidEnvVar = (value: string | undefined): boolean => {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates environment variables and collects errors/warnings
 * @param {string[]} variables - Array of variable names to validate
 * @param {boolean} isRequired - Whether variables are required or optional
 * @returns {string[]} Array of validation messages
 */
const validateVariables = (
  variables: string[],
  isRequired: boolean
): string[] => {
  const messages: string[] = []
  const icon = isRequired ? '❌' : '⚠️'
  const suffix = isRequired
    ? 'é obrigatório mas não foi encontrado'
    : 'não foi encontrado (opcional)'

  variables.forEach((envVar) => {
    if (!isValidEnvVar(import.meta.env[envVar])) {
      messages.push(`${icon} ${envVar} ${suffix}`)
    }
  })

  return messages
}

/**
 * Logs validation results to console
 * @param {ValidationResult} result - Validation errors and warnings
 */
const logValidationResults = ({ errors, warnings }: ValidationResult): void => {
  if (errors.length > 0) {
    console.error('🚨 Variáveis de ambiente obrigatórias ausentes:')
    errors.forEach((error) => console.error(error))
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Variáveis de ambiente opcionais ausentes:')
    warnings.forEach((warning) => console.warn(warning))
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.info('✅ Todas as variáveis de ambiente estão configuradas')
  }
}

/**
 * Validates Google Analytics measurement ID format
 * @param {string} measurementId - GA4 measurement ID
 * @returns {boolean} True if format is valid
 */
const isValidGAFormat = (measurementId: string): boolean => {
  if (!measurementId.startsWith('G-')) {
    console.error('Analytics: VITE_GA_MEASUREMENT_ID deve começar com "G-"')
    return false
  }

  if (measurementId === 'G-XXXXXXXXXX') {
    console.warn('Analytics: Usando ID de placeholder - substitua pelo ID real')
    return false
  }

  return true
}

// ================================
// MAIN FUNCTIONS
// ================================

/**
 * Validates all necessary environment variables
 * Shows warnings for missing variables but doesn't break the application
 */
export const validateEnvironment = (): void => {
  const errors = validateVariables(ENV_CONFIG.required, true)
  const warnings = validateVariables(ENV_CONFIG.optional, false)

  logValidationResults({ errors, warnings })
}

/**
 * Specific function to validate Analytics configuration
 * @returns {boolean} True if analytics environment is properly configured
 */
export const validateAnalyticsEnv = (): boolean => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (!isValidEnvVar(measurementId)) {
    console.info(
      'Analytics: VITE_GA_MEASUREMENT_ID não configurado - Analytics desabilitado'
    )
    return false
  }

  return isValidGAFormat(measurementId)
}
