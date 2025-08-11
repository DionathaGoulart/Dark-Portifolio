import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ptTranslations } from '../translations/pt'
import { enTranslations } from '../translations/en'
import { Language, Translation } from '@/types'

interface I18nContextType {
  language: Language
  translations: Translation
  setLanguage: (language: Language) => void
  t: Translation
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  pt: ptTranslations,
  en: enTranslations
}

// Função para detectar o idioma do navegador
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase()

  // Verifica se é português brasileiro ou português em geral
  if (browserLang.startsWith('pt')) {
    return 'pt'
  }

  // Default para inglês
  return 'en'
}

// Função para carregar idioma salvo ou detectar automaticamente
const getInitialLanguage = (): Language => {
  try {
    const savedLanguage = localStorage.getItem('app-language')
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      return savedLanguage as Language
    }
  } catch (error) {
    console.warn('Could not access localStorage:', error)
  }

  return detectBrowserLanguage()
}

interface I18nProviderProps {
  children: ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    try {
      localStorage.setItem('app-language', newLanguage)
    } catch (error) {
      console.warn('Could not save language to localStorage:', error)
    }
  }

  const contextValue: I18nContextType = {
    language,
    translations: translations[language],
    setLanguage,
    t: translations[language] // Alias para facilitar o uso
  }

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  )
}

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
