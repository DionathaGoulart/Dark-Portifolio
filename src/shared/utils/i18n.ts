// ================================
// Internal Imports
// ================================
import { Language } from '@/types'

// ================================
// Language Configuration
// ================================

/** Array of supported language codes */
export const SUPPORTED_LANGUAGES: Language[] = ['pt', 'en']

/** Mapping of language codes to display names */
export const LANGUAGE_NAMES = {
  pt: 'Português',
  en: 'English'
} as const

// ================================
// Language Detection Utilities
// ================================

/**
 * Detects language from URL pathname
 * Checks if the first path segment matches a supported language
 * @param pathname - The URL pathname to analyze
 * @returns Language code if found, null otherwise
 */
export const detectLanguageFromPath = (pathname: string): Language | null => {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as Language)) {
    return firstSegment as Language
  }

  return null
}

/**
 * Detects user's preferred language from browser settings
 * Falls back to English if browser language is not supported
 * @returns Supported language code based on browser preference
 */
export const getBrowserLanguage = (): Language => {
  // Handle server-side rendering
  if (typeof navigator === 'undefined') return 'en'

  const browserLang = navigator.language.toLowerCase()

  // Portuguese (Brazilian or general Portuguese)
  if (browserLang.startsWith('pt')) {
    return 'pt'
  }

  // Default to English for unsupported languages
  return 'en'
}

// ================================
// Language Display Utilities
// ================================

/**
 * Formats language code for display in UI
 * Returns the localized language name or uppercase code as fallback
 * @param language - Language code to format
 * @returns Formatted display name for the language
 */
export const formatLanguageDisplay = (language: Language): string => {
  return LANGUAGE_NAMES[language] || language.toUpperCase()
}
