import { Language } from '@/types'

export const SUPPORTED_LANGUAGES: Language[] = ['pt', 'en']

export const LANGUAGE_NAMES = {
  pt: 'Português',
  en: 'English'
} as const

export const detectLanguageFromPath = (pathname: string): Language | null => {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as Language)) {
    return firstSegment as Language
  }

  return null
}

export const getBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en'

  const browserLang = navigator.language.toLowerCase()

  // Português brasileiro ou português em geral
  if (browserLang.startsWith('pt')) {
    return 'pt'
  }

  // Default para inglês
  return 'en'
}

export const formatLanguageDisplay = (language: Language): string => {
  return LANGUAGE_NAMES[language] || language.toUpperCase()
}
