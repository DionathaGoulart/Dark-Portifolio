import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ptTranslations } from '../translations/pt'
import { enTranslations } from '../translations/en'
import { Language, Translation } from '@/types'
import { trackLanguageChange } from '@/features/ga'

// ================================
// INTERFACES & TYPES
// ================================

interface I18nContextType {
  language: Language
  translations: Translation
  setLanguage: (language: Language) => void
  t: Translation
}

interface I18nProviderProps {
  children: ReactNode
}

// ================================
// CONSTANTS
// ================================

const STORAGE_KEY = 'app-language'

const translations = {
  pt: ptTranslations,
  en: enTranslations
} as const

const SUPPORTED_LANGUAGES: Language[] = ['pt', 'en']

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Detects browser language and returns supported language
 */
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase()

  if (browserLang.startsWith('pt')) {
    return 'pt'
  }

  return 'en'
}

/**
 * Validates if language is supported
 */
const isValidLanguage = (lang: string): lang is Language => {
  return SUPPORTED_LANGUAGES.includes(lang as Language)
}

/**
 * Safely gets language from localStorage
 */
const getStoredLanguage = (): Language | null => {
  try {
    const savedLanguage = localStorage.getItem(STORAGE_KEY)
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      return savedLanguage
    }
  } catch (error) {
    console.warn('Could not access localStorage:', error)
  }

  return null
}

/**
 * Gets initial language from storage or browser detection
 */
const getInitialLanguage = (): Language => {
  return getStoredLanguage() || detectBrowserLanguage()
}

/**
 * Safely saves language to localStorage
 */
const saveLanguageToStorage = (language: Language): void => {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch (error) {
    console.warn('Could not save language to localStorage:', error)
  }
}

// ================================
// CONTEXT
// ================================

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// ================================
// PROVIDER COMPONENT
// ================================

/**
 * I18n Provider that manages language state and translations
 * Automatically detects browser language and persists user preference
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  // ================================
  // HANDLERS
  // ================================

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    saveLanguageToStorage(newLanguage)
    trackLanguageChange(newLanguage)
  }

  // ================================
  // COMPUTED VALUES
  // ================================

  const currentTranslations = translations[language]

  const contextValue: I18nContextType = {
    language,
    translations: currentTranslations,
    setLanguage,
    t: currentTranslations
  }

  // ================================
  // RENDER
  // ================================

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}

// ================================
// HOOKS
// ================================

/**
 * Hook to access I18n context
 * Must be used within I18nProvider
 */
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext)

  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }

  return context
}
